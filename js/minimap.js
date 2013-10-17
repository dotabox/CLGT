(function () {
    CAAT.DEBUG_VIEWPORT = 1;
    CAAT.MiniMap = function () {
        CAAT.MiniMap.superclass.constructor.call(this);
        return this;
    };

    CAAT.MiniMap.prototype = {
        canvas: null,
        ctx: null,
        create: function (data, battleContainer,isMinimap) {
			var self = this;
			this.battleContainer = battleContainer;
			this.director = battleContainer.director;
            this.tileSize = TILE_SIZE;
            this.data = data;
            this.mapHeight = this.data[0].length;
            this.mapWidth = this.data[0][0].length;
			this.layerNumber = data.length;
            this.viewportX = 0;
			this.viewportY = 0;
			this.viewportWidth = CANVAS_WIDTH/this.tileSize;
			this.viewportHeight = CANVAS_HEIGHT/this.tileSize;
            this.canvas = document.getElementById('canvas');
			this.isMinimap = isMinimap;
            //this.ctx = this.canvas.getContext('2d'); 	
            return this;
		},
		
		index:0,
		painted: false,
		update: function(director, time){
		},
		firstPaint: true,
		firstTime: true,
        paint: function (director, time) {
            CAAT.MiniMap.superclass.paint.call(this, director, time);
			
			var ctx = director.ctx;
			var self = this;
			
			var viewportX = Math.floor(-this.battleContainer.mapBound.x/TILE_SIZE);
			var viewportY = Math.floor(-this.battleContainer.mapBound.y/TILE_SIZE);
            var startCol = 0;
            var startRow = 0;
			if(viewportX>=0) startCol = viewportX;
			if(viewportY>=0) startRow = viewportY;
            var col = this.viewportWidth;
            var row = this.viewportHeight;
			//ctx.drawImage(this.tileImage,0,0);
			///*
			var rectX,rectY,rectWidth,rectHeight;
			
			
			rectX = startCol*TILE_SIZE;
			rectY = startRow*TILE_SIZE;
			rectWidth = col*TILE_SIZE;
			rectHeight = row*TILE_SIZE;
			startRow = 0;
			startCol = 0;
			row = this.mapHeight;
			col = this.mapWidth;
			
			
			ctx.save();
			//ctx.translate(0,this.battleContainer.miniMapSize-CANVAS_HEIGHT);  // Ko hiểu tại sao minimap bị tụt xuống dưới :v
			if(this.firstTime){
				this.firstTime = false;
				this.startTime = time;
			}
			if(time<this.startTime+1){
				var data = this.data;
				for(var layerIndex = 0;layerIndex<this.layerNumber;layerIndex++){
					var mapData = data[layerIndex];
					for(var i=0;i<mapData.length;i++){
						for (var j=0;j<mapData[i].length;j++){
							var tileSet = this.director.getImage("tile"+(mapData[i][j][0]+1));
							var tileImages = new CAAT.SpriteImage().initialize(tileSet, tileSet.height / TILE_SIZE_FOR_DRAWING, tileSet.width / TILE_SIZE_FOR_DRAWING);
							tileImages.paintTile(ctx,mapData[i][j][1],j*TILE_SIZE_FOR_DRAWING,i*TILE_SIZE_FOR_DRAWING);
						}
					}
				}
				
				ctx.strokeStyle = "#0FF";
				ctx.lineWidth = 10;
				ctx.strokeRect(10,10,this.width-20,this.height-20);
			}
			else if(this.firstPaint){
				this.firstPaint = false;
				this.cacheAsBitmap(this.startTime,CAAT.Foundation.Actor.CACHE_DEEP);
			}
			
			
			if(time>1){
				ctx.restore();
				var monsterArray = this.battleContainer.monsterArray;
				var selected,selectedType;
				for(var i=0;i<monsterArray.length;i++){
					if(!monsterArray[i].isDead){
						if(monsterArray[i].currentPoint!=0){
							ctx.fillStyle = "#F00";
							if(monsterArray[i].selected) {
								selectedType = 1;
								selected = i;
							}
							ctx.fillRect(monsterArray[i].x,monsterArray[i].y,20,20);
						}
					}
				}
				var towerArray = this.battleContainer.towerArray;
				for(var i=0;i<towerArray.length;i++){
					if(towerArray[i].isUltimateTower) continue;
					ctx.fillStyle = "#0F0";
					if(towerArray[i].selected) {
						selectedType = 0;
						selected = i;
					}
					ctx.fillRect(towerArray[i].x,towerArray[i].y,25,25);
				}
				if(typeof selected!= "undefined"){
					ctx.fillStyle = "#FFF";
					if(selectedType == 0) ctx.fillRect(towerArray[selected].x,towerArray[selected].y,25,25);
					else ctx.fillRect(monsterArray[selected].x,monsterArray[selected].y,20,20);
				}
				ctx.strokeStyle = "#FFF";
				ctx.lineWidth = 2;
				ctx.strokeRect(rectX+2,rectY+2,rectWidth-4,rectHeight-4); //Đoạn này em đ' hiểu tại sao phải thêm mấy số kia vào
				
			}
			
			
			//*/
        },
    };
    extend(CAAT.MiniMap, CAAT.Foundation.Actor);
})();
