(function () {
    CAAT.MangaTextBox = function () {
        CAAT.MangaTextBox.superclass.constructor.call(this);
        return this;
    }

    CAAT.MangaTextBox.prototype = {
        type: "talk1",
        radius: 10,

        initialize: function (director, text, width, actor) {
			var textActor = new CAAT.MyTextActor().initialize(director, text, width);
			this.setSize(textActor.width, textActor.height);
            this.setPosition(actor.width - 15, -this.height - 15);
			this.addChild(textActor);
			this.director = director;
            actor.addChild(this);
            return this;
        },

        paint: function (director, time) {
            CAAT.MangaTextBox.superclass.paint.call(this, director, time);
            var ctx = director.ctx;
            ctx.strokeStyle = this.strokeStyle;
            var width = this.width;
            var height = this.height;
			ctx.save();
			ctx.fillStyle = "#FFF";
            ctx.beginPath();
            ctx.moveTo(this.radius - 5,  -5);
            ctx.lineTo(width - this.radius, -5);
            ctx.quadraticCurveTo(width + 5, -5, width + 5, this.radius - 5);
            ctx.lineTo(width + 5, height - this.radius + 5);
            ctx.quadraticCurveTo(width + 5, height + 5, width - this.radius + 5, height + 5);
            ctx.lineTo(this.radius - 5, height + 5);
            ctx.quadraticCurveTo(-5, height + 5, -5, height - this.radius + 5);
            ctx.lineTo(-5, this.radius - 5);
            ctx.quadraticCurveTo(-5, -5, this.radius - 5, -5);
            ctx.closePath();
			ctx.fill();
			ctx.stroke();
			ctx.restore();
			
            var image = this.director.getImage(this.type);
            (typeof this.talkPositionX != "undefined")?
				ctx.drawImage(image, this.talkPositionX, height + 4):
				ctx.drawImage(image, this.radius, height + 4);
        },
		setTalkPositionX: function (talkPositionX) {
            this.talkPositionX = talkPositionX;
            return this;
        },
		
        setRadius: function (radius) {
            this.radius = radius;
            return this;
        },

        setType: function (type) {
            this.type = type;
            return this;
        },
		
		setRelativePosition: function(offsetX, offsetY) {
			this.setPosition(actor.width - offsetX, -this.height - offsetY);
			return this;
		}
    }
    extend(CAAT.MangaTextBox, CAAT.ActorContainer)
})()