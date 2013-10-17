
(function () {
    CAAT.DEBUG_VIEWPORT = 1;
    CAAT.SceneMapCtn = function () {
        CAAT.SceneMapCtn.superclass.constructor.call(this);
        return this;
    };

	CAAT.SceneMapCtn.prototype = {
		create: function(director) {
			var self = this;
			this.director = director;
			
			this.setBounds(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
				.setFillStyle("#ccccff");

			this.semiMainMap = new CAAT.SemiMainMapCtn()
				.create(director, this.width, this.height*5/6)
				.setLocation(0, 0);
				
			var bttSize = 80;
			var backImage = new CAAT.Foundation.SpriteImage().initialize(director.getImage('back'), 1, 1 );
			var backBtt = new CAAT.Button().initialize(director, backImage, 0, 0, 0, 0, function(button){
					Sound.playMusic("start");
	            	self.director.switchToScene(self.semiMainMap.sceneMenuIndex);
	            })
	        	.setLocation(0, 0)
	        	.setScaleAnchored(bttSize / backImage.singleWidth, bttSize / backImage.singleHeight, 0, 0);
	        this.addChild(backBtt);

	        var skillTableImg = new CAAT.Foundation.SpriteImage().initialize(director.getImage('skillTable'), 1, 1 );
	        var skillTableBtt = new CAAT.Button().initialize(director, skillTableImg, 0, 0, 0, 0, function(button){
	            	self.director.switchToScene(self.semiMainMap.sceneSkillContainer.sceneIndex);
	            })
	        	.setLocation(bttSize, CANVAS_HEIGHT - bttSize)
	        	.setScaleAnchored(bttSize / skillTableImg.singleWidth, bttSize / skillTableImg.singleHeight, 0, 0);
	        this.addChild(skillTableBtt);

	        var skillPointInfo = new CAAT.Foundation.UI.TextActor()
                .setFont('30px Arial')
                .setSize(bttSize, bttSize)
                .setTextFillStyle('#333')
                .setText(""+0)
                .setLocation(2*bttSize, CANVAS_HEIGHT - bttSize);
            this.addChild(skillPointInfo);

            this.updateSkillPoint = function(pointLeft) {
            	skillPointInfo.setText(""+pointLeft);
            }
			
			var areaButtonSize = 150;
			var castleImage = new CAAT.Foundation.SpriteImage().initialize(director.getImage('castle'), 1, 1 );
			var forestImage = new CAAT.Foundation.SpriteImage().initialize(director.getImage('forest'), 1, 1 );
			var graveImage = new CAAT.Foundation.SpriteImage().initialize(director.getImage('grave'), 1, 1 );
			var mineImage = new CAAT.Foundation.SpriteImage().initialize(director.getImage('mine'), 1, 1 );
			var seaImage = new CAAT.Foundation.SpriteImage().initialize(director.getImage('sea'), 1, 1 );
			var volcanoImage = new CAAT.Foundation.SpriteImage().initialize(director.getImage('volcano'), 1, 1 );

			var coLoaID = 0; 
			var kimID = 1; 
			var mocID = 2;
			var thuyID = 3;
			var hoaID = 4;
			var thoID = 5;

			var castleBtt = new CAAT.Button().initialize(director, castleImage, 0, 0, 0, 0, 
					function(button) {
						self.semiMainMap.showPanel(true);
						self.semiMainMap.setMap(director, "#cccccc", coLoaID);
	            	}
	            )
	        	.setLocation(300, 170)
	        	.setScaleAnchored(areaButtonSize / castleImage.singleWidth, areaButtonSize / castleImage.singleHeight, 0, 0);
	        this.addChild(castleBtt);

	        var forestBtt = new CAAT.Button().initialize(director, forestImage, 0, 0, 0, 0, 
					function(button) {
						self.semiMainMap.showPanel(true);
						self.semiMainMap.setMap(director, "#88ff88", mocID);
	            	}
	            )
	        	.setLocation(450, 30)
	        	.setScaleAnchored(areaButtonSize / forestImage.singleWidth, areaButtonSize / forestImage.singleHeight, 0, 0);
	        this.addChild(forestBtt);

	        var seaBtt = new CAAT.Button().initialize(director, seaImage, 0, 0, 0, 0, 
					function(button) {
						self.semiMainMap.showPanel(true);
						self.semiMainMap.setMap(director, "#8888ff", thuyID);
	            	}
	            )
	        	.setLocation(530, 200)
	        	.setScaleAnchored(areaButtonSize / seaImage.singleWidth, areaButtonSize / seaImage.singleHeight, 0, 0);
	        this.addChild(seaBtt);

	        var graveBtt = new CAAT.Button().initialize(director, graveImage, 0, 0, 0, 0, 
					function(button) {
						self.semiMainMap.showPanel(true);
						self.semiMainMap.setMap(director, "#ffdd88", thoID);
	            	}
	            )
	        	.setLocation(260, 340)
	        	.setScaleAnchored(areaButtonSize / graveImage.singleWidth, areaButtonSize / graveImage.singleHeight, 0, 0);
	        this.addChild(graveBtt);

	        var mineBtt = new CAAT.Button().initialize(director, mineImage, 0, 0, 0, 0, 
					function(button) {
						self.semiMainMap.showPanel(true);
						self.semiMainMap.setMap(director, "#ff88dd", kimID);
	            	}
	            )
	        	.setLocation(40, 180)
	        	.setScaleAnchored(areaButtonSize / mineImage.singleWidth, areaButtonSize / mineImage.singleHeight, 0, 0);
	        this.addChild(mineBtt);

	        var volcanoBtt = new CAAT.Button().initialize(director, volcanoImage, 0, 0, 0, 0, 
					function(button) {
						self.semiMainMap.showPanel(true);
						self.semiMainMap.setMap(director, "#ff8888", hoaID);
	            	}
	            )
	        	.setLocation(150, 30)
	        	.setScaleAnchored(areaButtonSize / volcanoImage.singleWidth, areaButtonSize / volcanoImage.singleHeight, 0, 0);
	        this.addChild(volcanoBtt);

	        this.addChild(this.semiMainMap);

			return this;
		},
		initMap: function (director, battleContainer, skillarray, unlockTower, level, sceneSkillContainer, scenMainMenuIndex, sceneMenuIndex, battleLoad) {
		    this.semiMainMap.initData(director, battleContainer, skillarray, unlockTower, level, sceneSkillContainer, scenMainMenuIndex, sceneMenuIndex, battleLoad);
			return this;
		}
	};
	extend(CAAT.SceneMapCtn, CAAT.Foundation.ActorContainer);
	 
})();