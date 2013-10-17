var CANVAS_WIDTH = 800, CANVAS_HEIGHT=600;

(function(window) {

	var namespace = window.BKGMDapGiac;

	//var onloadFunctionList = [
		//namespace.loadCanvas,
	var run = namespace.main;
	//];

	window.onload = function() {

		var loadedImage = 0;
		var loadedPercent = 0;
		var loadAudios,loadImages;

	    windowLoad();

		function windowLoad(){

			var canvas = document.getElementById("canvas");
			var context = canvas.getContext("2d");
			var drawIntervalID = setInterval(paint, 24);
			var startTime = +new Date();
			var currentIndex = 0;

			function paint(){
				
				context.fillStyle = "#0F0";
				context.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
				context.fillStyle = "#0FF";
				context.font = "30px Times New Roman";
				context.strokeRect(300,200,200,20);
				context.fillRect(300,200,200*loadedPercent/100,20)
				context.fillText(loadedPercent+"%",300,190);
				
				if(loadImages&&(+new Date() - startTime>1000)) {
					clearInterval(drawIntervalID);
					run(loadImages);
				}
			}

			load();

		}

	    function load() {
			// var audioElement = new CAAT.AudioPreloader().__init().
			// 	addElement("thunder1", "sound/sfx/thunder1.ogg");
				
	        var imageElement = new CAAT.Module.Preloader.Preloader().
	            addElement("assets", "images/p1_walk.png").
	            addElement("hammer", "images/hammer.png");
				
			// audioElement.load (
			// 	function loadAll(audios){
			// 		loadAudios = audios;
					imageElement.load(function onAllAssetsLoaded(images) {
						loadImages = images;
		            	}, function onEachLoad(index){
							loadedImage++;
							var length = imageElement.elements.length;
							loadedPercent = Math.round(loadedImage/length*100);
						}
					);
			// 	},
			// 	function loadEach(audio){
				
			// 	}
			// );
		};
	}


})(window);