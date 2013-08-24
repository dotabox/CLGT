(function () {
    CAAT.DEBUG_BATTLE_SCENE = false;
    CAAT.BattleContainer = function () {
        CAAT.BattleContainer.superclass.constructor.call(this);
        return this;
    }
    CAAT.BattleContainer.prototype = {
		endBattle: 0, // 0 là chưa dừng, 1 là thắng, -1 là thua
        initialize: function (director,mapIndex, skillArray, unlockTower, level, sceneSkillContainer, nextScene, prevScene) { //Level hiện tại, quái của level đó, số wave, số mạng, tiền ban đầu
			CAAT.BattleContainer.superclass.initialize.call(this, director, nextScene, prevScene);
			var self = this;
			this.isTimePaused=false; // khoi tao bien pause
            //this.randomIndex = loadObj.randomIndex;
			//this.randomArray = loadObj.randomArray;
            //this.replayData = loadObj;
            this.sceneSkillContainer = sceneSkillContainer;
            this.endBattle = 0;
			this.randomArray = [];
            var i = 5000;
			this.randomIndex = (Math.random()*(i-1))<<0;
			console.log(this.randomIndex);
			this.currentRandomIndex = this.randomIndex;
            while (i--) {
                self.randomArray.push(Math.random());
            }
			this.replayData = {
			    randomIndex: this.randomIndex,
			    randomArray:self.randomArray,
				actionData: [],
			};
            
            this.currentRandomIndex = this.randomIndex;
			this.setBounds(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
			//this.director = director;
			this.sceneTime = 0;
			//this.scene_time=this.parent.time;
			this.currentLevel = mapIndex;
			
			this.updateArray=[];
			this.towerArray = [];
			this.unlockTower = unlockTower.concat();
			this.level = level;
			this.monsterArray = [];
			this.addedMonster = 0;
			this.addedMonsterInWave = 0;
			this.deadMonster = 0;
			this.miniMapSize = CANVAS_HEIGHT/4;
			var miniMapSize = this.miniMapSize;
			var currentLevel = mapIndex;
			this.mapData = data.Map[currentLevel];
			if(mapIndex!=0) new CAAT.SyncWave().init(director, this, mapIndex, level, 1, [4, 4, 4, 4, 4, 4, 4, 4]).create();
			var mapData = this.mapData;
			this.life = mapData.Life;
			this.currentLife = this.life;
			this.startingGold = mapData.Gold;
			this.currentGold = this.startingGold;
			
			this.waveNumber = mapData.Wave.length;
			this.currentMap = new CAAT.TileMap()
				.create("map 1", director.getImage(data.Map[currentLevel].Tile), data.Map[currentLevel].Data, data.Map[currentLevel].Cdata,self, false);
			this.currentMap
				.setBounds(0, 0, this.currentMap.mapWidth*TILE_SIZE, this.currentMap.mapHeight*TILE_SIZE)
				//.setScaleAnchored(TILE_SIZE / TILE_SIZE_FOR_DRAWING, TILE_SIZE / TILE_SIZE_FOR_DRAWING, 0, 0)
				.enableEvents(false);
			
			
			
			this.mapPanel = new CAAT.Foundation.ActorContainer()
				.enableEvents(false)
				.setBounds(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
			
			this.mapBound = new CAAT.Foundation.ActorContainer()
				.setBounds(0, 0, this.currentMap.width, this.currentMap.height)
				.enableEvents(false);
			this.mapBound.addChild(this.currentMap);
			this.mapPanel.addChild(this.mapBound);
			this.addChild(this.mapPanel);
			
			this.minimapPanel = new CAAT.Foundation.ActorContainer()
				.setBounds(0, CANVAS_HEIGHT - miniMapSize, miniMapSize, miniMapSize)
				.setFillStyle("#FFF")
				.enableEvents(false);
			this.miniMap = new CAAT.MiniMap()
				.create("map 1", director.getImage(data.Map[currentLevel].Tile), data.Map[currentLevel].Data, self, true);
			this.miniMap
				.setBounds(0, 0, this.currentMap.mapWidth*TILE_SIZE, this.currentMap.mapHeight*TILE_SIZE)
				.enableEvents(false);
			this.miniMap.setScaleAnchored(TILE_SIZE / TILE_SIZE_FOR_DRAWING*this.minimapPanel.width / this.miniMap.width, TILE_SIZE / TILE_SIZE_FOR_DRAWING*this.minimapPanel.height / this.miniMap.height, 0, 0);

			this.minimapPanel.addChild(this.miniMap);
			this.addChild(this.minimapPanel);
			
			this.showMiniMap = 1; // 0 = không hiện gì,1 = hiện miniMap
			
			
			var buttonSize = 50;
			this.buttonSize = buttonSize;
			var menuWidth = 80;
			var menuHeight = 50;
			this.menuWidth = menuWidth;
			this.menuHeight = menuHeight;
			
			var startImage = new CAAT.Foundation.SpriteImage().initialize(director.getImage('startButton'), 1, 1 );
			this.startButton = new CAAT.Button().initialize(this.director,startImage,0,0,0,0,
			function(){
				self.removeChild(self.startButton);
				self.countDownTime = self.sceneTime;
			})
				.setLocation((CANVAS_WIDTH-menuWidth-buttonSize*2-60),-10)
				.setScaleAnchored(3/2*buttonSize/startImage.width,3/2*buttonSize/startImage.height,0,0);
			this.addChild(this.startButton);	
			
			var startImage = new CAAT.Foundation.SpriteImage().initialize(director.getImage('startButton'), 1, 1 );
			this.nextWaveButton = new CAAT.Button().initialize(this.director,startImage,0,0,0,0,
			function(){
				this.setVisible(false);
				self.clickNextWave = true;
				var pastTime = self.timePerWave - self.startAddMonsterWaveTime;
				self.timeDrop += pastTime;
				var gold = Math.ceil(pastTime/100);
				self.currentGold+= gold;
				var showText = new CAAT.DamageShow().initialize("+"+gold,this.x,this.y+self.buttonSize/2,"#FF0",self,30);
				self.addChild(showText);
				showText.active(self.time);
			})
				.setLocation((CANVAS_WIDTH-menuWidth-buttonSize*2-60),-10)
				.setScaleAnchored(3/2*buttonSize/startImage.width,3/2*buttonSize/startImage.height,0,0);
			this.addChild(this.nextWaveButton);	
			
			
			var menuImage = new CAAT.Foundation.SpriteImage().initialize(director.getImage('menuBattleButton'), 1, 2 );
			this.menuFunction = function(){
				self.cacheAsBitmap(self.time,CAAT.Foundation.Actor.CACHE_DEEP);
				pausedFunction(director,self,director.getScene(2));
				
			}
			this.menuButton = new CAAT.Button().initialize(this.director,menuImage,0,1,1,0,this.menuFunction)
				.setLocation((CANVAS_WIDTH-menuWidth-20),0)
				.setScaleAnchored(menuWidth/menuImage.singleWidth,menuHeight/menuImage.singleHeight,0,0);
			this.addChild(this.menuButton);
			var pauseImage = new CAAT.Foundation.SpriteImage().initialize(director.getImage('pauseButton'), 1, 1 );

			var pausefunc= function(){
				_this =self;
				if (_this.isTimePaused&&_this.isStart) 
				{_this.isStart();} 
				
				_this.isTimePaused=!_this.isTimePaused;
				
			}
			this.pauseButton = new CAAT.Button().initialize(this.director,pauseImage,0,0,0,0,pausefunc)

				.setLocation((CANVAS_WIDTH-menuWidth-buttonSize-30),0)
				.setScaleAnchored(buttonSize/pauseImage.singleWidth,buttonSize/pauseImage.singleHeight,0,0);
			this.addChild(this.pauseButton);
			
			
			var cancelImage = new CAAT.Foundation.SpriteImage().initialize(director.getImage('cancel'), 1, 4 );
			self.minimapButton = new CAAT.Button().initialize(this.director,cancelImage,0,1,2,3,
			function(){
				if(self.showMiniMap == 0){
					var cancelImage = new CAAT.Foundation.SpriteImage().initialize(this.director.getImage('cancel'), 1, 4 )
					this.setBackgroundImage(cancelImage);
					var path= new CAAT.PathUtil.LinearPath().
					setInitialPosition(self.minimapButton.x,self.minimapButton.y).
					setFinalPosition(self.miniMapSize,CANVAS_HEIGHT-self.buttonSize);
					var pathBehavior= new CAAT.PathBehavior().
					setPath( path ).
					setFrameTime(self.time,300).addListener({
						behaviorExpired: function(director,time){
							self.showMiniMap = 1;
							if(!self.minimapPanel.parent)self.addChild(self.minimapPanel);
							self.minimapButton.emptyBehaviorList();
						}
					});
					self.minimapButton.addBehavior(pathBehavior);
				}
				else{
					var settingImage = new CAAT.Foundation.SpriteImage().initialize(director.getImage('setting'), 1, 4 );
					this.setBackgroundImage(settingImage);
					self.showMiniMap = 0;
					self.removeChild(self.minimapPanel);
					
					var path= new CAAT.PathUtil.LinearPath().
					setInitialPosition(self.minimapButton.x,self.minimapButton.y).
					setFinalPosition(0,CANVAS_HEIGHT-self.buttonSize);
					
					var pathBehavior= new CAAT.PathBehavior().
					setPath( path ).
					setFrameTime(self.time,300);
					self.minimapButton.addBehavior(pathBehavior);
				}
			})
				.setScaleAnchored(buttonSize/cancelImage.singleWidth,buttonSize/cancelImage.singleHeight,0,0)
				.setLocation(miniMapSize,CANVAS_HEIGHT-buttonSize);
			self.addChild(self.minimapButton);
			
			var battleStatus = new CAAT.Foundation.ActorContainer().setBounds(0,0,this.width,this.height).enableEvents(false);
			battleStatus.radius = 127.5;
			battleStatus.lineWidth = 35;
			battleStatus.paint = function(director,time){
				var ctx = director.ctx;
				var percent = self.currentLife/self.life;
				if(percent>1) percent = 1;
				ctx.lineWidth = this.lineWidth;
				ctx.beginPath();
				ctx.strokeStyle = "#F00";
				ctx.arc(this.width,this.height,this.radius,-Math.PI,-Math.PI+percent*Math.PI/2);
				ctx.stroke();
				ctx.closePath();
			
				ctx.strokeStyle = "#000";
				ctx.lineWidth = 2;
				ctx.beginPath();
				ctx.fillStyle = "#00F";
				ctx.arc(this.width,this.height,this.radius-this.lineWidth/2,0,Math.PI*2);
				ctx.fill();
				ctx.stroke();
				ctx.closePath();
				
				ctx.beginPath();
				ctx.arc(this.width,this.height,this.radius+this.lineWidth/2,0,Math.PI*2);
				ctx.stroke();
				ctx.closePath();
				
				ctx.font = "30px Times New Roman";
				ctx.fillStyle = "#FF0";
				ctx.drawImage(self.director.getImage('gold'),CANVAS_WIDTH-90,CANVAS_HEIGHT-75,30,30);
				ctx.fillText(self.currentGold<<0,CANVAS_WIDTH-60,CANVAS_HEIGHT-50);
			}
			this.battleStatus = battleStatus;
			this.addChild(battleStatus);
			var buildImage = new CAAT.Foundation.SpriteImage().initialize(this.director.getImage('setting'), 1, 4 );
			self.showBuildButton = false;
			self.buildButtonClickable = true;
			
			self.buildFunction = function(){
				if(self.buildButtonClickable){
					self.buildButtonClickable = false;
					if(self.showBuildButton){
						self.showBuildButton = false;
						self.buildCircle.setVisible(false);
						for(var i=0;i<self.buildButtonArray.length;i++)self.buildButtonArray[i].emptyBehaviorList();
						var settingImage = new CAAT.Foundation.SpriteImage().initialize(director.getImage('setting'), 1, 4 );
						self.buildButton.setBackgroundImage(settingImage);
						for(var i=0;i<self.buildButtonArray.length;i++){
							
							var path= new CAAT.PathUtil.LinearPath().
							setInitialPosition(self.buildButtonArray[i].x,self.buildButtonArray[i].y).
							setFinalPosition(self.buildButton.x,self.buildButton.y);
							
							var pathBehavior= new CAAT.PathBehavior().
							setPath( path ).
							setFrameTime(self.time,300).addListener({
								behaviorExpired: function(director,time){
									self.buildButtonClickable = true;
									for(var i=0;i<self.buildButtonArray.length;i++){
										self.buildButtonArray[i].setVisible(false);
									}
								}
							});
							self.buildButtonArray[i].addBehavior(pathBehavior);
							
						}
					}
					else{
						self.showBuildButton = true;
						for(var i=0;i<self.buildButtonArray.length;i++)self.buildButtonArray[i].emptyBehaviorList();
						var cancelImage = new CAAT.Foundation.SpriteImage().initialize(director.getImage('cancel'), 1, 4 );
						self.buildButton.setBackgroundImage(cancelImage);
						for(var i=0;i<self.buildButtonArray.length;i++){
							self.buildButtonArray[i].setVisible(true);
							var path= new CAAT.PathUtil.LinearPath().
							setInitialPosition(self.buildButton.x,self.buildButton.y).
							setFinalPosition(self.buildButtonXYArray[i][0],self.buildButtonXYArray[i][1]);
							
							var pathBehavior= new CAAT.PathBehavior().
							setPath( path ).
							setFrameTime(self.time,300).addListener({	
								behaviorExpired: function(director,time){
									self.buildButtonClickable = true;
									self.buildCircle.setVisible(true);
								}
							});
							
							self.buildButtonArray[i].addBehavior(pathBehavior);
						}
					}
				}
			}
			self.buildButton = new CAAT.Button().initialize(this.director,buildImage,0,1,2,3,self.buildFunction)
				.setLocation(CANVAS_WIDTH-buttonSize,CANVAS_HEIGHT-buttonSize)
				.setScaleAnchored(buttonSize/buildImage.singleWidth,buttonSize/buildImage.singleHeight,0,0);
			self.addChild(self.buildButton);
			
			var buildCircle = new CAAT.Foundation.ActorContainer().setBounds(0,0,this.width,this.height).enableEvents(false).setVisible(false);
			buildCircle.radius = 175;
			buildCircle.paint = function(director,time){
				var ctx = director.ctx;
				ctx.lineWidth = 2;
				ctx.beginPath();
				ctx.arc(this.width,this.height,this.radius,0,Math.PI*2);
				ctx.stroke();
				ctx.closePath();
			}
			this.buildCircle = buildCircle;
			this.addChild(buildCircle);
			var buildTowerSize = 32;
			self.buildTowerSize = buildTowerSize;
			self.buildButtonArray = [];
			self.setBuildButton = [];
			self.buildButtonXYArray = [];
			for(var i=0;i<5;i++){
				var towerElementImage = new CAAT.Foundation.SpriteImage().initialize(self.director.getImage("towerElementIcon"+i), 1, 4 );
				var towerImage = new CAAT.Foundation.SpriteImage().initialize(self.director.getImage("towerSprite1"), 1, 4 );
				self.setBuildButton[i] = new CAAT.Button().initialize(self.director,towerImage,0,1,2,3);
				self.buildButtonArray[i] = new CAAT.Button().initialize(self.director,towerElementImage,0,1,2,3,
				function(button) {	//down
					if(self.sellTowerMouse) self.sellTowerFunction();
					if (!self.isSetBuild) {
						self.isDrag = true;
						self.isSetBuild = true;
						var index = self.buildButtonArray.indexOf(button);
						self.showSetBuildIcon(self.setBuildButton[index], button.AABB.x, button.AABB.y, index);
					  
					}
					else {
						self.unShowSetBuildIcon();
					}
				},
				function(button,ex,ey){	//drag
				
					var x = ex;
					var y = ey;
					_mtMove(self, x, y);
				},
				function(button,ex,ey){	//up
					var x = ex ;
					var y = ey;
					_btUp(self, x, y);
				},
				function(){
					var index = self.buildButtonArray.indexOf(this);
					self.tooltip.reset(1,index);
				})
				.setScaleAnchored(self.buildTowerSize/towerElementImage.singleWidth,self.buildTowerSize/towerElementImage.singleHeight,0,0)
				.setVisible(false);
				var x,y,size = self.buildTowerSize*2;
				switch(i){
					case 0: x = -2.5*size; y = -0.1*size ;break;
					case 1: x = -2.2*size; y = -0.95*size ;break;
					case 2: x = -1.7*size; y = -1.7*size ;break;
					case 3: x = -0.95*size; y = -2.2*size ;break;
					case 4: x = -0.1*size; y = -2.5*size ;break;
				}
				self.buildButtonXYArray.push([CANVAS_WIDTH-self.buildTowerSize+x,CANVAS_HEIGHT-self.buildTowerSize+y]);
				self.addCircle(self.buildButtonArray[i]);
				self.addChild(self.buildButtonArray[i]);
			}
			
			var sellTowerImage = new CAAT.Foundation.SpriteImage().initialize(self.director.getImage('sellTower'), 1, 4 );
			self.sellTowerMouse = false;
			self.sellTowerFunction = function(button,ex,ey){
				if(self.isSetBuild) {
					self.unShowSetBuildIcon();
					return;
				}
				self.sellTowerMouse = (self.sellTowerMouse)?false:true;
				if(self.sellTowerIcon){
					self.sellTowerIcon.setVisible(self.sellTowerMouse);
					self.sellTowerIcon.setLocation(ex-15,ey-15);
				}
			};
			self.sellTowerButton = new CAAT.Button().initialize(this.director,sellTowerImage,0,1,2,3,self.sellTowerFunction)
				.setLocation(CANVAS_WIDTH/3,CANVAS_HEIGHT-buttonSize)
				.setScaleAnchored(3/4*buttonSize/sellTowerImage.singleWidth,3/4*buttonSize/sellTowerImage.singleHeight,0,0);
			self.addCircle(self.sellTowerButton);
			
			self.addChild(self.sellTowerButton);
			
			
			var upgradeButtonSize = 30;
			self.sellTowerPercent = 70;
			self.upgradeButtonSize = upgradeButtonSize;
			self.upgradeButton = [];
			for(var i=0;i<6;i++){
				if(i==5)var upgradeImage = new CAAT.Foundation.SpriteImage().initialize(self.director.getImage('sellTower'), 1, 4 );
				else var upgradeImage = new CAAT.Foundation.SpriteImage().initialize(self.director.getImage('towerElementIcon'+(i)), 1, 4 );
				self.upgradeButton[i] = new CAAT.Button().initialize(self.director,upgradeImage,0,1,2,3,
				function(button){
				},
				function(button){
				},
				function(button,ex,ey) {
					// upgrade trụ
					if(button.AABB.contains(ex,ey)){
						var index = self.upgradeButton.indexOf(this);
						var tower = self.towerArray[self.selectingIndex];
						if(index != 5){
							if (self.currentGold<tower.price) return;
							tower.upgrade(index);
							self.currentGold -= tower.price;
							self.replayInformation("upgradeTower",[tower.id,index]);
						}
						else{
							self.sellTower(tower.id);
						}
						self.hideUpgrade(true);
					}
				},
				function(){
					if(this.index) {
						self.tooltip.setPosition(0);
						self.tooltip.reset(1,this.index);
					}
				})
				.setScaleAnchored(self.upgradeButtonSize/upgradeImage.singleWidth,self.upgradeButtonSize/upgradeImage.singleHeight,0,0)
				var x,y,size = 40;
				switch(i){
					case 0: x = 0; y = size ;break;
					case 1: x = 1*size/5; y = size*2 ;break;
					case 2: x = size; y = size*2.8 ;break;
					case 3: x = 9*size/5; y = size*2 ;break;
					case 4: x = 10*size/5; y = size ;break;
					case 5: x = size; y = size/2 ;break;
				}
				self.upgradeButton[i].setLocation(x,y);
				self.upgradeButton[i].setVisible(false);
				if(i!=5){
					var showPrice = new CAAT.Foundation.ActorContainer().setBounds(20,120,20,20);
					showPrice.text = "";
					showPrice.paint = function(director,time){
						var ctx = director.ctx;
						ctx.fillStyle = "#FF0";
						ctx.font = "35px Times New Roman";
						var text = this.text;
						ctx.fillText(text,0,0);
					}
					self.upgradeButton[i].addChild(showPrice);
				}
				self.addChild(self.upgradeButton[i]);
			}
			
			var skillButtonSize = 64;
			self.selectingSkill = -1; // -1 = ko select
			self.skillButtonSize = skillButtonSize;
			self.userSkill = skillArray;
			self.skillButtonArray = [];
			self.cdActor = [];
			self.skillPanel = new CAAT.Foundation.ActorContainer()
				.setBounds(CANVAS_WIDTH/3+2*buttonSize,CANVAS_HEIGHT-skillButtonSize, skillButtonSize*self.userSkill.length,skillButtonSize)
				.setFillStyle("#CCC");
			self.addChild(self.skillPanel);
			for(var i=0;i<self.userSkill.length;i++){
				var skillData = data.UserSkill[self.userSkill[i]];
				var skillImage = new CAAT.Foundation.SpriteImage().initialize(self.director.getImage(skillData.Icon), 1, 1 );

				self.cdActor[i] = new CAAT.CooldownActor()
					.initialize(i*skillButtonSize, 0, skillButtonSize, skillButtonSize, skillData.CoolDown);
				self.skillPanel.addChild(self.cdActor[i]);
				self.updateArray.push(self.cdActor[i]);
				self.skillButtonArray[i] = new CAAT.Button().initialize(self.director,skillImage,0,0,0,0,
				function(button,ex,ey){		// down
					var index = self.skillButtonArray.indexOf(this);
					var skillIndex = self.userSkill[index];
					if(self.cdActor[index].isCooldown) return;
					self.selectingSkill = skillIndex;
					self.addChild(self.showSkillRange);
					self.showSkillRange.setLocation(ex,ey);
					if(self.isSetBuild) self.unShowSetBuildIcon();
				},
				function(button,ex,ey){		//drag 	
					if(self.selectingSkill!=-1){
						self.showSkillRange.setLocation(ex,ey);
					}
				},
				function(button,ex,ey){		//up
					self.removeChild(self.showSkillRange);
					self.useSkill(ex,ey);
				},
				function(){ //enter
					var index = self.skillButtonArray.indexOf(this);
					self.tooltip.reset(2,self.userSkill[index]);
				})
				.setScene(self)
				.setScaleAnchored(skillButtonSize/skillImage.singleWidth,skillButtonSize/skillImage.singleHeight,0,0)
				.setLocation(i*skillButtonSize, 0);
			self.skillPanel.addChildAt(self.skillButtonArray[i], 0);
				
			}
			self.showSkillRange = new CAAT.Foundation.ActorContainer().setBounds(0,0,100,100).enableEvents(false);
			self.rotateAngle = 0;
			self.showSkillRange.paint = function(director,time){
				var ctx = director.ctx;
				var skillCircle = director.getImage("skillCircle");
				var range = data.UserSkill[self.selectingSkill].Range*TILE_SIZE*2;
				range = 4*range/5;
				ctx.save();
				ctx.rotate(self.rotateAngle++*Math.PI/90);
				ctx.translate(-range/2,-range/2);
				ctx.drawImage(skillCircle,0,0,range,range);
				ctx.restore();
			}
			
			//Tao table chứa XP của creep theo loại
			var tableXP=function(type){ 
				var XPGained=data.XP[type].Gained;
				var XPRequired=data.XP[type].Required;
				var XPPerSecond= data.XP[type].XPTime;
				var table={Gained:[],Required:[],XPTime:XPPerSecond};
				table.Gained=[5];//Level 0
				table.Required=[0];//Level 0				
				table.Gained.push(XPGained.Table);//Level 1
				table.Required.push(XPRequired.Table);//Level 1
				var level=0;
				for (level=2;level<=10;level++){//từ level 1 đến level 10
					var XP=table.Gained[table.Gained.length-1]*XPGained.PreviousValue+level*XPGained.Level+XPGained.Constant;
					table.Gained.push(XP);
					var EXP=table.Required[table.Required.length-1]*XPRequired.PreviousValue+level*XPRequired.Level+XPRequired.Constant;
					table.Required.push(EXP);					
				}
				return table;
			}
			this.tableXP=tableXP(0);
			//*/
			this.cancelInformationBar = new CAAT.Button().initialize(this.director,cancelImage,0,1,2,3,
			function(){
				if(self.selectingIndex!=-1){
					if(self.selectingType == 0) self.towerArray[self.selectingIndex].selected = false;
					else self.monsterArray[self.selectingIndex].selected = false;
					self.selectingIndex = -1;
					self.cancelInformationBar.setVisible(false);
				}
			})
				.setLocation(0,80)
				.setVisible(false)
				.setScaleAnchored(buttonSize/cancelImage.singleWidth,buttonSize/cancelImage.singleHeight,0,0);
			this.addChild(this.cancelInformationBar);
			
			this.selectingType = 0; //0: select Trụ, 1: select quái
			this.selectingIndex = -1;
			this.changeSelectMonster = false;
			this.infomationBar = new CAAT.Foundation.ActorContainer().setBounds(0, 0, 50, 150).enableEvents(false);
			this.infomationBar.circleArg = [40,40,32,15];
			this.infomationBar.rect1Arg = [60,0,0,30];
			this.infomationBar.rect2Arg = [60,30,0,70];
			this.infomationBar.mousePosition = 0;
			this.infomationBar.paint = function(director,time){
				if(self.selectingIndex!=-1){
					if(!self.cancelInformationBar.visible) self.cancelInformationBar.setVisible(true);
					var ctx = director.ctx;
					//this.alpha = 0.7;
					ctx.font = "22px Times New Roman";
					var rect1Arg = this.rect1Arg;
					var rect2Arg = this.rect2Arg;
					if(self.selectingType==0){
						
						var tower = self.towerArray[self.selectingIndex];
						var img;
						var text1 = tower.name[LANGUAGE];
						if(LANGUAGE==0) text1 = "Trụ "+ text1;
						else text1 += " Tower";
						
						var measure1 = ctx.measureText(text1).width;
						if(tower.element.length==1){
							img = self.director.getImage("elementIcon"+tower.element);
							measure1+= img.width;
						}
						ctx.drawImage(self.director.getImage("credits_bg"),
							0,30,170,30,
							rect1Arg[0],rect1Arg[1],30+measure1,rect1Arg[3]);
						ctx.drawImage(self.director.getImage("credits_bg"),
							30,80,170,70,
							rect2Arg[0],rect2Arg[1],30+measure1,rect2Arg[3]);
						this.rect1Arg[2] = 30+measure1;
						this.rect2Arg[2] = 30+measure1;
						ctx.drawImage(tower.image,
							15,15,48,48);
						var circleArg = this.circleArg;
						var percent = tower.percentLevel;
						ctx.save();
						ctx.beginPath();
						ctx.strokeStyle = "#FF0";
						ctx.lineWidth = circleArg[3];
						ctx.arc(circleArg[0],circleArg[1],circleArg[2],-Math.PI/2,-Math.PI/2+percent*Math.PI*2);
						ctx.stroke();
						ctx.closePath();
						ctx.restore();
						ctx.lineWidth = 2;
						ctx.strokeStyle = "#000";
						ctx.beginPath();
						ctx.arc(circleArg[0],circleArg[1],circleArg[2]-circleArg[3]/2,0,Math.PI*2);
						ctx.stroke();
						ctx.closePath();
						ctx.beginPath();
						ctx.arc(circleArg[0],circleArg[1],circleArg[2]+circleArg[3]/2,0,Math.PI*2);
						ctx.stroke();
						ctx.closePath();
						
						var dmg = tower.damage;
						var bonusDmg = tower.bonusDmg;
						
						var text2 = ["Được ghép từ ","Combine of "][LANGUAGE];
						if(tower.element.length>1){
							if(!LANGUAGE) text2+= "Trụ ";
							for(var i=0;i<tower.element.length;i++){
								switch(tower.element[i]){
									case 0: text2+= ["Kim","Steel"][LANGUAGE]; break;
									case 1: text2+= ["Mộc","Nature"][LANGUAGE]; break;
									case 2: text2+= ["Thổ","Earth"][LANGUAGE]; break;
									case 3: text2+= ["Thủy","Water"][LANGUAGE]; break;
									case 4: text2+= ["Hỏa","Fire"][LANGUAGE]; break;
								}
								if(i!=tower.element.length-1) text2+= [" và "," and "][LANGUAGE];
							}
							if(LANGUAGE) text2+= " Tower";
						}
						text3 = ["Sát thương: ","Damage: "][LANGUAGE];
						text3+=(bonusDmg+dmg[0]>>0)+"-"+(bonusDmg+dmg[1]>>0);
						text4 = ["Tầm bắn: ","Range: "][LANGUAGE];
						text4+= tower.range;
						text5 = ["Tốc độ bắn: ","Attack Speed: "][LANGUAGE];
						var attackSpeed = (100000/(tower.reloadTime/tower.bonusSpeed))>>0;
						text5+= attackSpeed/100;
						text5+= [" phát/giây"," hit/second"][LANGUAGE];
						text6 = ["Số mạng: ","Kill: "][LANGUAGE]+tower.numKills;
						text7 = ["Trạng thái: ","Status: "][LANGUAGE];
						if(tower.disabled) text7+= ["Bị vô hiệu", "Disabled"][LANGUAGE];
						else text7 += ["Bình thường","Normal"][LANGUAGE];
						
						if(self.tooltip.positionIndex==1){
							switch(this.mousePosition){
								case 0:
									var text = ["Kinh nghiệm: ","EXP: "][LANGUAGE];
									text+= (tower.currentLevelExp||0)+"\n";
									text+= ["Còn thiếu: ","Next level: "][LANGUAGE];
									text+= (tower.nextLevelExp - tower.currentLevelExp)||self.tableXP.Required[1];
									self.tooltip.reset(0,text);
									break;
								case 1:
									self.tooltip.reset(0,text1+"\n"+((tower.element.length>1)?text2+"\n":"")+text6+"\n"+tower.description[LANGUAGE]);
									break;
								case 2:
									self.tooltip.reset(0,text3 +"\n"+ text4+"\n"+text5);
									break
							}
						}
						ctx.fillStyle = "#FDA";
						ctx.font = "22px Times New Roman";
						ctx.fillText(text1, 80, 20);
						ctx.font = "18px Times New Roman";
						ctx.drawImage(self.director.getImage("levelIcon"),80,40,30,18);
						ctx.fillText(tower.level, 115, 55);
						ctx.drawImage(self.director.getImage("damageIcon"),80,65,25,25);
						ctx.fillText((bonusDmg+dmg[0]>>0)+"-"+(bonusDmg+dmg[1]>>0),110,80);
						
						if(img){
							ctx.drawImage(img,55+measure1,0);
						}
					}
					if(self.selectingType==1){
						var monster = self.monsterArray[self.selectingIndex];
						var img = self.director.getImage("elementIcon"+monster.element);
						var text1 = monster.name[LANGUAGE]+" ";
						var measure1 = ctx.measureText(text1).width + img.width;
						var percent = monster.currentHP/monster.hp;
						
						ctx.drawImage(self.director.getImage("credits_bg"),
							0,30,170,30,
							rect1Arg[0],rect1Arg[1],img.width+measure1,rect1Arg[3]);
						ctx.drawImage(self.director.getImage("credits_bg"),
							30,80,170,70,
							rect2Arg[0],rect2Arg[1],img.width+measure1,rect2Arg[3]);
						this.rect1Arg[2] = img.width+measure1;
						this.rect2Arg[2] = img.width+measure1;
						var circleArg = this.circleArg;
						if(self.changeSelectMonster){
							self.changeSelectMonster = false;
							var showMonster = new CAAT.Monster().initialize(self, monster.type, monster.level,0,0)
							showMonster.stopMove = true;
							showMonster.removeChildAt(0);
							showMonster.setLocation(circleArg[3]-5,circleArg[3]-showMonster.height/3).setScaleAnchored(1,1,0,0);
							this.removeChildAt(0);
							this.addChild(showMonster);
						}
						ctx.save();
						ctx.beginPath();
						if(percent>2/3)	ctx.strokeStyle = "#0F0";				
						else if(percent>1/3) ctx.strokeStyle = "#FF0";
						else ctx.strokeStyle = "#F00";
						ctx.lineWidth = circleArg[3];
						ctx.arc(circleArg[0],circleArg[1],circleArg[2],-Math.PI/2-percent*Math.PI*2,-Math.PI/2);
						ctx.stroke();
						ctx.closePath();
						ctx.restore();
						ctx.lineWidth = 2;
						ctx.strokeStyle = "#000";
						ctx.beginPath();
						ctx.arc(circleArg[0],circleArg[1],circleArg[2]-circleArg[3]/2,0,Math.PI*2);
						ctx.stroke();
						ctx.closePath();
						ctx.beginPath();
						ctx.arc(circleArg[0],circleArg[1],circleArg[2]+circleArg[3]/2,0,Math.PI*2);
						ctx.stroke();
						ctx.closePath();
						
						
						text4 = ["Kỹ năng: ","Skill: "][LANGUAGE];
						text4+= monster.skillName[LANGUAGE];
						text5 = ["Giáp: ","Armor: "][LANGUAGE]
						text5 += Math.round(10*monster.armor)/10;
						(monster.armor>=0)? text6 = ["Giảm ","Reduce "][LANGUAGE]: text6 = ["Tăng ","Increase "][LANGUAGE];
						text6 += ((Math.abs(monster.reduceDamage)*100)<<0) + "% ";
						text6 += ["sát thương nhận vào.","damage taken"][LANGUAGE];
						text7 = "Status: ";
						if(LANGUAGE==0) text7 = "Trạng thái: ";
						var index = 0;
						if(monster.immunity==1){
							text7+= monster.skillName[LANGUAGE];
							index++;
						}
						
						for(key in monster.effect){
							if(monster.effect[key]!= 0){
								if(index!=0) text7+= ", ";
								index++;
								var text = [];
								switch (key) {
									case "0": text = ["Chậm","Slow"]; break;
									case "1": text = ["Bỏng","Burn"];break;
									case "2": text = ["Độc","Poison"];break;
									case "3": text = ["Trói","Bind"];break;
									case "4": text = ["Mù","Blind"];break;
									case "5": text = ["Khợp","Bite"];break;
									case "6": text = ["Băng giá","Ice"];break;
									case "8": text = ["Chống đẩy","Push"];break;
									case "11": text = ["Ẩm ướt","Water"];break;
									case "12": text = ["Dầu","Oil"];break;
									case "13": text = ["Bùn độc","Mire"];break;
								}
								text7+= text[LANGUAGE];
							}
						}
						if(index==0) text7+= ["Không","None"][LANGUAGE];
						if(self.tooltip.positionIndex==1){
							switch(this.mousePosition){
								case 0:
									self.tooltip.reset(0,"HP: "+Math.ceil(monster.currentHP)+"/"+monster.hp+"\n" + text7);
									break;
								case 1:
									var text = text1;
									if(monster.isBoss) text += " (BOSS)\n";
									else text+= "\n";
									if(monster.isBoss) text+= ["Boss có khả năng vô hiệu hóa một số lượng trụ nhất định. \n","Boss can disable a certain amount of attacking Tower. \n"][LANGUAGE];
									text += text4;
									self.tooltip.reset(0,text);
									break;
								case 2:
									self.tooltip.reset(0,text5 +"\n"+ text6);
									break
							}
						}
						ctx.fillStyle = "#FDA";
						ctx.font = "22px Times New Roman";
						ctx.fillText(text1, 80, 20);
						ctx.font = "18px Times New Roman";
						ctx.drawImage(self.director.getImage("levelIcon"),80,40,30,18);
						ctx.fillText(monster.level, 115, 55);
						ctx.drawImage(self.director.getImage("armorIcon"),80,65,25,25);
						(monster.armor>=0)?ctx.fillStyle = "#0F0": ctx.fillStyle = "#F00";
					
						ctx.fillText(Math.round(10*monster.armor)/10+"",110,80);
						ctx.drawImage(img,50+measure1,0);
						
					}
					else this.removeChildAt(0);
				}
				else {
					if(self.tooltip.positionIndex==1) self.tooltip.hide();
					if(self.cancelInformationBar.visible) self.cancelInformationBar.setVisible(false);
					this.removeChildAt(0);
				}
			}
			this.addChild(this.infomationBar);
			
			this.tooltip = new CAAT.Tooltip().initialize(this.director);
			this.addChild(this.tooltip);
			
			var waveData = mapData.Wave;
			var monsterID = 0;
			for(var i=0;i<waveData.length;i++){
				var dataInWave = waveData[i];
				for (var j=0;j<dataInWave.length;j++){
					for(var k = 0; k < dataInWave[j][1];k++){
						var monster = new CAAT.Monster().initialize(this,dataInWave[j][0],i+1,monsterID, dataInWave[j][2] , i);
						monsterID++;
						this.monsterArray.push(monster);
					}
				}
			}
			
			var mapBound = this.mapBound;
			
			
			
			
            return this;
        },
        replayInformation: function (actionType, actionArg) {
            
			this.replayData.actionData.push({
				time: this.sceneTime,
				actionType: actionType,
				actionArg: actionArg
			});
            
        },
		loadingRep:null,
        loadReplay : function (actionType, actionArg) {
            var self = this;
            if (actionType == "upgradeTower") {
				for(var i=0;i<self.towerArray.length;i++){
					if(self.towerArray[i].id == actionArg[0]){
						self.towerArray[i].upgrade(actionArg[1]);
						self.currentGold -= self.towerArray[i].price;
						break;
					}
				}
				console.log('upgrade');
            }
			else if(actionType == "sellTower"){
				self.sellTower(actionArg[0]);
				console.log('sell');
			}
            else if (actionType == "buildTower") {
                var towerBuy = new CAAT.Tower().initialize(self, actionArg[0], actionArg[1], actionArg[2], actionArg[3], actionArg[4]);
                self.currentGold -= towerBuy.price;
                self.mapBound.addChild(towerBuy);
                self.towerArray.push(towerBuy);
                console.log('buy');
            }
            else if (actionType == "useSkill") {
				self.selectingSkill = actionArg[0];
				self.useSkill(actionArg[1],actionArg[2]);
                console.log('skill');
            };

        },
        saveReplay: function () {
            var send_data = CAAT.Replay();
            send_data.send_data(this.replayData);
        },
		useSkill: function(ex,ey){
			var self = this;
			if(self.selectingSkill!=-1){
				var skillIndex = self.selectingSkill;
				self.selectingSkill = -1;
				if((!self.mapPanel.AABB.contains(ex,ey))||(self.skillPanel.AABB.contains(ex,ey))||(self.minimapPanel.AABB.contains(ex,ey))) return;
				var index = self.userSkill.indexOf(skillIndex);
				var posX = ex - self.mapBound.x;
				var posY = ey - self.mapBound.y;
				self.replayInformation("useSkill",[skillIndex,posX,posY]);
				self.cdActor[index].startCooldown(self.sceneTime);
				var callback = function(animation){
					if(!animation.isEnd){
						animation.isEnd = true;
						console.log("dffd");
						if(animation.animationIndex == 1) {
							var cloudActor = animation.cloudActor;
							var alphaBehavior = new CAAT.Behavior.AlphaBehavior().setValues(cloudActor.getChildAt(0).alpha, 0).setDelayTime(0, 1000).setCycle(false).
							addListener({
								behaviorExpired: function(director, time) {
									animation.emptyBehaviorList();
									self.mapBound.removeChild(animation);
								}
							});
							for(var i=0;i<cloudActor.getNumChildren();i++){
								cloudActor.getChildAt(i).addBehavior(alphaBehavior);
							}
						}
						else self.mapBound.removeChild(animation);
						index=self.updateArray.indexOf(animation);
						self.updateArray.splice(index,1);
					}
				}
				var animation = new CAAT.Animation().initialize(self,skillIndex,posX,posY,callback);
				self.mapBound.addChild(animation);
				self.updateArray.push(animation);
			}
		},
        random:function(){
            var self=this;
            self.currentRandomIndex++;
            if (self.currentRandomIndex == self.randomArray.length) self.currentRandomIndex = 0;
            return self.randomArray[self.currentRandomIndex];
        },
		showUpgrade : function (){
			var self = this;
			var tower = self.towerArray[self.selectingIndex];
			var showUpgrade = false;
			if(tower.element.length>1) showUpgrade = true;
			var dx = tower.AABB.x - self.upgradeButton[5].x + 20;
			var dy = tower.AABB.y - self.upgradeButton[5].y - 30;
			for(var i=0;i<self.upgradeButton.length;i++){
				if((!showUpgrade)||(i==5)) self.upgradeButton[i].setVisible(true);
				else self.upgradeButton[i].setVisible(false);
				self.upgradeButton[i].x += dx;
				self.upgradeButton[i].y += dy;
			}
		},
		hideUpgrade : function (showSell){
			var length = this.upgradeButton.length;
			if(showSell) length--;
			for(var i=0;i<length;i++){
				this.upgradeButton[i].setVisible(false);
			}
		},
		
		setBuildIcon : null,
		redBuildIcon :null,
		isSetBuild : false,
		curBuildType : 0,

		isDrag : false,
		last : { x: 0, y: 0},
		sumdx : 0,
		sumdy : 0,
		towerID : 6,
		canbuild : false,
		canBuildRectangle: function (rectX, rectY, rectWidth, rectHeight,currentMap) {
			var cell_id=((rectX/TILE_SIZE)+currentMap.mapWidth*(rectY/TILE_SIZE));
			var r=rectY/rectHeight;
			var c=rectX/rectWidth;
			if (r<currentMap.mapHeight&&c<currentMap.mapWidth){
			if (currentMap.collisionData[r][c]!=1) return false;
			else if (currentMap.distanceData[cell_id].currentTower) 		
				return false; 
			else return true;
			} else return false;
		},
		addCircle : function(actor){
			var circle = new CAAT.ActorContainer().setBounds(0,0,actor.width,actor.height).enableEvents(false);
			circle.paint = function(director,time){
				var ctx = director.ctx;
				ctx.lineWidth = 4;
				ctx.beginPath();
				ctx.arc(this.width/2,this.height/2,2*this.width/3,0,Math.PI*2);
				ctx.stroke();
				ctx.closePath();
			}
			actor.addChild(circle);
		},
		checkMouseInCircle: function(ex,ey,circleArg){
			if(Math.pow(circleArg[0]-ex,2)+Math.pow(circleArg[1]-ey,2)<Math.pow(circleArg[2],2)) return true;
			return false;
		},
		checkMouseInRect: function(ex,ey,rectArg){
			if((ex>rectArg[0])&&(ex<rectArg[0]+rectArg[2])&&(ey>rectArg[1])&&(ey<rectArg[1]+rectArg[3])) return true;
			return false;
		},
		showSetBuildIcon : function(bbt, x, y, type) {
			var self = this;

			self.setBuildIcon = new CAAT.Foundation.ActorContainer().setBackgroundImage(bbt.backgroundImage);
			self.setBuildIcon
				.setScaleAnchored(TOWER_SIZE / self.setBuildIcon.width, TOWER_SIZE / self.setBuildIcon.height, 0, 0)
				.setLocation(x,y)
				.enableEvents(false);
			var showSelected = new CAAT.Foundation.ActorContainer().setBounds(0, 0, this.width, this.height).setScaleAnchored(self.setBuildIcon.width/TOWER_SIZE, self.setBuildIcon.height/TOWER_SIZE,0,0);
			showSelected.paint = function(director,time){
				var ctx = director.ctx;
				ctx.save();
				ctx.strokeStyle = "#0F0";
				ctx.lineWidth = 2;
				ctx.beginPath();
				ctx.arc(TOWER_SIZE/2,TOWER_SIZE/2,data.Tower[type].Range*TILE_SIZE,0,Math.PI*2);
				ctx.stroke();
				ctx.closePath();
				ctx.restore();
			}
			self.setBuildIcon.addChild(showSelected);
			self.setBuildIcon.alpha = 0.5;
			
			self.redBuildIcon = new CAAT.Foundation.Actor().
				setFillStyle('red').
				setSize(self.setBuildIcon.width,self.setBuildIcon.height).
				setLocation(0,0).
				setAlpha(0);
			self.setBuildIcon.addChild(self.redBuildIcon);

			self.addChild(self.setBuildIcon);
			self.curBuildType = type;

		},
		unShowSetBuildIcon : function() {
			var self = this;
			if(self.setBuildIcon){
				self.setBuildIcon.setVisible(false);
				self.removeChild(self.setBuildIcon);
				self.setBuildIcon.emptyBehaviorList();
				self.setBuildIcon = null;
			}
			self.isSetBuild = false;
		},
		setViewportTo :function (mouseX,mouseY){
			var self = this;
			var mapX = mouseX - self.minimapPanel.x, mapY = mouseY - self.minimapPanel.y;
			var scaledX = mapX/self.minimapPanel.width*self.miniMap.width;
			var scaledY = mapY/self.minimapPanel.height*self.miniMap.height;
			if(scaledX<CANVAS_WIDTH/2) scaledX = CANVAS_WIDTH/2;
			if(scaledY<CANVAS_HEIGHT/2) scaledY = CANVAS_HEIGHT/2;
			if(scaledX>self.miniMap.width - CANVAS_WIDTH/2) scaledX = self.miniMap.width - CANVAS_WIDTH/2;
			if(scaledY>self.miniMap.height - CANVAS_HEIGHT/2) scaledY = self.miniMap.height - CANVAS_HEIGHT/2;
			var dx =  -scaledX +CANVAS_WIDTH/2 - self.mapBound.x;
			var dy =  -scaledY +CANVAS_HEIGHT/2 - self.mapBound.y;
			for(var i=0;i<self.upgradeButton.length;i++){
				self.upgradeButton[i].x += dx;
				self.upgradeButton[i].y += dy;
			}
			self.sumdx -= dx;
			self.sumdy -= dy;
			self.mapBound.setLocation(-scaledX+CANVAS_WIDTH/2, -scaledY+CANVAS_HEIGHT/2);
		},
		touchStart: function (e) {
		    var self = this;
		    var touch = e.changedTouches[0];
		    _mtDown(self, touch.pageX, touch.pageY);
		},
		touchMove: function (e) {
		    var self = this;
		    var touch = e.changedTouches[0];
		    _mtDrag(self, touch.pageX, touch.pageY);
		},
		touchEnd: function (e) {
		    var touch = e.changedTouches[0];
		    var self = this;
		    _mtUp(self, touch.pageX, touch.pageY);
		    _btUp(self, touch.pageX, touch.pageY);
		},
		mouseDown : function(e) {
		    var self = this;
		    _mtDown(self, e.x, e.y);
		},
		mouseUp : function(e) {
		    var self = this;
		    _mtUp(self, e.x, e.y);
		    _btUp(self, e.x, e.y);
		},
		//*

		mouseDrag : function(e) {
		    var self = this;
		    _mtDrag(self, e.x,e.y);		    
		},
        //*/
        ///*
		mouseMove : function(e) {
		    var self = this;
		    _mtMove(self, e.x, e.y);
		    
		},
        //*/
		sellTower: function (towerID) {
		    var self = this;
		    var tower;
			self.replayInformation("sellTower",[towerID]);
		    for (i in this.towerArray){
		        if (this.towerArray[i].id == towerID) {
					self.selectingIndex = -1;
		            tower = this.towerArray[i];
		            tower.queue = [];
		            tower.removeTower();
					var price = tower.price;
					if(tower.element.length>1) price+= data.Tower[0].Price;
					price = (price * self.sellTowerPercent/100)<<0;
					self.currentGold += price;
					delete self.currentMap.distanceData[tower.cell_id].currentTower;
					tower.textShow(["+ "+ price,"+ "+ price],"#FF0", 30);
					var alphaBehavior = new CAAT.Behavior.AlphaBehavior().setValues(1, 0).setFrameTime(self.time, 1000).setCycle(false).
					addListener({
						behaviorExpired: function(director, time) {
							tower.setVisible(false);
							self.mapBound.removeChild(tower);
							tower.emptyBehaviorList();
						}
					});
					tower.addBehavior(alphaBehavior);
					self.towerArray.splice(i, 1);
					break;
		        }
			}
		},
		removeMonster : function(monsterID){
			var self = this;
			var monster = this.monsterArray[monsterID];
			monster.isDead = true;	
			this.deadMonster++;
			//Tạo ra Monster khác để làm hình mờ đi
			if((self.selectingType==1)&&(self.selectingIndex == monsterID)) self.selectingIndex = -1;
            var deadMonster = new CAAT.Monster().initialize(self, monster.type, monster.level,0,0);
            deadMonster.stopMove = true;
			deadMonster.alpha = 1;
            deadMonster.removeChildAt(0);
            deadMonster.setLocation(monster.positionX, monster.positionY);
            deadMonster.textShow(["+ "+monster.bounty,"+ "+monster.bounty],"#FF0");
			self.mapBound.removeChild(monster);
            
			//Xóa con quái khỏi mảng các phần tử nào
            var currentPoint = monster.currentPoint;
            var pointId = monster.pointList[currentPoint].x * monster.currentMap.mapWidth + monster.pointList[currentPoint].y;
            var index = monster.currentMap.distanceData[pointId].currentMonster.indexOf(monster.id);
            this.currentMap.distanceData[pointId].currentMonster.splice(index, 1);

			// Behavior làm mờ
            var alphaBehavior = new CAAT.Behavior.AlphaBehavior().setValues(1, 0).setFrameTime(self.time, 1000).setCycle(false).
				addListener({
				    behaviorExpired: function(director, time) {
						deadMonster.setVisible(false);
						self.mapBound.removeChild(deadMonster);
				        deadMonster.emptyBehaviorList();
				    }
				});
            deadMonster.setDiscardable(true).enableEvents(false).addBehavior(alphaBehavior);
            self.mapBound.addChild(deadMonster);

		},
		updateButton: function(button,indexTower){ 
			var self = this;
			if(self.unlockTower.indexOf(indexTower)==-1){
				if(button.enabled) button.setEnabled(false);
				if(!button.addLockActor){
					button.addLockActor = true;
					var lockIcon = self.director.getImage("lockIcon");
					var lockActor = new CAAT.Foundation.ActorContainer()
						.setBounds(0,0,button.width,button.height)
						.setBackgroundImage(lockIcon)
						.setScaleAnchored(button.width/lockIcon.width,button.height/lockIcon.height,0,0);
					button.addChild(lockActor);
				}
			}
			else {
				button.addLockActor = false;
				if(button.getChildAt(1)) button.removeChildAt(1);
				if(self.currentGold<data.Tower[indexTower].Price) {
					if(button.enabled) button.setEnabled(false);
				}
				else {
					if(!button.enabled) button.setEnabled(true);
				}
			}
		},
		lostBattle : function (){
			for (var i = 0; i < this.towerArray.length; i++) {
				this.mapBound.removeChild(this.towerArray[i]);
			}
			for(var i = 0 ;i<this.monsterArray.length;i++){
				if(!this.monsterArray[i].isDead) {
					this.mapBound.removeChild(this.monsterArray[i]);
				}
			}
			this.endBattle = -1;
			var sceneMap = this.director.getScene(this.nextScene);
			var sceneMapContainer = sceneMap.getChildAt(0);
			sceneMapContainer.initMap(this.director, this, this.userSkill, this.unlockTower, this.level, this.sceneSkillContainer, this.nextScene, this.prevScene, null);
			//
			this.switchToNextScene();
		},
		winBattle : function (){
		    this.endBattle = 1;
		    var sceneMap = this.director.getScene(this.nextScene);
		    var sceneMapContainer = sceneMap.getChildAt(0);
		    sceneMapContainer.initMap(this.director, this, this.userSkill, this.unlockTower, this.level+1, this.sceneSkillContainer, this.nextScene, this.prevScene, null);
			this.switchToNextScene();
		},
		countDownTime : Number.MAX_VALUE,
		showStartText : false,
		startText : "",
		timePerWave : 15000,
		timeDrop: 0, //thời gian bỏ qua để vào wave mới
		currentWave: 0,
        action_number:0,//bien so thu tu su kien khi load replay
		paint : function (director, time){
			var self=this;
			var elapsedTime = self.sceneTime;
			this.elapsedTime = elapsedTime;
			if(elapsedTime<self.countDownTime){
				if(!self.showStartText){
					self.showStartText = true;
					var startText = new CAAT.Foundation.ActorContainer().setBounds(CANVAS_WIDTH/2,20,50,50);
					startText.paint = function(director,time){
						
						var ctx = director.ctx;
						ctx.font = "20px Times New Roman";
						this.alpha = 0.7;
						var elapsedTime = self.elapsedTime;
						var currentWave;
						if(elapsedTime<self.countDownTime) currentWave = 0;
						else currentWave = self.currentWave + 1;
						var text = lang.sceneBattle.ID0[LANGUAGE]+ currentWave+"/"+self.waveNumber;
						if(self.countDownTime-elapsedTime>0){
							self.startText = lang.sceneBattle.ID1[LANGUAGE]// +(1+(self.countDownTime-elapsedTime)/1000<<0)+ lang.sceneBattle.ID2[LANGUAGE];
						}
						var height = 100
						if(!self.showStartText) {
							self.startText = "";
							height = 80;
						}	
						elapsedTime/=1000;
						var minute = ""+((elapsedTime/60)>>0);
						minute = (minute.length==2)? minute : "0"+minute;
						var second = ""+((elapsedTime%60)>>0);
						second = (second.length==2)? second : "0"+second;
						var timeText = minute +" : "+ second;
						var measure0 = ctx.measureText(timeText).width;
						var measure1 = ctx.measureText(text).width;
						var measure2 = ctx.measureText(self.startText).width;
						var width = 30 + Math.max(measure0,measure1,measure2);
						
						ctx.fillStyle = "#00F";
						ctx.fillRect(-width/2,-20,width,height-20);
						ctx.fillStyle = "#0FF";
						ctx.fillText(timeText,-measure0/2,0);
						ctx.fillText(text,-measure1/2,25);
						ctx.fillText(self.startText,-measure2/2,50);
					}
					self.addChild(startText);
				}
			}
			if((this.selectingType!=0)||(this.selectingIndex==-1)) self.hideUpgrade();
			
			for(var i=0;i<self.buildButtonArray.length;i++){
				self.updateButton(self.buildButtonArray[i],i);
			}
			if((self.selectingIndex!=-1)&&(self.selectingType==0)){
				var tower = self.towerArray[self.selectingIndex];
				if(tower.element.length==1){
					for(var i=0;i<self.upgradeButton.length-1;i++){
						for(var j=5;j<data.CombineTower.length;j++){
							var indexOf = data.CombineTower[j].indexOf(tower.element[0]);
							if((indexOf!=-1)&&(data.CombineTower[j][1-indexOf]==i)){
								self.upgradeButton[i].index = j;
								self.upgradeButton[i].getChildAt(0).text = ""+data.Tower[j].Price;
								self.updateButton(self.upgradeButton[i],j);
								break;
							}
						}
					}
				}
			}
		},
		
		update : function (director,time){
		///*
			var self = this;
			self.sceneTime = time;
			if((time>=self.countDownTime)&&(time%300==0)) self.currentGold++;
			
		    ///*
			if (self.loadingRep) {
			    if (loadObj.actionData.length>self.action_number&&loadObj.actionData[self.action_number].time == time) {
			        self.loadReplay(loadObj.actionData[self.action_number].actionType, loadObj.actionData[self.action_number].actionArg);
			        self.action_number++;
			    }
			    
			}
			//*/
			
			if(this.endBattle==0){	//Update nếu chưa kết thúc trận 
				for (var i = 0; i < this.updateArray.length; i++) {
					this.updateArray[i].update(director,time);
				}
				
				for (var i = 0; i < this.towerArray.length; i++) {
					this.towerArray[i].update(director,time);
				}
				
				var monsterArray = this.monsterArray;
				for (i = 0; i < this.addedMonster; i++) {
					if(!monsterArray[i].isDead) {
						var monster = monsterArray[i];
						monster.update(director,time);
						monster.setLocation(monster.positionX,monster.positionY);
					}
				}
				var elapsedTime = time;
				if(elapsedTime>=self.countDownTime){
					var startAddMonsterTime = elapsedTime - self.countDownTime  + self.timeDrop;
					var startAddMonsterWaveTime = startAddMonsterTime - self.currentWave*self.timePerWave;
					self.startAddMonsterWaveTime = startAddMonsterWaveTime;
					if(self.showStartText) {
						self.startText = lang.sceneBattle.ID3[LANGUAGE] +(1+(self.timePerWave-startAddMonsterWaveTime)/1000<<0)+ lang.sceneBattle.ID2[LANGUAGE];
						if(self.currentWave==self.waveNumber-1) {
							self.showStartText = false;
						}
					}
					
					if(self.currentWave<self.waveNumber){
						if(startAddMonsterWaveTime<self.timePerWave){
							var addedMonster = self.addedMonster;
							if(addedMonster<monsterArray.length){
								if(startAddMonsterTime>self.currentWave*self.timePerWave + self.addedMonsterInWave*750) {
									if(self.monsterArray[addedMonster].currentWave == self.currentWave){
										self.clickNextWave = false;
										self.showNextWaveButton = false;
										self.mapBound.addChild(self.monsterArray[addedMonster]);
										self.addedMonster++;
										self.addedMonsterInWave++;
									}
									else{
										if(!self.clickNextWave) self.showNextWaveButton = true;
									}
								}
							}
						}
						else{
							self.addedMonsterInWave = 0;
							if(self.currentWave<self.waveNumber-1) self.currentWave++;
						}
					}					
				}
				if(!self.showNextWaveButton) self.nextWaveButton.setVisible(false);
				else self.nextWaveButton.setVisible(true);
				if(this.deadMonster==monsterArray.length){
					this.winBattle();
				}
			}
		//*/
		}
    }
    var _mtDown = function (self, ex,ey) {
        if ((self.minimapPanel.parent)&&(self.minimapPanel.AABB.contains(ex, ey))) {
            self.setViewportTo(ex, ey);
            self.isDrag = true;
            self.last.x = ex;
            self.last.y = ey;

        }

        if (self.mapPanel.AABB.contains(ex, ey)) {
            self.isDrag = true;
            self.last.x = ex;
            self.last.y = ey;
        }
		/*
        if(self.skillPanel.AABB.contains(ex, ey)) {
	        if(self.skillBtt_1.AABB.contains(ex, ey)) {
	    		self.skillBtt_1.mouseDown();
	    	}
	    	else if(self.skillBtt_2.AABB.contains(ex, ey)) {
	    		self.skillBtt_2.mouseDown();
	    	}
    	}
        if (self.controlPanel.settingbutton.AABB.contains(ex, ey)) {
            self.controlPanel.clickSttBtt();
        }
        else {
            for (var i = 0; i < self.controlPanel.chooseTowers.length; i++) {
                if (self.controlPanel.chooseTowers[i].AABB.contains(ex, ey)) {

                }
            }
        }
		//*/
    };
    var _mtDrag = function (self, ex, ey) {
        if ((self.minimapPanel.parent)&&(self.minimapPanel.AABB.contains(ex, ey))) {
            self.setViewportTo(ex, ey);
        }
        if (self.mapPanel.AABB.contains(ex, ey)) {
            if (self.isDrag) {
                var dx = ex - self.last.x;
                var dy = ey - self.last.y;

                if ((self.mapBound.x + dx < 0) && (self.mapBound.x + dx > -self.currentMap.mapWidth * TILE_SIZE + CANVAS_WIDTH)) {
                    self.sumdx -= dx;
                    self.mapBound.setLocation(self.mapBound.x + dx, self.mapBound.y);
					for(var i=0;i<self.upgradeButton.length;i++) self.upgradeButton[i].x += dx;
                }
					
                if ((self.mapBound.y + dy < 0) && (self.mapBound.y + dy > -self.currentMap.mapHeight * TILE_SIZE + CANVAS_HEIGHT)) {
                    self.mapBound.setLocation(self.mapBound.x, self.mapBound.y + dy);
                    self.sumdy -= dy;
					for(var i=0;i<self.upgradeButton.length;i++) self.upgradeButton[i].y += dy;
                }
                self.last.x = ex;
                self.last.y = ey;
            }
        }        
    };
    var _mtMove = function (self, ex, ey) {
		if(self.tooltip.positionIndex!=0) self.tooltip.setPosition(0);
		if(self.sellTowerMouse){
			var sellTowerMouseImage = self.director.getImage("gold");
			if(!self.sellTowerIcon) {
				self.sellTowerIcon = new CAAT.ActorContainer().setBackgroundImage(sellTowerMouseImage).setBounds(ex-15,ey-15,30,30).setScaleAnchored(30/sellTowerMouseImage.width,30/sellTowerMouseImage.height,0,0).enableEvents(false);
				self.addChild(self.sellTowerIcon);
			}
			else self.sellTowerIcon.setLocation(ex-15,ey-15);
			self.tooltip.reset(0,lang.guide.sell);
		}
        else if (self.isSetBuild) {
            posx = Math.floor(((ex - self.mapBound.x) / TOWER_SIZE) >> 0) * TOWER_SIZE;
            posy = Math.floor(((ey - self.mapBound.y) / TOWER_SIZE) >> 0) * TOWER_SIZE;
            self.setBuildIcon.setLocation(posx + self.mapBound.x, posy + self.mapBound.y);
            self.canbuild = self.canBuildRectangle(posx, posy, TILE_SIZE, TILE_SIZE, self.currentMap);
            if (!self.canbuild) {
                self.setBuildIcon.alpha = 1; // can't build
                self.redBuildIcon.alpha = 0.5;
            }
            else {
                self.setBuildIcon.alpha = 0.5; // can build
                self.redBuildIcon.alpha = 0;
            }
			self.tooltip.reset(0,lang.guide.build);
        }
		else if(self.checkMouseInCircle(ex,ey,[self.width,self.height,self.battleStatus.radius+self.battleStatus.lineWidth/2])){
			if(!self.checkMouseInCircle(ex,ey,[self.width,self.height,self.battleStatus.radius-self.battleStatus.lineWidth/2])){
				var text = lang.guide.life[0][LANGUAGE]+(self.currentLife<<0)+"\n"+lang.guide.life[1][LANGUAGE]+self.life;
				self.tooltip.reset(0,text);
			}
			else self.tooltip.hide();
		}
		else if(self.checkMouseInCircle(ex,ey,[self.infomationBar.circleArg[0],self.infomationBar.circleArg[1],self.infomationBar.circleArg[2]+self.infomationBar.circleArg[3]/2])){			
			self.tooltip.setPosition(1);
			self.infomationBar.mousePosition = 0;
		}
		else if(self.checkMouseInRect(ex,ey,self.infomationBar.rect1Arg)){
			self.tooltip.setPosition(1);
			self.infomationBar.mousePosition = 1;
		}
		else if(self.checkMouseInRect(ex,ey,self.infomationBar.rect2Arg)){
			self.tooltip.setPosition(1);
			self.infomationBar.mousePosition = 2;
		}
		else self.tooltip.hide();
    }
    var _btUp = function (self, ex, ey) {
        
			for(var i=0;i<self.buildButtonArray.length;i++){
				if(self.buildButtonArray[i].AABB.contains(ex,ey)) {
					
					return;
				}
			}
            self.isDrag = false;
            if (self.isSetBuild && self.mapPanel.AABB.contains(ex, ey)) {
                // check can build ?
				if(self.checkMouseInCircle(ex,ey,[self.width,self.height,self.buildCircle.radius])) {
					self.unShowSetBuildIcon();
					return;
				}
                var posx = Math.floor(((ex - self.mapBound.x) / TOWER_SIZE) >> 0) * TOWER_SIZE;
                var posy = Math.floor(((ey - self.mapBound.y) / TOWER_SIZE) >> 0) * TOWER_SIZE;
                self.towerID++;
                if (self.canbuild) {
                    
                    if (self.currentGold < data.Tower[self.curBuildType].Price) {
                        self.unShowSetBuildIcon();
                    }
                    else {
                        var towerBuy = new CAAT.Tower().initialize(self, self.curBuildType, 0, posx, posy, self.towerID);
                        self.currentGold -= towerBuy.price;
                        self.mapBound.addChild(towerBuy);
                        self.towerArray.push(towerBuy);
						self.replayInformation("buildTower",[self.curBuildType,0,posx,posy,self.towerID]);
                        self.unShowSetBuildIcon();
                    }
                }
			
        }
    }
    var _mtUp = function (self,ex,ey) {
        var monsterArray = self.monsterArray;
        var towerArray = self.towerArray;
        var clickedOnTower = false;
        
        for (var i = 0; i < towerArray.length; i++) {
            if (towerArray[i].AABB.contains(ex, ey)) {
				if(self.sellTowerMouse){
					self.sellTower(towerArray[i].id);
					return;
				}
				
                if (self.selectingIndex != -1) {
                    if (self.selectingType == 0) {						
						if(self.selectingIndex == i) {
							self.showUpgrade();
							return;
						}
                    	towerArray[self.selectingIndex].selected = false;
                    }
                    if (self.selectingType == 1) monsterArray[self.selectingIndex].selected = false;
                }

                towerArray[i].selected = true;
				self.selectingIndex = i;
                self.selectingType = 0;
				self.showUpgrade();
                clickedOnTower = true;
				
                break;
            }
        }
        if (!clickedOnTower) {
			self.hideUpgrade();
            for (var i = 0; i < monsterArray.length; i++) {
                if ((!monsterArray[i].isDead) && (monsterArray[i].AABB.contains(ex, ey))) {
                    if (self.selectingIndex != -1) {
                        if (self.selectingType == 0) towerArray[self.selectingIndex].selected = false;
                        if (self.selectingType == 1) monsterArray[self.selectingIndex].selected = false;
                    }
                    monsterArray[i].selected = true;
                    self.changeSelectMonster = true;
                    self.selectingIndex = i;
                    self.selectingType = 1;
                    break;
                }
            }
        }
        
    }
    var pausedFunction = function (director, battleContainer, sceneMenuBattle) {
        var sceneBattleIndex = 1;
        var sceneMenuBattleIndex = 2;
        director.switchToScene(sceneMenuBattleIndex);
        menuBattleContainer = new CAAT.MenuBattleContainer().initialize(battleContainer, null, sceneBattleIndex);
        sceneMenuBattle.emptyChildren();
        sceneMenuBattle.addChild(menuBattleContainer);
    }
    
    extend(CAAT.BattleContainer, CAAT.SceneActor);
})();