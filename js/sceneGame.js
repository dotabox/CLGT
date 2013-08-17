
(function () {
    CAAT.DEBUG_VIEWPORT = 1;
    CAAT.SceneGameCtn = function () {
        CAAT.SceneGameCtn.superclass.constructor.call(this);
        return this;
    };

	CAAT.SceneGameCtn.prototype = {
		create: function(director) {
			var self = this;

			this.setBounds(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
				.setFillStyle("#ccffcc");

			var bttSize = 100;
			var backImage = new CAAT.Foundation.SpriteImage().initialize(director.getImage('back'), 1, 1 );
			var backBtt = new CAAT.Button().initialize(director, backImage, 0, 0, 0, 0, function(button){
	            	director.switchToScene(0);
	            })
	        	.setLocation(0, 0)
	        	.setScaleAnchored(bttSize / backImage.singleWidth, bttSize / backImage.singleHeight, 0, 0);
	        this.addChild(backBtt);

			return this;
		}
	};
	extend(CAAT.SceneGameCtn, CAAT.Foundation.ActorContainer);
	 
})();