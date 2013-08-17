(function () {
    CAAT.DamageShow = function () {
        CAAT.DamageShow.superclass.constructor.call(this);
        return this;
    }

    CAAT.DamageShow.prototype = {
        texts: null,
        x: 0,
        y: 0,
        width: 0,
        height: 0,

        initialize: function (text, x, y, color, battleContainer, fontSize) {
            var length = text.length;
			this.text = text;
			this.battleContainer = battleContainer;
			this.director = battleContainer.director;
			this.fontSize = fontSize;
            this.texts = [];
            for (var i = 0; i < length; i++) {
                this.texts.push(parseInt(text[i]));
            }
            this.x = x;
            this.y = y;
			this.color = color;
            this.width = 16 * length;
            this.height = 22;
            this.setBounds(this.x, this.y, this.width, this.height);
            return this;
        },

        paint: function (director, time) {
            CAAT.DamageShow.superclass.paint.call(this, director, time);
			var self = this;
            var ctx = director.ctx;
            var img = self.director.getImage('dmg');
			if((this.texts[0]>=0)&&(this.texts[0]<=9)){
				for(var i=0; i<this.texts.length; i++) {
					ctx.drawImage(img, this.texts[i] * 22, 0, 22, 22, i*14, 0, 22, 22);
				}
			}
			else{
				ctx.fillStyle = this.color;
				if(!this.fontSize) ctx.font = "20px Times New Roman";
				else ctx.font = this.fontSize + "px Times New Roman";
				ctx.fillText(this.text,10,30);
			}
        },
		
        active: function (time) {
			var scaleX = this.parent.scaleX;
			var scaleY = this.parent.scaleY;
			this.setScale(MONSTER_SIZE/scaleX/64, MONSTER_SIZE/scaleY/64);
            var alphaBehavior = new CAAT.AlphaBehavior().setValues(1, 0).setFrameTime(time, 1000);
            var path = new CAAT.PathUtil.LinearPath().setInitialPosition(this.x, this.y).setFinalPosition(this.x, this.y - 30);
            var pathBehavior = new CAAT.PathBehavior().setValues(path).setFrameTime(time, 1000);
            this.
                setDiscardable(true).
                enableEvents(false).
                setFrameTime(time, 1000).
                addBehavior(alphaBehavior).
                addBehavior(pathBehavior);
        }
		
    }
    extend(CAAT.DamageShow, CAAT.Actor2);
})();