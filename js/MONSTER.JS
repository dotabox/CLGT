
console.log("thanh da viet gi thi comment vao xem tu da lam kia kia ");
(function() {
    CAAT.Monster = function() {
        CAAT.Monster.superclass.constructor.call(this);
        return (this);
    }
    CAAT.Monster.prototype = {
        image: null,
        startX: null,
        startY: null,
        moveComplete: false,
        stopMove: false,
        isBoss: false,
        initialize: function(battleContainer, type, level, id, startPoint, currentWave) {	//Đầu vào gồm battleContainer, loại quái, level quái, số thứ tự của quái, cửa mà quái ra (số thứ tự 0,1,2,...), wave của quái
            var self = this;
            this.director = battleContainer.director;
			this.battleContainer = battleContainer;
			var currentMap = battleContainer.currentMap;
			this.currentMap = currentMap;
			this.startPoint = startPoint;
            var pointList = currentMap.pointList[startPoint];		//Danh sách các ô trong đường đi của quái
			this.currentWave = currentWave 							// Wave hiện tại của con quái này
			this.moveDirection = 1; // 1: forward, -1: backward;
            this.id = id;
            this.startX = pointList[0].y * TILE_SIZE + battleContainer.random() * (TILE_SIZE - MONSTER_SIZE);
            this.startY = pointList[0].x * TILE_SIZE + battleContainer.random() * (TILE_SIZE - MONSTER_SIZE);
            this.pointList = pointList;
            this.currentPoint = 0;
            this.type = type;
            var monster = data.Monster[type];
            this.image = this.director.getImage(monster.Image);
            this.init(this.image, this.startX, this.startY, MONSTER_SIZE, MONSTER_SIZE, true);
            this.level = level;
            this.name = monster.Name;
			this.calculateArmor(monster.Armor);
			this.xp=battleContainer.tableXP.Gained[level];
			this.hp = ((monster.BaseHP * Math.pow(1.3, level)) * (battleContainer.random() * 0.1 + 0.95)) >> 0;
            this.currentHP = (this.hp); //*(Math.random()/2+0.5))>>0;
            this.element = monster.Element;
            if (monster.isBoss) this.isBoss = true;		
            this.speed = monster.Speed;
            this.currentSpeed = this.speed; //*(Math.random()/2+1);
            this.effect = {};
            this.isDead = false;
            this.isStun = 0;
			this.immunity = 0;			//Quái có bất tử?? 
			this.isPush = 0;			//Dành cho Eff 8 của trụ
			this.pushCount = 1;			//
			this.skill = monster.Skill; // Skill của quái
			this.skillInfo = monster.SkillInfo.concat();
			//for(var i=0;i<monster.SkillInfo.length;i++) this.skillInfo.push(monster.SkillInfo[i]);
			if(typeof this.skillInfo[1] != "undefined") this.skillDuration = this.skillInfo[1];
			this.skillDuration2 = this.skillInfo[0];
			this.maxSpeed = this.speed;
			if(this.skill==3) this.maxSpeed = this.skillInfo[1];
			//console.log(monster.SkillInfo);
			/*
			Monster Skill: 
			0: Regeneration : [a] Regen a%HP/s
			1: Healing: [a,b] Heal a%HP every b mili second
			2: Evade: [a] Miss a%
			3: Haste: [a,b] Movement speed increase a%/s, limit at b
			4: Harden: [a] Each hit taken + a armor
			5: Immunity: [a,b] Reduces 100% damage in a mili seconds, cool down b mili seconds, activate if take Damage
			
			*/
			switch(this.skill){
				case 0: this.skillName = lang.monster.Skill.ID0; break;
				case 1: this.skillName = lang.monster.Skill.ID1; break;
				case 2: this.skillName = lang.monster.Skill.ID2; break;
				case 3: this.skillName = lang.monster.Skill.ID3; break;
				case 4: this.skillName = lang.monster.Skill.ID4; break;
				case 5: this.skillName = lang.monster.Skill.ID5; break;
					
			}
			this.bounty = monster.Bounty;
			this.showHP = true;
            var showHP = new CAAT.Foundation.ActorContainer().setBounds(0, 0, 50, 50);	// Hiện thanh máu và tên
            showHP.paint = function(director, time) {
				if(self.showHP){
					var ctx = director.ctx;
					ctx.strokeRect(0, 20, 50, 3);
					var percent = self.currentHP/self.hp;
					if(percent>2/3)	ctx.fillStyle = "#0F0";				
					else if(percent>1/3) ctx.fillStyle = "#FF0";
					else ctx.fillStyle = "#F00";
					ctx.fillRect(0, 20, 50 * self.currentHP / self.hp, 3);
				}
            }
			this.selected = false;
			var showSelected = new CAAT.Foundation.ActorContainer().setBounds(0, 0, 50, 50);
			showSelected.paint = function(director,time){
				if(self.selected){
					var ctx = director.ctx;
					ctx.save();
					ctx.strokeStyle = "#F00";
					ctx.lineWidth = 2;
					ctx.beginPath();
					ctx.scale(1,0.4);
					ctx.arc(5+MONSTER_SIZE/2,3*MONSTER_SIZE,MONSTER_SIZE/2,-Math.PI/4,5*Math.PI/4);
					ctx.stroke();
					ctx.closePath();
					ctx.restore();
				}
			}
			showHP.addChild(showSelected);
            this.addChild(showHP);
            return this;
        },
		textShow: function(texts,color){ 		//Hàm hiện chữ (ví dụ Miss, Immunity) và hiện dam
			var text = texts[LANGUAGE];
			var showText = new CAAT.DamageShow().initialize(text,0,0,color,this.battleContainer);
			this.addChild(showText);
			showText.active(this.battleContainer.time);
		},
		calculateArmor : function(armor){
			this.armor = armor;
			var armorConstant = 0.08;
			this.reduceDamage = (this.armor*armorConstant)/(1+this.armor*armorConstant);
			if(armor<0) this.reduceDamage = (1-armorConstant)*this.armor/15;
		},
		bossDisableCount: 0,
		bossDisableMax: 3,
		bossDisableTime: 3000,
        takeDmg: function(dmg, bullet) {		//Hàm nhận dam, gồm dam đầu vào và viên đạn(nếu có) gây dam đó
			//Skill của quái
			if(typeof bullet != "undefined"){
				if((this.isBoss)&&(this.bossDisableCount<this.bossDisableMax)){
					if(!bullet.tower.disabled) {
						bullet.tower.disable(this.bossDisableTime);
						this.bossDisableCount++;
						return;
					}
				}
				if ((this.skill == 2) && (this.battleContainer.random() > 1 - this.skillInfo[0] / 100) && (bullet.typeBullet != 0)) {
					this.textShow(lang.monster.Textshow.ID2,"#F00");
					return;
				}
				if((this.skill==4)&&(bullet.typeBullet!=0)) {
					this.calculateArmor(this.armor+this.skillInfo[0]);
				}
				
				var self = this;
				var specialEffect = [11,12];
				for(var i=0;i<specialEffect.length;i++){
					if (typeof self.effect[specialEffect[i]] !== "undefined") if (self.effect[specialEffect[i]] != 0){
						if((bullet.element==4)&&(specialEffect[i]==12)) dmg*= self.effect[12][2];
						if((bullet.element==9)&&(specialEffect[i]==11)) dmg*= self.effect[11][2];
					}
				}
				var reduceDamage = this.reduceDamage;
				dmg*= (1-reduceDamage);
			}
			if((this.skill==5)&&(this.immunity==0)){
				if(this.skillInfo[1]==this.skillDuration)  {
					this.textShow(lang.monster.Textshow.ID5,"#00F");
					this.immunity = 1; 
				}
			}
			
			// Nhận Dam
			this.currentHP -= dmg*(1-this.immunity);
            if (!this.isDead) if (this.currentHP <= 0) {
                if (typeof bullet != "undefined") {
					if(bullet.bonus == 14){	 	//Eff của trụ, có được mạng thưởng ko
						this.battleContainer.currentLife+=bullet.infoEff.ID14[0];
					}
					if(bullet.bonus == 15){
						this.bounty += bullet.infoEff.ID15[0];	//Eff của trụ, có được tiền thưởng ko
					}
					bullet.isLasthit = true;
				}
				this.battleContainer.currentGold += this.bounty;
                this.battleContainer.removeMonster(this.id); // Hết máu thì chết đê
				
            }
			
        },
		takeEffImage: function(effectID,duration){	//Hàm hiện hình effect khi quái bị dính 
			if(effectID>6) return;
			var self = this;
			if(typeof self.drawEffect == "undefined") self.drawEffect = [];
			if((typeof self.drawEffect[effectID] == "undefined")||(self.drawEffect[effectID].expired)){
				var img = this.director.getImage("towerEff"+effectID);
				var numImg = Math.round(img.width/img.height);
				var animation = [];
				for(var i=0;i<numImg;i++) animation[i] = i;
				var effectImage=new CAAT.Foundation.SpriteImage().initialize(img,1,numImg ).
										addAnimation("1",  animation, 100);
				var drawEffect= new CAAT.Foundation.ActorContainer().
										setDiscardable(true).
										setBackgroundImage(effectImage, true).
										setLocation(12, 20).
										//setScaleAnchored(MONSTER_SIZE/2/effectImage.singleWidth,MONSTER_SIZE/effectImage.singleHeight).
										playAnimation("1").
										setFrameTime(self.battleContainer.time,duration).
										setChangeFPS(200).
										enableEvents(false);
				if(typeof this.drawEffect[effectID] !="undefined") this.removeChild(this.drawEffect[effectID]);
				this.drawEffect[effectID] = drawEffect;
				this.addChild(drawEffect);
			}
			else{
				this.drawEffect[effectID].start_time = self.battleContainer.time;
			}
		},
        takeEff: function(effectID, effectArg) {	//Hàm xử lý khi quái bị dính effect
            var self = this;
			// Nếu hiện tại chưa dính Effect này thì ném vào thôi
            if ((typeof self.effect[effectID] == "undefined") || (self.effect[effectID] == 0)) {
				//Hiện hình cái đã
				self.takeEffImage(effectID,effectArg[effectArg.length-1]);
				self.effect[effectID] = effectArg.concat();
                switch (effectID) {
                    case 0:
                        self.currentSpeed *= (1 - effectArg[1]);
                        break;
                    case 1: break;
                    case 2:
                        self.currentSpeed *= (1 - effectArg[1]);
                        break;
                    case 3:
                        self.isStun = 1;
                        break;
                    case 4: 
						self.textShow(["Khói mù","Blind"],"#F00");
						self.moveDirection = -1;
						break;
                    case 5:
                        self.isStun = 1;
                        break;
                    case 6:
                        self.isStun = 1;
                        self.currentSpeed *= (1 - effectArg[1]);
                        break;
                    case 7: 
						self.calculateArmor(self.armor - effectArg[1]);
						self.effect[effectID] = 0;
						break;
                    case 8: 
						self.isPush = 1;
						break;
                    case 9: break;
                    case 10: break;
                    case 11: 
						self.currentSpeed *= (1 - effectArg[0]);
						break;
                    case 12: 
						self.currentSpeed *= (1 - effectArg[0]);
						break;
                    case 13: 
						self.currentSpeed *= (1 - effectArg[0]);
						break;
                    case 17: break;
                    case 18: break;
                    case 19: break;
                    case 20: break;
                    case 21: break;
                    case 22: break;
                    case 23: break;
                    case 24: break;
                    case 25: break;
                }
            }
			//Nếu dính rồi thì reset lại thời gian
			else{
				if(effectID!=8){
					self.effect[effectID] = [];
					self.effect[effectID] = effectArg.concat();
					self.takeEffImage(effectID,effectArg[effectArg.length-1]);
					//for (var i = 0; i < effectArg.length; i++) self.effect[effectID][i] = effectArg[i];
				}
				else{
					self.pushCount++;
				}
			}
        },
        getCurrentCell: function() {	// Lấy id ô hiện tại mà quái đang đứng
            var self = this;
            var pointList = self.pointList;
            var currentPoint = self.currentPoint;
            var pointId = pointList[currentPoint].x * self.currentMap.mapWidth + pointList[currentPoint].y;
            return pointId;
        },
        moveOnPath: function() {	//Hàm di chuyển theo đường chạy
            var self = this;
            var pointList = self.pointList;
            var currentPoint = self.currentPoint;
			//Update mảng chứa vị trí và khoảng cách của tất cả
            var pointId = pointList[currentPoint].x * self.currentMap.mapWidth + pointList[currentPoint].y;
            var index = self.currentMap.distanceData[pointId].currentMonster.indexOf(self.id);
            if (index != -1) self.currentMap.distanceData[pointId].currentMonster.splice(index, 1);
            //console.log(pointId);
			var direction = self.moveDirection;
			if(direction == - 1){
			    if ((currentPoint <= 0) || (self.battleContainer.random() < 0.4)) direction = 1;
			}
			self.currentPoint+= direction;
			// Chưa đến cuối đường, đến ô tiếp theo nào
            if (currentPoint < pointList.length - 1) {
                self.moveComplete = false;
                var horizontal = pointList[currentPoint + direction].y - pointList[currentPoint].y;
                var vertical = pointList[currentPoint + direction].x - pointList[currentPoint].x;
                self.movePositionX += horizontal * TILE_SIZE;
                self.movePositionY += vertical * TILE_SIZE;
                var nextPointId = pointList[currentPoint + direction].x * self.currentMap.mapWidth + pointList[currentPoint + direction].y;
                self.currentMap.distanceData[nextPointId].currentMonster.push(self.id);
            }
			// Hết đường rồi
            else {
                this.battleContainer.currentLife--;
                if (this.battleContainer.currentLife< 1) {
					//Nếu hết mạng thì thua cmnđ
                    this.battleContainer.lostBattle();
                }
                else {
					//Vẫn còn mạng, bay về vị trí xuất phát rồi đi tiếp nào
                    self.currentPoint = 0;
                    self.positionX = self.startX;
                    self.positionY = self.startY;
                    self.movePositionX = self.startX;
                    self.movePositionY = self.startY;
                    self.moveOnPath();
                }
            }
        },
        lastTime: 0,
		secTime: 0,
		drawTime:0,
		paint: function(director, time) {
            CAAT.Monster.superclass.paint.call(this, director, time);
			self.drawTime=time;
		},
		
        update: function(director, time) {
            if (!this.stopMove) {     
                var self = this;
                var dt = time - self.lastTime;
				self.lastTime=time;
                if (self.lastTime == 0) dt = 0;
				//Skill của quái
				switch(self.skill){
					case 0:
						if(self.currentHP<self.hp){
							var addHP = self.currentHP + self.skillInfo[0]*self.hp/100*dt/1000;
							if(addHP>=self.hp) self.currentHP = self.hp;
							else self.currentHP = addHP;
						}
						break;
					case 1:
						if(self.skillInfo[1]<=0){
							self.skillInfo[1] = self.skillDuration;
							if(self.currentHP<self.hp){
								var addHP = self.currentHP + self.skillInfo[0]*self.hp/100;
								if(addHP>=self.hp) addHP = self.hp;									
								var text = ""+((addHP-self.currentHP)>>0);
								var showText = new CAAT.DamageShow().initialize(text,0,0,"",self.battleContainer);
								self.addChild(showText);
								showText.active(self.battleContainer.scene_time);
								self.currentHP = addHP;
							}
						}
						else{
							self.skillInfo[1]-=dt;
						}
						break;
					case 3:
						if(time - self.secTime > 1000){
							self.secTime = time;
							if(self.currentSpeed<self.skillInfo[1]){
								var newSpeed = self.currentSpeed*(1+self.skillInfo[0]/100);
								if(newSpeed<self.maxSpeed)self.currentSpeed = newSpeed;
								else self.currentSpeed = self.maxSpeed;
							}
						}
						break;
					case 5:
						if(self.immunity == 1){
							if(self.skillInfo[0]<=0){
								self.immunity = 0;
								self.skillInfo[0] = self.skillDuration2;
								self.skillInfo[1]-=dt;
							}
							else{
								self.skillInfo[0]-=dt;
							}
						}
						if((self.immunity == 0)&&(self.skillInfo[1]!=self.skillDuration)){
							if(self.skillInfo[1]<=0){
								self.skillInfo[1] = self.skillDuration;
							}
							else{
								self.skillInfo[1]-=dt;
							}
						}
						break;
				}
				//Effect bị dính từ trụ
                for (key in self.effect) {
                    if (self.effect[key] != 0) {
                        switch (key) {
                            case "0":
                                if (self.effect[key][2] <= 0) {
									var newSpeed = self.currentSpeed / (1 - self.effect[key][1]);
									if(newSpeed<self.maxSpeed)self.currentSpeed = newSpeed;
									else self.currentSpeed = self.maxSpeed;
                                    self.effect[key] = 0;
                                }
                                else {
                                    self.effect[key][2] -= dt;
                                }
                                break;
                            case "1":
                                if (self.effect[key][2] <= 0) {
                                    self.effect[key] = 0;
                                }
                                else {
                                    self.effect[key][2] -= dt;
                                    self.takeDmg(self.effect[key][1] * dt / 1000);
                                }
                                break;
                            case "2":

                                if (self.effect[key][3] <= 0) {
									var newSpeed = self.currentSpeed / (1 - self.effect[key][1]);
									if(newSpeed<self.maxSpeed)self.currentSpeed = newSpeed;
									else self.currentSpeed = self.maxSpeed;
                                    self.effect[key] = 0;
                                }
                                else {
                                    self.effect[key][3] -= dt;
									var dmg = self.effect[key][2] * dt / 1000;
									if((typeof self.effect[12] !== "undefined") && (self.effect[12] != 0)) dmg*=self.effect[12][2];
                                    self.takeDmg(dmg);
                                }
                                break;
                            case "3":
                                if (self.effect[key][1] <= 0) {
                                    self.isStun = 0;
                                    self.effect[key] = 0;
                                }
                                else {
                                    self.effect[key][1] -= dt;
                                }
                                break;
                            case "4":
								if (self.effect[key][1] <= 0) {
                                    self.moveDirection = 1;
                                    self.effect[key] = 0;
                                }
                                else {
                                    self.effect[key][1] -= dt;
                                }
                                break;
                            case "5":
                                if (self.effect[key][2] <= 0) {
                                    self.isStun = 0;
                                    self.effect[key] = 0;
                                }
                                else {
                                    self.effect[key][2] -= dt;
                                    self.takeDmg(self.effect[key][1] * dt / 1000);
                                }
                                break;
                            case "6":
                                if (self.effect[key][2] <= 0) {
                                    if (self.isStun == 1) self.isStun = 0;
                                    if (self.effect[key][3] <= 0) {
                                        var newSpeed = self.currentSpeed / (1 - self.effect[key][1]);
										if(newSpeed<self.maxSpeed)self.currentSpeed = newSpeed;
										else self.currentSpeed = self.maxSpeed;
                                        self.effect[key] = 0;
                                    }
                                    else {
                                        self.effect[key][3] -= dt;
                                    }
                                }
                                else {
                                    self.effect[key][2] -= dt;
                                }
                                break;
                            case "7": break;
                            case "8": 
								if (self.effect[key][1] <= 0) {
									var dmg = Math.pow(self.effect[key][0],self.pushCount);
									self.takeDmg(dmg);
                                    self.effect[key] = 0;
									self.isPush = 0;
									self.pushCount = 1;
                                }
                                else {
                                    self.effect[key][1] -= dt;
                                }
								break;
                            case "9": break;
                            case "10": break;
                            case "11": break;
                            case "12": break;
                            case "13": break;
                            case "14": break;
                            case "15": break;
                            case "16": break;
                            case "17": break;
                            case "18": break;
                            case "19": break;
                            case "20": break;
                            case "21": break;
                            case "22": break;
                            case "23": break;
                            case "24": break;
                            case "25": break;
                        }
						if((key=="11")||(key=="12")||(key=="13")){
							var lastArg = self.effect[key].length-1;
								if (self.effect[key][lastArg] <= 0) {
								var newSpeed = self.currentSpeed / (1 - self.effect[key][0]);
								if(newSpeed<self.maxSpeed)self.currentSpeed = newSpeed;
								else self.currentSpeed = self.maxSpeed;
								self.effect[key] = 0;
							}
							else {
								self.effect[key][lastArg] -= dt;
								self.takeDmg(self.effect[key][1] * dt / 1000);
							}
						}
                    }
                }
					
				//Có bị dính effect 8 là Push ko, nếu có thì shock đi cưng
				if(self.isPush==-1)self.isPush = 1;
				else if(self.isPush==1) self.isPush = -1;
                var pixelChange = TILE_SIZE*self.currentSpeed * (1-self.isStun) * dt/1000;
                if ((Math.abs(self.movePositionX - self.positionX) >= pixelChange) || (Math.abs(self.movePositionY - self.positionY) >= pixelChange)) {
                    var shock = self.isPush;
                    if(shock == 0) shock = 1;
                    if (self.movePositionX >= self.positionX + pixelChange) self.positionX += pixelChange*shock;
                    else if (self.movePositionX <= self.positionX - pixelChange) self.positionX -= pixelChange*shock;
                    else if (self.movePositionY >= self.positionY + pixelChange) self.positionY += pixelChange*shock;
                    else self.positionY -= pixelChange*shock;
                }
                else if (!self.moveComplete) {
                    self.moveComplete = true;
                    self.moveOnPath();
                }             				
            }
        }

    }
    extend(CAAT.Monster, CAAT.Unit);
})();
