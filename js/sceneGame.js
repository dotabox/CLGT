
(function () {
    CAAT.MiniGameContainer = function () {
        CAAT.MiniGameContainer.superclass.constructor.call(this);
        return this;
    };

	CAAT.MiniGameContainer.prototype = {
		initialize: function(director) {
			var self = this;
			this.director = director;
			this.setBounds(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
				.setFillStyle("#ccffcc");
				
			var  buttonSize = 100;
			var backImage = new CAAT.Foundation.SpriteImage().initialize(director.getImage('back'), 1, 1 );
			var backBtt = new CAAT.Button().initialize(director, backImage, 0, 0, 0, 0, function(button){
				Sound.playMusic("start");
				self.director.switchToScene(sceneMenuIndex);
			})
	        	.setLocation(0, 0)
	        	.setScaleAnchored(buttonSize / backImage.singleWidth, buttonSize / backImage.singleHeight, 0, 0);
	        this.addChild(backBtt);
			
			var gameImage = new CAAT.SpriteImage().initialize(director.getImage("skillTable"),1,1);
			var gameButton = new CAAT.Button().initialize(director,gameImage,0,0,0,0,function(){
				console.log("game on");
				self.loadGame(director,0);
			}).
				setLocation(100,200).
				setScaleAnchored(3/2*buttonSize/gameImage.singleWidth,3/2*buttonSize/gameImage.singleHeight,0,0);
			this.addChild(gameButton);
			return this;
		},
		paint: function(director,time){
			CAAT.MiniGameContainer.superclass.paint.call(this, director, time);
			var ctx = director.ctx;
			ctx.fillStyle = "#F0F";
			ctx.font = "40px Times New Roman";
			var text = "Mini Game";
			var measure = ctx.measureText(text).width;
			ctx.fillText(text,this.width/2-measure/2,50);
		},
		loadjs: function(src){
			var file=document.createElement("script");
			file.src=src;
			document.body.appendChild(file);
		},
		loadGame: function (director,id) {
			var _self=this;
			switch(id){
			// Ban no than
			case 0:
				_self.loadjs("miniGame/BanNoThan/js/main.js");
				_self.loadjs("miniGame/BanNoThan/js/draw.js");
				var imageElement = new CAAT.Module.Preloader.Preloader().
				addElement("bn_bg", "miniGame/BanNoThan/imgs/bg.png").
				addElement("bn_player", "miniGame/BanNoThan/imgs/player.png").
				addElement("bn_enemy", "miniGame/BanNoThan/imgs/enemy.png").
				addElement("bn_bullet", "miniGame/BanNoThan/imgs/bullet.png").
				addElement("bn_bulletenemy", "miniGame/BanNoThan/imgs/bullet_enemy.png").
				load(function onAllAssetsLoaded(images) {					
					bannothan(images,director);
				});
				return this;
				break;
			}
            
        }
	};
	extend(CAAT.MiniGameContainer, CAAT.Foundation.ActorContainer);
	 
})();