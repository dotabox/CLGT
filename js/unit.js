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
			if(isMonster) this.image = new CAAT.Foundation.SpriteImage().initialize(img, 4, 4);
			else this.image = img;
			this.reset();
			this.setBackgroundImage(self.image, true).
				enableEvents(false);
			if(isMonster)
				this.setScaleAnchored(width / self.image.singleWidth, height / self.image.singleHeight, 0, 0).
				setAnimationImageIndex([self.direction * 4, self.direction * 4 + 1, self.direction * 4 + 2, self.direction * 4 + 3]).
				setChangeFPS(200);
			else this.setScaleAnchored(width / self.image.width, height / self.image.height, 0, 0);
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
			this.state = "idle";
			this.direction = 1;
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
		updateState : function(state){ //update state

		},
		*/
		updateDirection : function(direction){
			this.direction = direction;
			this.setAnimationImageIndex([direction * 4, direction * 4 + 1, direction * 4 + 2, direction * 4 + 3]);
		},
	}
	extend(CAAT.Unit, CAAT.Foundation.ActorContainer);
})();