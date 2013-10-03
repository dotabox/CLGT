(function () {
	
	CAAT.Animation = function(){
		CAAT.Animation.superclass.constructor.call(this);
		return(this);
	}
	CAAT.Animation.prototype = {
		initialize: function(battleContainer,animationIndex,positionX, positionY, callback){
			var self = this;
			this.battleContainer = battleContainer
			var director = battleContainer.director;
			this.director = director;
			this.startTime = battleContainer.sceneTime;
			this.lastTime = this.startTime;
			this.animationIndex = animationIndex;
			this.setBounds(positionX,positionY,CANVAS_WIDTH,CANVAS_HEIGHT);
			var cellX = (positionX/TILE_SIZE)>>0;
			var cellY = (positionY/TILE_SIZE)>>0;
			var currentMap = self.battleContainer.currentMap;
			this.cellId = cellX + currentMap.mapWidthCollision*cellY;
			var skillData = data.UserSkill[animationIndex];
			this.skillData = skillData;
			var skillRange = self.skillData.Range;
			self.sound = skillData.Sound;
			this.queue = this.findRange(currentMap.distanceData[self.cellId].queue,skillRange*TILE_SIZE,2);
			
			var skillAnimation = skillData.Animation;
			
			this.image = director.getImage(skillAnimation.File);
			var x = skillAnimation.x, y = skillAnimation.y;
			this.spriteImage = new CAAT.Foundation.SpriteImage().initialize(this.image,y,x);
			this.data = skillAnimation.Data;
			this.animationType = skillData.AnimationType;
			if(this.animationType == "AOE") this.frameIndex = 0;
			else {
				this.frameIndex = [];
				this.frameAnimationIndex = [];
				this.targetArray = [];
				this.updateTime = this.startTime;
				this.takeDmg = [];
				this.setBounds(20,0,currentMap.mapWidth*TILE_SIZE,currentMap.mapHeight*TILE_SIZE);
				if(animationIndex == 1){
					var skillSize = skillRange*TILE_SIZE;
					this.cloudActor = new CAAT.Actor2().setBounds(-20+positionX - skillSize,positionY -skillSize,skillSize*2,skillSize*2);//.setFillStyle("#CCC").setAlpha(0.5);
					var cloudImage = director.getImage("cloud");
					var cloudSize = 100;
					var locationXY = [
						[self.battleContainer.random()*skillSize/3,self.battleContainer.random()*skillSize/3],
						[50+self.battleContainer.random()*skillSize/3,skillSize/2+self.battleContainer.random()*skillSize/3],
						[140+self.battleContainer.random()*skillSize/3,skillSize/2+self.battleContainer.random()*skillSize/3],
						[50,6*skillSize/4-self.battleContainer.random()*skillSize/3],[200,6*skillSize/4]
						];
					for(var i=0;i<5;i++){
						
						var cloud = new CAAT.Actor2()
							.setBackgroundImage(cloudImage)
							.setScaleAnchored(cloudSize/cloudImage.width,cloudSize/cloudImage.height,0,0)
							.setBounds(0,0,100,100)
							.setRotation(5*Math.PI/6)
							.setAlpha(0.7)
							.setDiscardable(true);
							//cloud.setScene(self.battleContainer);
						cloud.setLocation(locationXY[i][0],locationXY[i][1]);
						
						var path =  new CAAT.PathUtil.LinearPath().
							setInitialPosition(cloud.x,cloud.y).
							setFinalPosition(skillSize*2,0);
						var pathBehavior= new CAAT.Behavior.PathBehavior().
							setPath( path ).
							setFrameTime(self.battleContainer.time,15000/GAME_SPEED);
						cloud.addBehavior(pathBehavior);	
						this.cloudActor.addChild(cloud);
					}
					this.addChild(this.cloudActor);
				}
			}
			
			this.callback = callback;
			return this;
		},
		paint: function(director,time){
			CAAT.Animation.superclass.paint.call(this, director, time);
			var ctx = director.ctx;
			var self = this;
			self.isTimePaused=self.battleContainer.isTimePaused;
			if(self.animationType== "AOE"){
				var frameIndex = self.frameIndex;
				if(frameIndex>self.data.length-1) return;
				var animationFrame = self.data[frameIndex].concat();
				self.emptyChildren();
				for(var i=0;i<animationFrame.length;i++){
					var scaleX = 1, scaleY = 1 , scaled = 0;
					if(animationFrame[i][6]==1){
						scaleY = -1;
						scaled = 1;
					}
					if(animationFrame[i][6]==2){
						scaleX = -1;
						scaled = 1;
					}
					var actor = new CAAT.Foundation.ActorContainer().
						setBackgroundImage(self.spriteImage,true).
						setScaleAnchored(scaleX*animationFrame[i][3]/self.spriteImage.singleWidth, scaleY*animationFrame[i][4]/self.spriteImage.singleHeight,scaled,scaled).
						setRotation(animationFrame[i][5]/180*Math.PI).
						setBounds(animationFrame[i][1] - animationFrame[i][3]*scaled/2,animationFrame[i][2]- animationFrame[i][4]*scaled/2,animationFrame[i][3],animationFrame[i][4]).
						setAnimationImageIndex([animationFrame[i][0]]).
						setAlpha(animationFrame[i][7]/100).
						enableEvents(false);
					self.addChild(actor);
				}
				
				
			}
			else{
				var frameIndex = self.frameIndex.concat();
				var frameAnimationIndex = self.frameAnimationIndex.concat();
				if(self.skillData.ID == 1){
					var numChild = self.getNumChildren();
					for(var i=1;i<numChild;i++) self.removeChildAt(1);
				}
				else self.emptyChildren();
				
				
				for(var index = 0;index < frameIndex.length; index++){
					if(frameIndex[index]>=self.data[frameAnimationIndex[index]].length) continue;
					var animationFrame = self.data[frameAnimationIndex[index]][frameIndex[index]].concat();
					var monster = self.battleContainer.monsterArray[self.targetArray[index]];
					for(var i=0;i<animationFrame.length;i++){
						var scaleX = 1, scaleY = 1 , scaled = 0;
						if(animationFrame[i][6]==1){
							scaleY = -1;
							scaled = 1;
						}
						if(animationFrame[i][6]==2){
							scaleX = -1;
							scaled = 1;
						}
						var actor = new CAAT.Foundation.ActorContainer().
							setBackgroundImage(self.spriteImage,true).
							setScaleAnchored(scaleX*animationFrame[i][3]/self.spriteImage.singleWidth, scaleY*animationFrame[i][4]/self.spriteImage.singleHeight,scaled,scaled).
							setRotation(animationFrame[i][5]/180*Math.PI).
							setBounds(animationFrame[i][1] + monster.x - animationFrame[i][3]*scaled/2,animationFrame[i][2] + monster.y - animationFrame[i][4]*scaled/2,animationFrame[i][3],animationFrame[i][4]).
							setAnimationImageIndex([animationFrame[i][0]]).
							setAlpha(animationFrame[i][7]/100).
							enableEvents(false);
						self.addChild(actor);
					}
					
					
				}
				
				
				
			}
			
		},
		update:function(director,time){
			var self = this;
			
			
			if(self.animationType== "AOE"){
				var frameIndex = self.frameIndex;

				var animationFrame = self.data[frameIndex];
				
				
				

				if(frameIndex == (2*self.data.length/3)>>0){
					if(!self.takeDmg){
						self.takeDmg = true;
						Sound.playSfx(self.sound);
						var currentMap = self.battleContainer.currentMap;
						var queue = self.queue;
						var arrayTarget = [];
						for (x = 0; x < queue.length; x++) {
							id = queue[x];
							for(var i=0;i<currentMap.distanceData[id].currentMonster.length;i++){
								arrayTarget.push(currentMap.distanceData[id].currentMonster[i]);
							}
						}
						var damage = self.skillData.Damage;
						for(var i=0;i<arrayTarget.length;i++){
							var monster = self.battleContainer.monsterArray[arrayTarget[i]];
							monster.takeDmg(damage);
							if(!monster.isDead){
								for(var j=0;j<self.skillData.EffectID.length;j++){
									if(self.battleContainer.random()<self.skillData.InfoEff[j][0]/100)monster.takeEff(self.skillData.EffectID[j],self.skillData.InfoEff[j]);
								}
							}
						}
					}
				}
				if(time-self.lastTime>15){
					self.lastTime = time;
					if(self.frameIndex>=self.data.length){
						self.callback(self);
					}
					else self.frameIndex++;
				}
			}
			else{
				var frameIndex = self.frameIndex.concat();
				var frameAnimationIndex = self.frameAnimationIndex.concat();
				for(var index = 0;index < frameIndex.length; index++){
					if(index<frameIndex.length-1) continue
					if(frameIndex[index]>=self.data[frameAnimationIndex[index]].length) continue;
					var animationFrame = self.data[frameAnimationIndex[index]][frameIndex[index]].concat();
					var monster = self.battleContainer.monsterArray[self.targetArray[index]];
					
					
					if(frameIndex[index] == (2*self.data.length/3)>>0){
						if(!self.takeDmg[index]){
							self.takeDmg[index] = true;
							var damage = self.skillData.Damage;
							monster.takeDmg(damage);
							if(!monster.isDead){
								for(var j=0;j<self.skillData.EffectID.length;j++){
									if(self.battleContainer.random()<self.skillData.InfoEff[j][0]/100)monster.takeEff(self.skillData.EffectID[j],self.skillData.InfoEff[j]);
								}
							}
						}
					}
				}
				if(!self.stopAttack)if(time - self.updateTime>300){
					self.updateTime = time;
					var currentMap = self.battleContainer.currentMap;
					var queue = self.queue;
					var foundedID = -1;
					var priorityArray1 = [];
					var priorityArray2 = [];
					for (x = 0; x < queue.length; x++) {
						id = queue[x];
						var founded = false;
						for(var i=0;i<currentMap.distanceData[id].currentMonster.length;i++){
							var targetId = currentMap.distanceData[id].currentMonster[i];
							var indexOfArray = self.targetArray.indexOf(targetId);
							var monster = self.battleContainer.monsterArray[targetId];
							if((indexOfArray!=-1)&&(self.takeDmg[indexOfArray])) priorityArray1.push(targetId);
							if(monster.immunity == 1) {
								priorityArray2.push(targetId);
								continue;
							}
							if(monster.isDead) break;
							if((indexOfArray==-1)){
								foundedID = targetId;
								founded = true;
								break;
							}
						}
						if(founded) break;
					}
					if(foundedID == -1){
						var length1 = priorityArray1.length;
						var length2 = priorityArray2.length;
						if(length1>0){
							var randomNumber1 = (self.battleContainer.random()*length1)>>0;
							if (randomNumber1==length1) randomNumber1 = 0;
							foundedID = priorityArray1[randomNumber1];
						}
						else if(length2>0){
							var randomNumber2 = (self.battleContainer.random()*length2)>>0;
							if (randomNumber2==length2) randomNumber2 = 0;
							foundedID = priorityArray2[randomNumber2];
						}
					}
					if(foundedID != -1){
						var randomNumber = ((self.data.length)*self.battleContainer.random())<<0;
						if(randomNumber == self.data.length) randomNumber = 0;
						self.frameAnimationIndex.push(randomNumber);
						self.frameIndex.push(0);
						self.targetArray.push(foundedID);
						Sound.playSfx(self.sound[self.battleContainer.randomNumber(self.sound.length)]);
					}
				}
				if(self.frameIndex.length>self.skillData.TargetNumber) {
					self.stopAttack = true;
					var number = self.skillData.TargetNumber;
					if(self.frameIndex[number-1]>=self.data[frameAnimationIndex[number-1]].length) {
						self.callback(self);
					}
				} 
				if(time-self.startTime>self.skillData.Duration){
				
					self.callback(self);
				}
				if(time-self.lastTime>15){
					self.lastTime = time;
					for(var i=0;i<self.frameIndex.length;i++)self.frameIndex[i]++;
				}
			}
			
			
		},
		findRange : function (queue,range,id){
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
	}
	extend(CAAT.Animation, CAAT.Actor2);
})();	