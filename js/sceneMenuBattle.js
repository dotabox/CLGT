(function () {
	CAAT.MenuBattleContainer = function(){		
		CAAT.MenuBattleContainer.superclass.constructor.call(this);
		return(this);
	}
	CAAT.MenuBattleContainer.prototype = {		
        initialize: function (battleContainer,nextScene,prevScene){
			var self = this;
			this.battleContainer = battleContainer;
			this.director = battleContainer.director;
			var director = this.director;
			CAAT.MenuBattleContainer.superclass.initialize.call(this, director, nextScene, prevScene);
			this.setBounds(0,0,director.width,director.height);
			this.setBackgroundImage(battleContainer.backgroundImage);
			
			this.greyActor = new CAAT.Foundation.Actor().setBounds(0,0,this.width,this.height).setAlpha(0.7).setFillStyle("#000");
			this.addChild(this.greyActor);
			/*
			var menuWidth = 80;
			var menuHeight = 50;
			var menuImage = new CAAT.Foundation.SpriteImage().initialize(director.getImage('menuBattleButton'), 1, 2 );
			this.menuButton = new CAAT.Button().initialize(this.director,menuImage,0,1,1,0,
			function(){
				self.switchToPrevScene();
				self.battleContainer.parent.setPaused(false);
				self.battleContainer.stopCacheAsBitmap();
			})
				.setLocation((CANVAS_WIDTH-menuWidth)/2,0)
				.setScaleAnchored(menuWidth/menuImage.singleWidth,menuHeight/menuImage.singleHeight,0,0);
			this.addChild(this.menuButton);
			*/
			var menuListWidth = 220;
			var menuListHeight = 50;
			this.menuListButton = [];
			var menuListImage = new CAAT.Foundation.SpriteImage().initialize(director.getImage("menuListButton"), 5, 2 );
			for(var i=0;i<5;i++){
				
				self.menuListButton[i] = new CAAT.Button().initialize(this.director,menuListImage,i*2,i*2+1,i*2+1,i*2,
				function(){
				},
				function(){
				},
				function(button,ex,ey){
					var index = self.menuListButton.indexOf(this);
					if(!button.AABB.contains(ex,ey)) return;
					switch(index){
						case 0:
							self.switchToPrevScene();
							self.battleContainer.parent.setPaused(false);
							self.battleContainer.stopCacheAsBitmap();
							self.battleContainer.restart();
							break;
						case 1:
							var option = new CAAT.OptionContainer().initialize(director,"",true);
							option.setLocation((CANVAS_WIDTH-option.width)/2,(CANVAS_HEIGHT-option.height)/2);
							option.setCallbackFunction(function(){
								self.removeChild(self.option);
							});
							self.option = option;
							self.addChild(option);
							break;
						case 2:
							if(self.battleContainer.isStart) self.battleContainer.isStart();
							self.battleContainer.stopCacheAsBitmap();
							//self.battleContainer.endBattle = -1;
							self.director.switchToScene(3);
							break;
						case 3:
							self.battleContainer.stopCacheAsBitmap();
							//self.battleContainer.endBattle = -1;
							self.director.switchToScene(0);
							break;
						case 4:
							self.switchToPrevScene();
							self.battleContainer.parent.setPaused(false);
							self.battleContainer.stopCacheAsBitmap();
							break;
					}
					//if(text) self.textShow([text,text],"#0F0");
				})
					.setLocation((CANVAS_WIDTH-menuListWidth)/2,(CANVAS_HEIGHT-menuListHeight*5-50)/2+ (menuListHeight+10)*i)
					.setScaleAnchored(menuListWidth/menuListImage.singleWidth,menuListHeight/menuListImage.singleHeight,0,0);
					this.addChild(self.menuListButton[i]);
			}
			
			return this;
		},
		textShow: function(texts,color){
			var text = texts[LANGUAGE];
			var showText = new CAAT.DamageShow().initialize(text,CANVAS_WIDTH/3,CANVAS_HEIGHT/2,color,this.battleContainer, 50);
			this.addChild(showText);
			showText.active(this.sceneTime);
		},
		paint: function (director,time){
			CAAT.MenuBattleContainer.superclass.paint.call(this, director, time);
			this.sceneTime = time;
		}
	}
	extend(CAAT.MenuBattleContainer, CAAT.SceneActor);
})();
