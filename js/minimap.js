(function () {
    CAAT.DEBUG_VIEWPORT = 1;
    CAAT.MiniMap = function () {
        CAAT.TileMap.superclass.constructor.call(this);
        return this;
    };

    CAAT.MiniMap.prototype = {
        canvas: null,
        ctx: null,
        name: '',
        create: function (name, tileImage, data, battleContainer,isMinimap) {
			var self = this;
			this.battleContainer = battleContainer;
            this.tileSize = TILE_SIZE;
			this.tileImage = tileImage;
            this.tileImages = new CAAT.SpriteImage().initialize(tileImage, tileImage.height / TILE_SIZE_FOR_DRAWING, tileImage.width / TILE_SIZE_FOR_DRAWING);
            this.name = name;
            this.data = data;
            this.mapHeight = this.data.length;
            this.mapWidth = this.data[0].length;
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
            CAAT.TileMap.superclass.paint.call(this, director, time);
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
			
			
			rectX = startCol*TILE_SIZE_FOR_DRAWING;
			rectY = startRow*TILE_SIZE_FOR_DRAWING;
			rectWidth = col*TILE_SIZE_FOR_DRAWING;
			rectHeight = row*TILE_SIZE_FOR_DRAWING;
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
				for (var i = startRow; i <= startRow+row+1; i++) {
					for (var j = startCol; j <= startCol+col+1; j++) {
						if (j >= this.mapWidth || i >= this.mapHeight) continue;
						if (this.data[i][j] != -1) {
							this.tileImages.paintTile(ctx, 0, (j) * TILE_SIZE_FOR_DRAWING, (i) * TILE_SIZE_FOR_DRAWING); 
							this.tileImages.paintTile(ctx, this.data[i][j], (j) * TILE_SIZE_FOR_DRAWING, (i) * TILE_SIZE_FOR_DRAWING); 
							/*
							this.tileImages.paintTile(ctx, this.data[i][j], (j) * TILE_SIZE, (i) * TILE_SIZE); 
							this.tileImages.paintTile(ctx, this.data[i][j], (j) * TILE_SIZE+TILE_SIZE_FOR_DRAWING, (i) * TILE_SIZE); 
							this.tileImages.paintTile(ctx, this.data[i][j], (j) * TILE_SIZE, (i) * TILE_SIZE+TILE_SIZE_FOR_DRAWING); 
							this.tileImages.paintTile(ctx, this.data[i][j], (j) * TILE_SIZE+TILE_SIZE_FOR_DRAWING, (i) * TILE_SIZE+TILE_SIZE_FOR_DRAWING); 
							//*/
						}
					}
				}
				
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
							ctx.fillRect(monsterArray[i].x*TILE_SIZE_FOR_DRAWING/TILE_SIZE,monsterArray[i].y*TILE_SIZE_FOR_DRAWING/TILE_SIZE,20,20);
						}
					}
				}
				var towerArray = this.battleContainer.towerArray;
				for(var i=0;i<towerArray.length;i++){
					ctx.fillStyle = "#0F0";
					if(towerArray[i].selected) {
						selectedType = 0;
						selected = i;
					}
					ctx.fillRect(towerArray[i].x*TILE_SIZE_FOR_DRAWING/TILE_SIZE,towerArray[i].y*TILE_SIZE_FOR_DRAWING/TILE_SIZE,25,25);
				}
				if(typeof selected!= "undefined"){
					ctx.fillStyle = "#FFF";
					if(selectedType == 0) ctx.fillRect(towerArray[selected].x*TILE_SIZE_FOR_DRAWING/TILE_SIZE,towerArray[selected].y*TILE_SIZE_FOR_DRAWING/TILE_SIZE,25,25);
					else ctx.fillRect(monsterArray[selected].x*TILE_SIZE_FOR_DRAWING/TILE_SIZE,monsterArray[selected].y*TILE_SIZE_FOR_DRAWING/TILE_SIZE,20,20);
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
