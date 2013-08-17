(function () {
    CAAT.CooldownActor = function () {
        CAAT.CooldownActor.superclass.constructor.call(this);
        return this;
    }

    CAAT.CooldownActor.prototype = {
        cdTime: null,
        isDone: true,
        isCooldown: false,
        radius: null,
        initialize: function (x, y, w, h, cdTime) {
            var self = this;

            this.cdTime = cdTime;
            this.progress = 0;
            this.setLocation(x, y)
                .setSize(w, h)
                .enableEvents(false);

            return this;
        },

        setCooldownTime: function(cdTime) {
            this.cdTime = cdTime;
            return this;
        },

        startCooldown: function(timeStart) {
            this.timeStart = timeStart;
            this.isCooldown = true;
            this.progress = 0;
            // action
            return this;
        },

        pauseCooldown: function() {
            // action
            return this;
        },

        stopCooldown: function() {
            // action
            return this;
        },
        paint: function (director, time) {
            CAAT.CooldownActor.superclass.paint.call(this, director, time);
            var ctx = director.ctx;
            var self = this;
            if(this.isCooldown) {
                ctx.globalAlpha = 0.5;
                ctx.beginPath();
                ctx.fillStyle = '#000';
				ctx.fillRect(0,0,this.width,this.height);
                ctx.fillStyle = '#FFF';
                ctx.moveTo(this.width/2, 0);
				
                //ctx.arc(this.width/2, this.height/2, this.width/2, -Math.PI / 2, 2 * Math.PI * this.progress - Math.PI / 2, true);
				
               // ctx.lineTo(this.width/2, this.height/2);
			   
				if(this.progress<1/8) {
					ctx.lineTo(this.width/2, this.height/2);
					ctx.lineTo(this.width/2+this.width/2*8*this.progress,0);
				}
				else {
					ctx.lineTo(this.width,0);
					if(this.progress<3/8) ctx.lineTo(this.width,this.height*4*(this.progress-1/8));
					else {
						ctx.lineTo(this.width,this.height);
						if(this.progress<5/8)ctx.lineTo(this.width - this.width*4*(this.progress-3/8),this.height);
						else{
							ctx.lineTo(0,this.height);
							if(this.progress<7/8)ctx.lineTo(0,this.height - this.height*4*(this.progress-5/8));
							else{
								ctx.lineTo(0,0);
								ctx.lineTo(this.width*4*(this.progress-7/8),0);
							}
						}
					}
					ctx.lineTo(this.width/2,this.height/2);
				}
                ctx.fill();
                ctx.closePath();
				
                
				ctx.fillStyle = '#F00';
				ctx.font = "25px Times New Roman";
				var text = 1+((this.cdTime - this.progressTime)/1000)>>0;
				var measure = ctx.measureText(text).width;
				ctx.globalAlpha = 1;
				ctx.fillText(text,(this.width-measure)/2,(this.height+15)/2);
                
            }
			ctx.strokeStyle = '#0FF';
			ctx.lineWidth = 2;
			ctx.strokeRect(0,0,this.width,this.height);
        },
		progressTime:0,
		update: function (director, time) {            
            
            var self = this;
            if(this.isCooldown) {
               
			   
				this.progressTime = (time - this.timeStart);
                this.progress = this.progressTime / this.cdTime;
			
				
                if(this.progressTime >= this.cdTime) {
                    this.isCooldown = false;
                    this.isDone = true;
                }
            }
		
        }
		
    }
    extend(CAAT.CooldownActor, CAAT.Foundation.Actor);
})()