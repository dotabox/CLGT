(function () {
	CAAT.Unit = function(){
		CAAT.Unit.superclass.constructor.call(this);
		return(this);
	}
	CAAT.Unit.prototype = {
		image : null,
		startX : null,
		startY : null,
		init: function(img,x, y,width,height,isMonster){
			var self = this;
			this.startX = x;
			this.startY = y;
			var h = 4;
			var w = img.width/(img.height/h);
			if(!isMonster){
				w = img.width/TOWER_IMAGE_SIZE;
				h = img.height/TOWER_IMAGE_SIZE;
			}
			
			this.heightLength = h;
			this.widthLength = w;
			
			this.frameNumber = w;
			
			this.image = new CAAT.Foundation.SpriteImage().initialize(img, h, w);
			this.reset();
			this.setBackgroundImage(self.image, true).
				enableEvents(false);
			var animationIndex = [];
			for(var i=0;i<w;i++) animationIndex.push(self.direction*w+i);
			this.setScaleAnchored(width / self.image.singleWidth, height / self.image.singleHeight, 0, 0).
			setAnimationImageIndex(animationIndex).
			setChangeFPS(200);
			
			this.scale = [this.scaleX,this.scaleY];
			return this;	
		},
		reset : function(){
			this.alive = true;
			this.x = this.startX;
			this.y = this.startY;
			this.positionX = this.startX;
			this.positionY = this.startY;
			this.movePositionX = this.startX;
			this.movePositionY = this.startY;
			this.state = 0;
			this.direction = 0;
		},
		/*
		update : function (action) { //update position & action
			this.actor.setLocation(this.positionX, this.positionY);
			if ((typeof action != "undefined") && (this.action != action)) {
				this.action = action;
				this.actor.setAnimationImageIndex([this.action * 4, this.action * 4 + 1, this.action * 4 + 2, this.action * 4 + 3]);
			}
		},
		updateAction : function(action){ //update Action only
			this.action = action;
			this.actor.setAnimationImageIndex([this.action * 4, this.action * 4 + 1, this.action * 4 + 2, this.action * 4 + 3]);
		},
		*/
		updateState : function(state,fps){ //update state
			var updatedState = (state == "idle")?0:1;
			if(updatedState == 0) this.setChangeFPS(200);
			if(this.state != updatedState){
				var w = this.frameNumber;
				if(updatedState!=0) this.setChangeFPS(fps);
				if(updatedState>=this.heightLength) return;
				this.state = updatedState;
				var animationIndex = [];
				for(var i=0;i<w;i++) animationIndex.push((this.state+this.direction)*w+i);
				this.setAnimationImageIndex(animationIndex);
			}
			
		},
		updateDirection : function(direction){
			if(this.direction!=direction){
				this.direction = direction;
				var animationIndex = [];
				var w = this.frameNumber;
				for(var i=0;i<w;i++) animationIndex.push(this.direction*w+i);
				this.setAnimationImageIndex(animationIndex);
			}
		},
	}
	extend(CAAT.Unit, CAAT.Foundation.ActorContainer);
})();