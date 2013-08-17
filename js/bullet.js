(function () {
	
	CAAT.Bullet = function(){
		CAAT.Bullet.superclass.constructor.call(this);
		return(this);
	}
	CAAT.Bullet.prototype = {
		speed : null,
		image : null,
		gunPosX : null,
		gunPosY : null,
		target:null,
		isEnd:null,
		textShow:null,
		effect:[],
		infoEff:null,
		element:[],
		lastDmg:0,
		isLasthit:false,
		numFire:0,
		isSame:false,
		bonus:-1,
		targetForEffect24: [],
		initialize: function(director,ID,x, y,battleContainer){
			var self = this;
			this.battleContainer = battleContainer;
			this.targetForEffect24 = [];
			this.gunPosX=x;
			this.gunPosY=y;	
			var bullet = data.Bullet[ID];
			this.name = bullet.Name.concat();
			//this.element = bullet.Element;			
            this.speed = bullet.Speed*TILE_SIZE;
			this.typeBullet = bullet.Typebullet;
			if (this.typeBullet==1){
				this.image = director.getImage(bullet.Image);
				self.setBackgroundImage(self.image, true).setScaleAnchored(0.5,0.5,0,0).setLocation(x,y);
			}
			else if (this.typeBullet==10)
				this.image=new CAAT.Foundation.SpriteImage().initialize(director.getImage("Image39"),1,10 );
			else 
				this.image=new CAAT.Foundation.SpriteImage().initialize(director.getImage(bullet.Image),1,8 );
			return this;	
		},		
		setTarget : function (target,time) {
			this.target=target;	
			this.lastTime=time;			
			if(!this.bullet10hited&&this.typeBullet==10){
				var self=this;
				this.bullet10hited = true;
				calculatorEff(self);
				this.setBackgroundImage(self.image, true).setAnimationImageIndex([0,1,2,3,4,5,6,7,8,9]).setScaleAnchored(1,1,0,0).setChangeFPS(150).
					setDiscardable(true).
					enableEvents(false).
					setPosition(target.x,target.y).
					setFrameTime(time, 1000);
			
			} else
			if (!this.bullet10hited&&this.typeBullet==0){
				var self=this;
				this.bullet10hited = true;
				var nextX=this.target.x+MONSTER_SIZE/2;							
				var nextY=this.target.y+MONSTER_SIZE/2;
				var dx = nextX - self.gunPosX;
				var dy = nextY - self.gunPosY;		
				var d=Math.sqrt(dx*dx+dy*dy);
				var angle = Math.atan2(dy, dx)-Math.PI/2;
				this.setRotationAnchored(angle,0.5,0);
				this.setBackgroundImage(self.image, true).setAnimationImageIndex([0,1,2,3,4,5,6,7]).setChangeFPS(150).
					//setDiscardable(true).
					enableEvents(false).
					setLocation(self.gunPosX,self.gunPosY).
					setPositionAnchor( 0.5, 0 ).
					setFrameTime(time, 1000);
				var tyle=d/self.height;
				this.setScaleAnchored(0.2,tyle,0.5,0);
				
			}
        },
		chain:0,
		lastTime:0,
		paint : function (director,time) {   
			CAAT.Bullet.superclass.paint.call(this, director, time);
		},
		update : function (director,time) {   
			if (this.target){
				if (!this.target.isDead){
						var self=this;
						if (this.typeBullet==1) {//Neu loai dan la classic
						    var dt = time - self.lastTime;
						    self.lastTime = time;
							if (dt>20) return;
							//Toa do cua bullet de tinh toan
							var x=self.x;
							var y=self.y;
							
							var nextX=this.target.x;							
							var nextY=this.target.y+MONSTER_SIZE/2;
							var dx = nextX - x;
							var dy = nextY - y;								
							if (Math.abs(dx)<10&&Math.abs(dy)<10) {//Va cham giua dan va quai
								calculatorEff(self);if (self.isEnd) self.isEnd(time);
							}else {	//Tinh toan vi tri va goc quay cua dan				
								var angle = Math.atan2(dy, dx);
								var speedX = Math.cos(angle) * this.speed * dt / 1000;
								var speedY = Math.sin(angle) * this.speed * dt / 1000;
								x+=speedX;
								y+=speedY;
							}
							
							//Ve dan
							this.setRotation(angle);
							this.x=x;
							this.y=y;
							
						} else if (this.typeBullet==10){
							this.x = this.target.x;
							this.y = this.target.y;
						} else if (this.typeBullet==0){
							
							calculatorEff(self);	
													
							var nextX=this.target.x+MONSTER_SIZE/2;							
							var nextY=this.target.y+MONSTER_SIZE/2;
							var dx = nextX - self.gunPosX;
							var dy = nextY - self.gunPosY;
							var d=Math.sqrt(dx*dx+dy*dy);							
							var angle = Math.atan2(dy, dx)-Math.PI/2;								
							var tyle=d/self.height;
								
							this.setRotationAnchored(angle,0.5,0);
							this.setScaleAnchored(0.2,tyle,0.5,0);
							
								
								
						
						}
					
				} else {if (this.isEnd) this.isEnd(time);}
			}
        }
	}
	var calculatorEff=function(self){//Tinh toan dam va effect cho dan khi gap quai
		var currentMap = self.battleContainer.currentMap;
		if (!self.consecutive||self.chain>0){
		self.consecutive=true;	
		self.lastDmg=self.damage;
		for (k=0;k<self.effect.length;k++)					
			switch (self.effect[k]) {
			    case 0: if (self.battleContainer.random() * 100 < self.infoEff.ID0[0]) self.target.takeEff(0, self.infoEff.ID0); break; //Slow
			    case 1: if (self.battleContainer.random() * 100 < self.infoEff.ID1[0]) self.target.takeEff(1, self.infoEff.ID1); break; //Burn
			    case 2: if (self.battleContainer.random() * 100 < self.infoEff.ID2[0]) self.target.takeEff(2, self.infoEff.ID2); break; //Poison
			    case 3: if (self.battleContainer.random() * 100 < self.infoEff.ID3[0]) self.target.takeEff(3, self.infoEff.ID3); break; //Bind
			    case 4: if (self.battleContainer.random() * 100 < self.infoEff.ID4[0]) self.target.takeEff(4, self.infoEff.ID4); break; //Blind
			    case 5: if (self.battleContainer.random() * 100 < self.infoEff.ID5[0]) self.target.takeEff(5, self.infoEff.ID5); break; //Bite
			    case 6: if (self.battleContainer.random() * 100 < self.infoEff.ID6[0]) self.target.takeEff(6, self.infoEff.ID6); break; //Ice
				case 14: self.bonus=14;break; //life
				case 15: self.bonus=15;break; //bounty
				case 16:  { var distance_X=self.gunPosX-nextX; //Impetus
							var distance_Y=self.gunPosY-nextY;
							var bonusDmg=Math.sqrt(distance_X*distance_X+distance_Y*distance_Y)*self.infoEff.ID16[0]/100;
							self.lastDmg+=bonusDmg;
						  } break;
			    case 17: if (self.battleContainer.random() * 100 < self.infoEff.ID17[0]) { self.lastDmg = self.lastDmg * self.infoEff.ID17[1]; if (self.textShow) self.textShow(); } break; //Critical
				case 18: if (self.isSame) {self.lastDmg=self.lastDmg*Math.pow(self.infoEff.ID18[0],self.numFire);};break; //Multiplier
				case 19: self.lastDmg=self.lastDmg*self.infoEff.ID19[0]/100;break; //Split Shot
				case 21: self.lastDmg=self.lastDmg+(((self.target.hp-self.target.currentHP)/self.target.hp)*(self.infoEff.ID21[0]))>>0;break; //Inner Toxic
				case 24: self.lastDmg=self.lastDmg*Math.pow(self.infoEff.ID24[0]/100,self.chain);break; //Chain
				default: break;
			}	
		self.lastDmg = self.lastDmg * self.resitant[self.target.element];
		
		}
		//if (self.typeBullet==0) self.lastDmg=self.lastDmg/self.reloadTime*10000;
		if (self.infoEff.ID25) {
			var id=self.target.getCurrentCell();
			var AOE=self.infoEff.ID25[0]*TILE_SIZE;
			var queue=currentMap.distanceData[id].queue;
			for (j=0;j<queue.length;j++){			
				if (queue[j].distance<AOE){
					for(i=0;i<currentMap.distanceData[queue[j].ID].currentMonster.length;i++) {
						id_target = currentMap.distanceData[queue[j].ID].currentMonster[i];
						var monsterArray = self.battleContainer.monsterArray;
						if (monsterArray[id_target]){
							for (k=0;k<self.effect.length;k++)	{
								if (self.effect[k]<7) 
									monsterArray[id_target].takeEff(self.effect[k],eval('self.infoEff.ID'+self.effect[k]));
							}
							if (!self.typeBullet==0) monsterArray[id_target].takeDmg(self.lastDmg,self); 
							else monsterArray[id_target].takeDmg(self.lastDmg / (self.reloadTime) * frameTime, self);
							}
					}; //AOE
				} else break;
			}
		} else if (!self.typeBullet == 0) { self.target.takeDmg(self.lastDmg, self); } else { self.target.takeDmg(self.lastDmg / (self.reloadTime) * frameTime, self); }
			
		
			
	}
	extend(CAAT.Bullet, CAAT.Foundation.Actor);
})();
