
(function () {
    CAAT.DEBUG_VIEWPORT = 1;
    CAAT.SemiMainMapCtn = function () {
        CAAT.SemiMainMapCtn.superclass.constructor.call(this);
        return this;
    };

	CAAT.SemiMainMapCtn.prototype = {
		create: function(director, width, height) {
			var self = this;

			this.setBounds(0,0,width,height)
				.setFillStyle("#ccffcc");

			this.showPanel(false);

	        this.historyData = [];
	        this.semiMapNumber = 6;
	        this.levelPerSemiMap = 4;
	        this.levelAtCoLoa = 6;
	        this.semiMapCoLoaIndex = 0;
	        this.maxStarPerLevel = 5;

	        for(var i = 0; i < this.semiMapNumber; i++) {
	        	this.historyData[i] = [];
	        	if(i == this.semiMapCoLoaIndex) {
	        		this.historyData[i].lvlNumber = this.levelAtCoLoa;
	        	}
	        	else {
	        		this.historyData[i].lvlNumber = this.levelPerSemiMap;
	        	}

	        	for(var j = 0; j <this.historyData[i].lvlNumber; j++) {
        			this.historyData[i][j] = {};
        			this.historyData[i][j].isLock = true;
        			this.historyData[i][j].star = 0;
        			this.historyData[i][j].nextUnlock = [j+1];
        		}
        		this.historyData[i][0].isLock = false;
        		this.historyData[i][0].nextUnlock = [1, 2];
        		this.historyData[i][1].nextUnlock = [3];
        		this.historyData[i][2].nextUnlock = [3];
	        }

			return this;
		},

		showPanel: function(isShow) {
			if(isShow) {
				this.alpha = 1;
	            this.enableEvents(true);
			}
			else {
				this.alpha = 0;
	            this.emptyChildren();
	            this.enableEvents(false);
			}
			return this;
		},

		setMap: function(director, bgColor, id) {
			var self = this;

			this.setFillStyle(bgColor);

			var bttSize = 80;
			var backImage = new CAAT.Foundation.SpriteImage().initialize(director.getImage('back'), 1, 1 );
			var backBtt = new CAAT.Button().initialize(director, backImage, 0, 0, 0, 0, function(button){
	            	// hide this container
	            	self.showPanel(false);
	            })
	        	.setLocation(0, 0)
	        	.setScaleAnchored(bttSize / backImage.singleWidth, bttSize / backImage.singleHeight, 0, 0);
	        this.addChild(backBtt);

	        var flagImage = new CAAT.Foundation.SpriteImage().initialize(director.getImage('flag'), 1, 1 );

	        var starSize = 10;
	        var starImg = director.getImage("star");
	        var starEmptyImg = director.getImage("starEmpty");
	        var starEmptyActor;
	        var starActor;
			var addStar = function(flagBtt, star, maxStar) {
				flagBtt.emptyChildren();
				for(var i = 0; i < star; i++) {
					starActor = new CAAT.Actor()
			        	.setBackgroundImage(starImg)
			        	.setScaleAnchored(starSize/starImg.width, starSize/starImg.height, 0, 0)
			        	.setLocation(i*starSize+10, flagImage.height - starSize)
		            	.enableEvents(false);
		            flagBtt.addChild(starActor);
				}
				for(var i = star; i < maxStar; i++) {
					starEmptyActor = new CAAT.Actor()
			        	.setBackgroundImage(starEmptyImg)
			        	.setScaleAnchored(starSize/starEmptyImg.width, starSize/starEmptyImg.height, 0, 0)
			        	.setLocation(i*starSize+10, flagImage.height - starSize)
		            	.enableEvents(false);
		            flagBtt.addChild(starEmptyActor);
				}
			}

			var setFlagIsLock = function(i, isLock) {
				self.historyData[id][i].isLock = isLock;
				if(!isLock) {
					flagBtt[i].alpha = 1;
					flagBtt[i].enableEvents(true);
					addStar(flagBtt[i], self.historyData[id][i].star, self.maxStarPerLevel);
				}
				else {
					flagBtt[i].alpha = 0.2;
					flagBtt[i].enableEvents(false);	
				}
			};

	        var flagBtt = [];
			var flagIsShow = [];
			var flagNumber = self.historyData[id].lvlNumber;
			for(var i = 0; i < flagNumber; i++) {
				flagBtt[i] = new CAAT.Button().initialize(director, flagImage, 0, 0, 0, 0, function(button){
		            	i = this.idInArray;
						
				        // call battle container
		            	self.mapindex = 1;
		            	self.initMap(director);
		            	director.switchToScene(1);
						
		            	// sau battle, open next flag, cho no 2 sao lam demo
						var currentBtt = this;
						self.updateWinBattle = function(star){
			            	for(var f = 0; f < self.historyData[id][i].nextUnlock.length; f++) {
			            		setFlagIsLock(self.historyData[id][i].nextUnlock[f], false);
			            	}
			            	self.historyData[id][i].star = star;
			            	addStar(currentBtt, self.historyData[id][i].star, self.maxStarPerLevel);
						}
		            })
	            	.setLocation(i*flagImage.width*2, 200);
	            flagBtt[i].idInArray = i;
	            setFlagIsLock(i, self.historyData[id][i].isLock);
	            this.addChild(flagBtt[i]);
			}
			flagBtt[1].setLocation(flagBtt[1].x, flagBtt[1].y - flagImage.height);
			flagBtt[2].setLocation(flagBtt[1].x, flagBtt[1].y + flagImage.height*2);
			for(var i = 3; i < flagNumber; i++) {
				flagBtt[i].setLocation(flagBtt[i].x - flagImage.width*2, flagBtt[i].y);
			}

			return this;
		},
		initData: function (director, battleContainer, skillarray, unlockTower, level, sceneSkillContainer, scenMainMenuIndex, sceneMenuIndex, battleLoad) {
		    
		    this.battleContainer = battleContainer;
		    
		    this.skillarray=skillarray;
		    this.unlockTower=unlockTower;
		    this.level = level;
		    this.sceneSkillContainer = sceneSkillContainer;
		    this.scenMainMenuIndex = scenMainMenuIndex;
		    this.sceneMenuIndex = sceneMenuIndex;
		    this.battleLoad = battleLoad;
		    
		    return this;
		},
		initMap: function (director) {

		    //var load_data = new CAAT.Replay();
		    this.battleContainer.emptyChildren();
		    this.battleContainer.initialize(director, this.mapindex, this.skillarray, this.unlockTower, this.level, this.sceneSkillContainer, this.scenMainMenuIndex, this.sceneMenuIndex);
		    if (this.battleContainer.parent == null) this.battleLoad(this.battleContainer);
		    //else this.battleContainer.parent.addChild(this.battleContainer);
			this.battleContainer.resetTime();
		    return this;
		}
	};
	extend(CAAT.SemiMainMapCtn, CAAT.Foundation.ActorContainer);
	 
})();