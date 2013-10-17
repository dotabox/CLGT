(function () {
	CAAT.OptionContainer = function(){		
		CAAT.OptionContainer.superclass.constructor.call(this);
		return(this);
	}
	CAAT.OptionContainer.prototype = {		
        initialize: function (director,callback,inBattle){
			var self = this;
			this.director = director;
			this.setBackgroundImage(director.getImage("credits_bg"));
			this.callback = callback;
			this.inBattle = inBattle;
			var cancelButton = new CAAT.Button().initialize(director, director.getImage("cancelButton"), 0, 0, 0, 0, 
			function () {
				self.callback();
			})
				.setLocation(400, 0);
			self.addChild(cancelButton);
			
			this.languageButton = [];
			for(var i=0;i<2;i++){
				var languageButtonImage = new CAAT.Foundation.SpriteImage().initialize(director.getImage('checkbox'), 2, 1 );
				self.languageButton[i] = new CAAT.Button().initialize(director,languageButtonImage,1,1,1,0,
				function(){
					var index = self.languageButton.indexOf(this);
					this.setEnabled(false);
					LANGUAGE = index;
					self.languageButton[1-index].setEnabled(true);
				})
					.setLocation(170+150*i,80)
					.setScaleAnchored(24/languageButtonImage.singleWidth,24/languageButtonImage.singleHeight,0,0);
				if(i==LANGUAGE) self.languageButton[i].setEnabled(false);
				self.addChild(self.languageButton[i]);
			}
			
			
			
			this.startScroll = 220;
			this.scrollLength = 200;
			this.stopScroll = this.startScroll+this.scrollLength;
			this.scrollSfx = new CAAT.Foundation.ActorContainer().setBounds(this.startScroll,115,this.scrollLength,50).enableEvents(false);
			this.scrollMusic = new CAAT.Foundation.ActorContainer().setBounds(this.startScroll,175,this.scrollLength,50).enableEvents(false);
			this.scrollSpeed = new CAAT.Foundation.ActorContainer().setBounds(this.startScroll+(GAME_SPEED-1)*this.scrollLength,245,20,15).enableEvents(false);
			//this.scrollSpeed.setFillStyle((inBattle)?"#CCC":"#F80");
			this.scrollSpeed.setFillStyle("#F80");
			this.addChild(this.scrollSfx);
			this.addChild(this.scrollMusic);
			this.addChild(this.scrollSpeed);
			this.scrollBar = [this.scrollSfx,this.scrollMusic,this.scrollSpeed];
			return this;
		},
		setCallbackFunction: function(callback){
			this.callback = callback;
		},
		paint: function (director,time){
			CAAT.OptionContainer.superclass.paint.call(this, director, time);
			//this.sceneTime = time;
			var ctx = director.ctx;
			
			ctx.fillStyle = "#FDA";
			ctx.font = "30px Times New Roman";
			ctx.fillText(["Ngôn Ngữ: ","Language: "][LANGUAGE], 20,100);
			ctx.fillText(["Hiệu Ứng: ","SFX Volume: "][LANGUAGE], 20,150);
			ctx.fillText(["Âm Nhạc: ","Music Volume: "][LANGUAGE], 20,210);
			ctx.fillText(["Tốc Độ Game: ","Game Speed: "][LANGUAGE], 20,260);
			
			ctx.font = "25px Times New Roman";
			ctx.fillText("Tiếng Việt", 200,100);
			ctx.fillText("English", 350,100);
			
			var gradient = ctx.createLinearGradient(0,0,470,50);
			gradient.addColorStop(0.5,"#0F0");
			gradient.addColorStop(1,"#00F");
			ctx.fillStyle = gradient;
			ctx.fillRect(220,250,220,5);
			
			for(var i=0;i<10;i++){
				ctx.strokeRect(220+i*20,150-i*5,20,(i+1)*5);
				ctx.strokeRect(220+i*20,210-i*5,20,(i+1)*5);
				if(SFX_VOLUME>i*10)	ctx.fillRect(220+i*20,150-i*5,(SFX_VOLUME>=(i+1)*10)?20:20*(SFX_VOLUME%10)/10,(i+1)*5);
				if(MUSIC_VOLUME>i*10) ctx.fillRect(220+i*20,210-i*5,(MUSIC_VOLUME>=(i+1)*10)?20:20*(MUSIC_VOLUME%10)/10,(i+1)*5);
			}
			
		},
		scrolling: -1,
		_mtDown: function(ex,ey){
			for(var i=0;i<this.scrollBar.length;i++){
				if(this.scrollBar[i].AABB.contains(ex+this.x,ey+this.y)){
					this.scrolling = i;
					this.lastX = ex;
					if(i==0) Sound.setSfxVolume(Math.round(100*(ex-this.startScroll)/this.scrollLength));
					if(i==1) Sound.setMusicVolume(Math.round(100*(ex-this.startScroll)/this.scrollLength));
					break;
				}
			}
		},
		lastX: 0,
		_mtDrag: function(ex,ey){
			if(this.scrolling!=-1){
				switch(this.scrolling){
					case 0:
						if((ex>=this.startScroll)&&(ex<=this.stopScroll)) Sound.setSfxVolume(Math.round(100*(ex-this.startScroll)/this.scrollLength));
						break;
					case 1:
						if((ex>=this.startScroll)&&(ex<=this.stopScroll)) Sound.setMusicVolume(Math.round(100*(ex-this.startScroll)/this.scrollLength));
						break;
					case 2:
//						if(this.inBattle) break;
						dx = ex - this.lastX;
						this.lastX = ex;
						var nextX = this.scrollSpeed.x+dx;
						if((nextX<this.startScroll)||(nextX>this.stopScroll)) return;
						var value = (nextX-this.startScroll)/this.scrollLength;
						GAME_SPEED = 1+value;
						this.scrollSpeed.setLocation(nextX,this.scrollSpeed.y);
						break;
				}
			}
		},
		_mtUp: function(ex,ey){
			this.scrolling = -1;
		},
		touchStart: function (e) {
		    var touch = e.changedTouches[0];
		    this._mtDown(touch.pageX, touch.pageY);
		},
		touchMove: function (e) {
		    var touch = e.changedTouches[0];
		    this._mtDrag(touch.pageX, touch.pageY);
		},
		touchEnd: function (e) {
		    var touch = e.changedTouches[0];
		    this._mtUp(touch.pageX, touch.pageY);
		},
		mouseDown : function(e) {
		    this._mtDown(e.x,e.y);            
		},
		mouseUp : function(e) {
		    this._mtUp(e.x,e.y);		    
		},
		mouseDrag : function(e) {
		    this._mtDrag(e.x,e.y);		    
		},
	}
	extend(CAAT.OptionContainer, CAAT.Foundation.ActorContainer);
})();
