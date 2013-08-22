(function () {
	CAAT.Tower = function(){
		CAAT.Tower.superclass.constructor.call(this);
		return(this);
	}
	CAAT.Tower.prototype = {
		image : null,
		bullets:[],
		numKills:0,
		numFire:0,
		target:null,
		bonusDmg:0,
		bonusSpeed:1,
		initialize: function(battleContainer,type,EXP,x, y,id){
			var self = this;
			this.x = x;
			this.y = y;
			this.type = type;
			this.id = id;
			this.director = battleContainer.director;
			this.battleContainer = battleContainer;
			
			var currentMap = battleContainer.currentMap;
			this.currentMap = currentMap;
			var cell_id = ((x / TILE_SIZE >> 0) + currentMap.mapWidth * (y / TILE_SIZE >> 0));
			this.cell_id = cell_id;
			this.level = 0;
			this.resetType(type);
			currentMap.distanceData[cell_id].currentTower = self.id;
			this.EXP = EXP;
			this.selected = false;
			var showSelected = new CAAT.Foundation.ActorContainer().setBounds(0, 0, this.width, this.height);
			showSelected.paint = function(director,time){
				if(self.selected){
					var ctx = director.ctx;
					ctx.save();
					ctx.strokeStyle = "#0F0";
					ctx.lineWidth = 5;
					
					ctx.beginPath();
					ctx.arc(self.width/2,self.height/2,self.range/self.scaleX,0,Math.PI*2);
					ctx.stroke();
					ctx.closePath();
					
					ctx.beginPath();
					ctx.scale(1,0.4);
					ctx.arc(77,360,70,-Math.PI/4,5*Math.PI/4);
					ctx.stroke();
					ctx.closePath();
					ctx.restore();
					
				}
			}
			this.addChild(showSelected);
			if(typeof this.greyActor == "undefined"){
				this.greyActor = new CAAT.Foundation.Actor().setBounds(0,0,this.width,this.height).setAlpha(0).setFillStyle("#000");
				this.addChild(this.greyActor);
			}
			self.calBonus();
			return this;
			
		},
		resetType: function(type){
			var tower = data.Tower[type];
			var currentMap = this.currentMap;
			var cell_id = this.cell_id;
			var self =this;
			this.type = type;
			this.image = this.director.getImage(tower.Image);
			this.init(this.image, this.x, this.y, TOWER_SIZE, TOWER_SIZE);
			this.range = tower.Range*TILE_SIZE;		
			this.name = tower.Name.concat();
			this.description = tower.Description.concat();
			this.damage = tower.Damage.concat();
			this.bulletID = tower.BulletID;;
			this.reloadTime = tower.ReloadTime;
			this.price = tower.Price;
			this.element = tower.Element.concat();
			this.resitant = tower.Resitant.concat();
			this.effect = tower.EffectID.concat();
			this.infoEff ={};
			for (x in tower.InfoEff) this.infoEff[x]=tower.InfoEff[x].concat(); 
			if (this.infoEff.ID9 || this.infoEff.ID10)
			    this.queue = findRange(currentMap.distanceData[cell_id].queue, self.range, 1);//chi check nhung o dat dc tru
			else
			    this.queue = findRange(currentMap.distanceData[cell_id].queue, self.range, 2);//chi check nhung o duong di
			this.levelUp(this.level);	
		},
		getXP: function (XP) {
		    this.EXP += XP; //Nhận thêm EXP
		    for (i=0;i<this.battleContainer.tableXP.Required.length;i++){
		        if (this.EXP < this.battleContainer.tableXP.Required[i]) {
					var lastLevelExp = (i>0)?this.battleContainer.tableXP.Required[i-1]:0;
					this.currentLevelExp = this.EXP-lastLevelExp;
					this.nextLevelExp = this.battleContainer.tableXP.Required[i]-lastLevelExp;
					this.percentLevel = this.currentLevelExp/this.nextLevelExp;
					
		            var level = i - 1;
		            if (level > this.level) {
		                this.level = level;
		                this.levelUp(level);
		            }
		            break;
		        }
		    }
		    return this;
		},
		levelUp: function (level) {
		    var self = this;
		    var currentMap = self.battleContainer.currentMap;
		    var tower = data.Tower[self.type];
		    var cell_id = ((self.x / TILE_SIZE >> 0) + currentMap.mapWidth * (self.y / TILE_SIZE >> 0));
		    self.damage = [tower.Damage[0] + tower.LevelUp.Dmg * level, tower.Damage[1] + tower.LevelUp.Dmg * level];//Tang dmg
			
		    self.range = (tower.Range + tower.LevelUp.Ran*level) * TILE_SIZE >> 0;//Tang range
            //Cap nhat lai range
		    if (self.infoEff.ID9 || self.infoEff.ID10)
		        self.queue = findRange(currentMap.distanceData[cell_id].queue, self.range, 1);//chi check nhung o dat dc tru
		    else
		        self.queue = findRange(currentMap.distanceData[cell_id].queue, self.range, 2);//chi check nhung o duong di
		    self.reloadTime = tower.ReloadTime - tower.LevelUp.RlT * level;//Tang toc ban
		    var n = 0;//biến đếm cho mảng chỉ số eff được thêm của levelUp
		   for (key in self.infoEff) {
			var InfoEff=self.infoEff[key].concat();
		        for (x in InfoEff) {
		            self.infoEff[key][x] += tower.LevelUp.Eff[n];//Tang suc manh cua effect
		            n++;
		        }
		    }
		    return this;
		},
		upgrade: function (elementID) {
		    var self = this;
		    arr = this.element.concat();
		    if (arr.length > 1 && elementID == 5) {
		        arr.sort();
		        if (arr[0] == arr[arr.length - 1]) elementID = arr[0];
		    }
		    else if (arr.length == 1 && elementID == 5) elementID = arr[0];
		    arr.push(elementID);//mang chua element cua tru		    
		    arr.sort();
		    arr_str=arr.toString();//chuyen mang thanh string de so sanh
		    for (type in data.CombineTower) {
		        combineData=data.CombineTower[type].toString();
		        if (arr_str == combineData) {//Tru minh can day r \m/
		            this.resetType(type);
		            this.element = data.Tower[type].Element.concat();
		            break;
		        }
		    }
		    
		},
		removeTower: function () {
		    var self = this;
		    if (self.infoEff.ID9||self.infoEff.ID10){
		        for (x in this.queue) {
		            id = this.queue[x];
		            var cell_id = currentMap.distanceData[id];
		            if (self.infoEff.ID9)//xoa buff cua tower o cac o xung quanh
		                for (i in cell_id.bonusDmg)
		                    if (cell_id.bonusDmg[i][0] == self.infoEff.ID9[0] && cell_id.bonusDmg[i][1] == self.infoEff.ID9[1])
		                        cell_id.bonusDmg.splice(i, 1);
		            if (self.infoEff.ID10) { cell_id.bonusSpeed.splice(cell_id.bonusSpeed.indexOf(1 + self.infoEff.ID10[0] / 100),1); }
		            if (currentMap.distanceData[id].currentTower != null) {
		                id_target = currentMap.distanceData[id].currentTower;
		                var towerArray = this.battleContainer.towerArray;
		                for (id_tower in towerArray)
		                    if (towerArray[id_tower].id == id_target) {
		                        id_target = id_tower; break;
		                    }
		                towerArray[id_target].calBonus();
		            }
		        }

		    }
		    for (x in this.bullets) {
		        if (this.bullets[x].isEnd) this.bullets[x].isEnd();
		    }
		},
		canUpgrade:function(){
		    if (this.element.length <2) return true; else return false;
		},
		calBonus : function (){ //tinh bonus
			var self=this;
			var currentMap = self.battleContainer.currentMap;
			var cell_id = ((self.x / TILE_SIZE >> 0) + currentMap.mapWidth * (self.y / TILE_SIZE >> 0));
			var _cell=currentMap.distanceData[cell_id];
			if (_cell.bonusDmg.length>0) self.bonusDmg= _cell.bonusDmg[0][0]*(self.damage[0]+tower.self[1])/200+_cell.bonusDmg[0][1];
			if (_cell.bonusSpeed.length>0) self.bonusSpeed= _cell.bonusSpeed[0];
			return this;
		},
		startDisableTime: 0,
		disableTime : 0,
		disabled : false,
		disable: function (duration) {
			this.disableTime = duration;
			this.disabled = true;
			this.queue = [];
			this.greyActor.setAlpha(0.5);
			return this;
		},
		enable: function () {
		    var self = this;
			this.disabled = false;
			this.greyActor.setAlpha(0);
		    var currentMap = self.battleContainer.currentMap;
		    var cell_id = ((self.x / TILE_SIZE >> 0) + currentMap.mapWidth * (self.y / TILE_SIZE >> 0));
		    if (!this.infoEff.ID9 && !this.infoEff.ID10)
		        this.queue = findRange(currentMap.distanceData[cell_id].queue, self.range, 2);//chi check nhung o duong di
		    return this;
		},
		textShow: function(texts,color,fontSize){
			var text = texts[LANGUAGE];
			var showText = new CAAT.DamageShow().initialize(text,50,0,color,this.battleContainer,fontSize);
			this.addChild(showText);
			showText.active(this.battleContainer.time);
		},
		lastFire:0,
		paint : function (director,time) {   
			CAAT.Monster.superclass.paint.call(this, director, time);
		},
        XPTime:0,
		update : function (director,time) {
			var target;		
			var self = this;
			if(self.disabled){
				if (self.startDisableTime==0)self.startDisableTime = time;
				var dt = time - self.startDisableTime;
				if(self.disableTime < dt){
					self.disableTime = 0
					self.startDisableTime = 0;
					self.enable();
				}
			}
			var currentMap = this.battleContainer.currentMap;
			var monsterArray = this.battleContainer.monsterArray;
			if (this.infoEff.ID19||this.infoEff.ID11||this.infoEff.ID12||this.infoEff.ID13||this.infoEff.ID8||this.infoEff.ID23)
			{	 
				target=[];
				for (x in this.queue){
					id=this.queue[x];
					if (currentMap.distanceData[id].currentMonster.length>0) {
						for (i=0;i<currentMap.distanceData[id].currentMonster.length;i++){
							id_target = currentMap.distanceData[id].currentMonster[i];
							monster=monsterArray[id_target];
							if (monster)
								target.push(monster);
						}
					}
				}
				if (this.infoEff.ID8)  {//Push towet
						if (time%this.reloadTime==0) {
							if (target.length>0)
							for (i=0;i<target.length;i++)
								target[i].takeEff(8,this.infoEff.ID8);	
							self.lastFire = time;
						}
						if (time - self.XPTime > 1000) {//Tang kinh nghiem moi s
						    self.XPTime = time;
						    self.getXP(this.battleContainer.tableXP.XPTime);
						}
					} else
				if (target.length>0){
					if (this.infoEff.ID19) {//multi shot	
						if (time - self.lastFire > (this.reloadTime/self.bonusSpeed)) {
							for (i=0;i<target.length;i++)
								this.fire(target[i], director,time);
								self.lastFire = time;
						}                
					} else {
						var id,infoEff,bonusEff;
						if (self.infoEff.ID11) {id=11;infoEff=self.infoEff.ID11;}
						if (self.infoEff.ID12) {id=12;infoEff=self.infoEff.ID12;}
						if (self.infoEff.ID13) {id=13;infoEff=self.infoEff.ID13;}
						if (self.infoEff.ID23) {id=23;infoEff=self.infoEff.ID23;}
						for (i=0;i<target.length;i++){
							for (key in target[i].effect) {
								if (id==13&&key=="2") {bonusEff=target[i].effect[2];bonusID=2;}
								if (id==12&&key=="1") {bonusEff=target[i].effect[1];bonusID=1;}
							}
						}
						for (i=0;i<target.length;i++){
							target[i].takeEff(id,infoEff);	
							if	(bonusEff) {target[i].takeEff(bonusID,bonusEff);}
						}
						if (time - self.XPTime > 1000) {//Tang kinh nghiem moi s
						    self.XPTime = time;
						    self.getXP(self.battleContainer.tableXP.XPTime);
						}
					}						
				}				
			}	
			else
			if ((this.infoEff.ID9||this.infoEff.ID10)){ //buff tower
				if (!this.isBuffed){
				for (x in this.queue){
					id=this.queue[x];
					if (self.infoEff.ID9) currentMap.distanceData[id].bonusDmg.push([self.infoEff.ID9[0],self.infoEff.ID9[1]]);
					if (self.infoEff.ID10) {currentMap.distanceData[id].bonusSpeed.push(1+self.infoEff.ID10[0]/100);}	
					if (currentMap.distanceData[id].currentTower!=null) {
						id_target = currentMap.distanceData[id].currentTower;
						var towerArray = this.battleContainer.towerArray;
						for (id_tower in towerArray)
							if (towerArray[id_tower].id==id_target){
								id_target=id_tower;break;
							}
						towerArray[id_target].calBonus();														
					}
																	
					}
					this.isBuffed=true;
				}
				
				
				if (time - self.XPTime > 1000) {//Tang kinh nghiem moi giay
				    self.XPTime = time;
				    self.getXP(this.battleContainer.tableXP.XPTime);
				}
			}
			else
			{
                for (x in this.queue){
					id=this.queue[x];
					if (currentMap.distanceData[id].currentMonster.length>0) {
					    id_target = currentMap.distanceData[id].currentMonster[0];
						target=monsterArray[id_target];	
						break;
					}
				}				
                if (target){
					
                    if (time - self.lastFire > (this.reloadTime/self.bonusSpeed)) {
                        this.fire(target, director,time);
                        self.lastFire = time;
                    }                
				}  
			} 
			
					
            var i = 0;
            for (i = 0; i < self.bullets.length; i++) {                
                if (self.bullets[i]) {
					self.bullets[i].update(director,time);
                }               
            }
			return this;
        },
		
		fire : function (monster, director,time) {
			var self=this;
			var battleContainer = this.battleContainer;
			var currentMap = this.battleContainer.currentMap;
			var monsterArray = this.battleContainer.monsterArray;
			var bullet = new CAAT.Bullet().initialize(director, self.type, self.x + TOWER_SIZE / 2, self.y, battleContainer);
			bullet.tower = self;
			bullet.reloadTime=self.reloadTime;
			var scene=self.parent;
			scene.addChild(bullet);
			bullet.textShow=function(){
				var text=(bullet.lastDmg<<0)+"";
				self.textShow([text,text],"#F00");
			}
			bullet.isEnd=function(time){
				
			    if (bullet.infoEff.ID24) {// nếu eff là chain
			        var cell_id = bullet.target.getCurrentCell();// tìm vị trí theo ô của con quái vừa bắn trúng
					bullet.targetForEffect24.push(bullet.target.id);
					var queue = findRange(currentMap.distanceData[cell_id].queue, bullet.infoEff.ID24[2] * TILE_SIZE, 2);//Tìm các ô xung quanh ô cell_id
			        //console.log(queue);
					
					if (bullet.chain < bullet.infoEff.ID24[1]) {//Nếu số lần nảy nhỏ hơn số lần nảy tối đa
			            var arrayTarget = [];
						for (x = 0; x < queue.length; x++) {//Chạy từng x trong mảng các ô lân cận ( KHÔNG bỏ qua chính nó)
							id = queue[x];//id của ô cần check
							for(var i=0;i<currentMap.distanceData[id].currentMonster.length;i++){
								arrayTarget.push(currentMap.distanceData[id].currentMonster[i]);
							}
						}
						//console.log(arrayTarget);
						var founded = false;
						if (bullet.isLasthit) { self.numKills++; self.getXP(bullet.target.xp); bullet.isLasthit = null; }
						for(var i=0;i<arrayTarget.length;i++){
							if(bullet.targetForEffect24.indexOf(arrayTarget[i])==-1){
								bullet.chain++;
								var id_target = arrayTarget[i];
								bullet.targetForEffect24.push(id_target);
								bullet.setTarget(monsterArray[id_target], time);//set target mới cho đạn là con quái check đc
								founded = true;
								break;
							}
						}
						if (!founded) {//nếu tìm hết các ô lân cận mà éo thấy đối tượng khả nghi
							//xóa đạn
							console.log(bullet.targetForEffect24);
							bullet.targetForEffect24 = [];
							scene.removeChild(bullet);
							self.bullets.splice(self.bullets.indexOf(bullet), 1);
						}
			            

			        } else {
						console.log(bullet.targetForEffect24);
						bullet.targetForEffect24 = [];
			            scene.removeChild(bullet);
			            self.bullets.splice(self.bullets.indexOf(bullet), 1);
					}

					
			    } else {
					if(bullet.isLasthit) {
						self.numKills++;
						self.getXP(bullet.target.xp);
						if (self.infoEff.ID22) {
							var id=bullet.target.getCurrentCell();
							var AOE=bullet.infoEff.ID22[0]*TILE_SIZE;
							var queue=currentMap.distanceData[id].queue;
							for (j=0;j<queue.length;j++){			
								if (queue[j].distance<AOE){
									for(i=0;i<currentMap.distanceData[queue[j].ID].currentMonster.length;i++) {
										id_target = currentMap.distanceData[queue[j].ID].currentMonster[i];
										if (monsterArray[id_target])
											monsterArray[id_target].takeDmg(bullet.infoEff.ID22[1],bullet);		
									}; //AOE
								} else break;
							}
						}
					}
					scene.removeChild(bullet);
					self.bullets.splice(self.bullets.indexOf(bullet),1);
				}
			}		
			
			bullet.element=this.element;
			bullet.effect=this.effect;
			bullet.infoEff = this.infoEff;
			bullet.resitant = this.resitant;
            bullet.damage = battleContainer.random() * (self.damage[1] - self.damage[0]) + self.damage[0]+self.bonusDmg;
			if (this.infoEff.ID18||this.infoEff.ID20){		
				if (!self.target) self.target=monster;
				else if (self.target==monster) {
						bullet.isSame=true;
						self.numFire++;
						bullet.numFire=self.numFire;
					} else {
						self.numFire=0;
						self.target=monster;
					}
				if (this.infoEff.ID20&&self.numFire<=self.infoEff.ID20[1]) self.bonusSpeed=self.numFire*self.infoEff.ID20[0]/100+1;
			}
            bullet.type = this.type;
            bullet.setTarget(monster,time);
            this.bullets.push(bullet); 
            return this;
        }
		
		
	}
	var findRange = function (queue,range,id){
			var self_queue=[];
			for (i=0;i<queue.length;i++){			
				if (queue[i].distance<range){
					if(queue[i].type==id)
						self_queue.push(queue[i].ID);				
					}
				else break;
			}
			return self_queue;			
	}
	extend(CAAT.Tower, CAAT.Unit);
})();
