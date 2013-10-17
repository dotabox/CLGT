(function () {
    CAAT.DEBUG_VIEWPORT = 1;
    CAAT.TileMap = function () {
        CAAT.TileMap.superclass.constructor.call(this);
        return this;
    };

    CAAT.TileMap.prototype = {
        canvas: null,
        ctx: null,
		moveViewPortHorizontal:0,
		moveViewPortVertical:0,
        create: function (data, collisionData,battleContainer,isMinimap) {
			var self = this;
			this.battleContainer = battleContainer;
			this.director = battleContainer.director;
            this.tileSize = TILE_SIZE;
			this.layerNumber = data.length;
			this.data = [];
			for(var i=0;i<this.layerNumber;i++){
				this.data[i] = this.readString(data[i],"data");
			}
            this.viewportX = 0;
			this.viewportY = 0;
			this.viewportWidth = CANVAS_WIDTH/this.tileSize;
			this.viewportHeight = CANVAS_HEIGHT/this.tileSize;
			this.moveViewPortHorizontal = 0;
			this.moveViewPortVertical = 0;
			this.pointList = [];
			this.pointListTotal = [];
            this.canvas = document.getElementById('canvas');
			var collisionTemp = this.readString(collisionData);
			//console.log(collisionTemp);
			var outputCollision = [];
			for(var i=0;i<collisionTemp.length/2;i++){
				outputCollision[i] = [];
				for(var j=0;j<collisionTemp[0].length/2;j++){
					var tempCell = [
										collisionTemp[i*2][j*2],
										collisionTemp[i*2+1][j*2],
										collisionTemp[i*2][j*2+1],
										collisionTemp[i*2+1][j*2+1],
									];
					outputCollision[i][j] = this.readCell(tempCell);
				}
			}
			this.collisionData = outputCollision;
			this.mapHeight = collisionTemp.length;
            this.mapWidth = collisionTemp[0].length;
			console.log(this.mapHeight+" "+this.mapWidth);
			this.isMinimap = isMinimap;
			
			if(this.isMinimap) return this;
			
			// Phần tính đường đi ngắn nhất trong map
			var Point = function(x,y){
					this.x = x;
					this.y = y;
			}
			var gScore = [], fScore = [], cameFrom = [], pointList= [];
			var mapHeight = this.mapHeight;
			var mapWidth = this.mapWidth;
			var startPointNum = 0;
			for(var i=0;i<mapHeight;i++){
				for(var j=0;j<mapWidth;j++){
					if((collisionTemp[i][j]>=3)&&(collisionTemp[i][j]<=9)){
						startPointNum++;
					}
				}
			}
			this.gateNumber = startPointNum;
			for(var i=0;i<startPointNum;i++){
				gScore = [], fScore = [], cameFrom = [], pointList= [];
				this.pointList.push(findPath(collisionTemp,3+i));
			}
			for(var i=0;i<mapHeight;i++){
				for (var j=0;j<mapWidth;j++){
					if(collisionTemp[i][j]==2){
						this.pointListTotal.push(new Point(i,j));
					}
				}
			}
			function findPath(map,startIndex){
				var mapMatrix = [];
				var source, destination;
				for(var i=0;i<mapHeight;i++){
					var rowArray = [];
					for(var j=0;j<mapWidth;j++){
						switch(map[i][j]){
							case 0:
								rowArray.push(1);
								break;
							case 1:	
								rowArray.push(1);
								break;
							default:
								rowArray.push(0);
								break;
						}
						if(map[i][j]==startIndex){
							source = new Point(i,j);
							//console.log(source);
						}
						if(map[i][j]==10){
							destination = new Point(i,j);
							//console.log(destination);
						}
					}
					mapMatrix.push(rowArray);
				}
				for(var i=0;i<mapHeight;i++){
					var temp = new Array(mapWidth);
					gScore.push(temp);
				}
				for(var i=0;i<mapHeight;i++){
					var temp = new Array(mapWidth);
					fScore.push(temp);
				}
				for(var i=0;i<mapHeight;i++){
					var temp = new Array(mapWidth);
					cameFrom.push(temp);
				}
				havePath = aStar(source,destination,mapMatrix);
				if(havePath) return pointList;
			}
			
			function aStar(source,destination,matrix){
				//console.log(destination);
				var closeSet = [];
				var openSet = [source];
				var infinite = mapHeight*mapWidth;
				gScore[source.x][source.y] = 0;
				fScore[source.x][source.y] = gScore[source.x][source.y]+heuristicFunction(source,destination);
				while(openSet.length!=0){
					var current = openSet[0], minF = fScore[current.x][current.y];
					for(var i=1;i<openSet.length;i++){
						if((typeof minF == "undefined")||(fScore[openSet[i].x][openSet[i].y]<minF)){
							current = openSet[i];
							minF = fScore[current.x][current.y];
						}
					}
					if(minF>infinite){
						return false;
					}
					
					if((current.x == destination.x)&&(current.y==destination.y)){
						reconstructPath(cameFrom,destination);
						return true;
					}
					
					openSet.splice(indexOfPoint(openSet,current),1);
					closeSet.push(current);
					var neighbor = neighborPoints(current);
					for(var i=0;i<neighbor.length;i++){
						if(indexOfPoint(closeSet,neighbor[i])==-1){
							var distance = 1;
							if(matrix[neighbor[i].x][neighbor[i].y]==1) distance = infinite;
							temp_gScore = gScore[current.x][current.y]+distance;
							if((typeof gScore[neighbor[i].x][neighbor[i].y] =="undefined")||(indexOfPoint(openSet,neighbor[i])==-1)||(temp_gScore <= gScore[neighbor[i].x][neighbor[i].y])){
								cameFrom[neighbor[i].x][neighbor[i].y] = current;
								gScore[neighbor[i].x][neighbor[i].y] = temp_gScore;
								fScore[neighbor[i].x][neighbor[i].y] = temp_gScore + heuristicFunction(neighbor[i],destination);
								if(indexOfPoint(openSet,neighbor[i])==-1){
									openSet.push(neighbor[i]);
								}
							}	
						}
					}
					
				}
				return false;
			}
			function neighborPoints(current){
				var outputPoints = [];
				var x = current.x, y = current.y;
				if(x>0){
					outputPoints.push(new Point(x-1,y));
				}
				if(x<mapHeight-1){
					outputPoints.push(new Point(x+1,y));	
				}
				if(y>0){
					outputPoints.push(new Point(x,y-1));
				}
				if(y<mapWidth-1){
					outputPoints.push(new Point(x,y+1));	
				}
				return outputPoints;
			}
			function reconstructPath(cameFrom,current){
				if(typeof current!="undefined"){
					pointList.unshift(current);
					reconstructPath(cameFrom,cameFrom[current.x][current.y])
				}
			}
			function heuristicFunction(current,destination){
				return Math.sqrt(Math.pow(current.x-destination.x,2)+Math.pow(current.y-destination.y,2));
			}
			function indexOfPoint(array,point){
				for(var i=0;i<array.length;i++){
					if((array[i].x==point.x)&&(array[i].y==point.y)){
						return i;
					}
				}
				return -1;
			}
			// Phần tính và đưa ra dữ liệu khoảng cách giữa các ô
			
			this.distanceData = [];
			this.mapHeightCollision = this.mapHeight/2;
			this.mapWidthCollision = this.mapWidth/2;
			var totalCell = this.mapHeightCollision * this.mapWidthCollision ;
			var Cell=function(id,x,y){
				this.id=id;		
				this.x=x;
				this.y=y;
				this.queue=[];
				this.currentMonster = [];
				this.currentTower;
				this.bonusDmg=[];
				this.bonusSpeed=[];
			}
			for (var i=0;i<this.mapHeightCollision;i++){
				for (var j=0;j<this.mapWidthCollision;j++){
					this.distanceData.push(
						new Cell(i*self.mapWidthCollision+j,
							i*this.tileSize + this.tileSize/2,
							j*this.tileSize + this.tileSize/2)
						);
				}		
			}
			for (var i=0;i<totalCell;i++){
				for (var j=0;j<totalCell;j++){
					D= getDistance(this.distanceData[i],this.distanceData[j]);
					Queue={"ID":this.distanceData[j].id,"distance":D};
					this.distanceData[i].queue.push(Queue);
				}
			}
			var sortO = [];
			var sortR = [];
			var sortS = [];
			for (var i=0;i<totalCell;i++){
				var maxR = 0;
				for (var j=0; j<totalCell; j++){
					sortO[j] = this.distanceData[i].queue[j].ID;
					sortR[j] = this.distanceData[i].queue[j].distance >> 0;
					if(maxR < sortR[j]) maxR = sortR[j];
				}
				for(var j=0; j <= maxR; j++) {
					sortS[j] = [];
				}
				for(var j=0; j < totalCell; j++) {
					sortS[sortR[j]].push(sortO[j]);
				}
				this.distanceData[i].queue = [];
				for(var j=0; j <= maxR; j++) {
					if(sortS[j].length > 0) {
						for(var k=0; k<sortS[j].length; k++) {
							ID=sortS[j][k];
							y=ID%this.mapWidthCollision;
							x=(ID-ID%this.mapWidthCollision)/this.mapWidthCollision>>0;
							if (this.collisionData[x])Type=this.collisionData[x][y];//Dung de check nhung o tru ban dc
							Queue={"ID":sortS[j][k],"distance":j,"type":Type};
							this.distanceData[i].queue.push(Queue);
						}
					}
				}
			}
			function getDistance(cell1,cell2) {
				var dx = Math.pow((cell1.x - cell2.x),2);
				var dy = Math.pow((cell1.y - cell2.y),2);
				return Math.sqrt(dx + dy);
			}
			//*/
			//console.log(this.distanceData);
            return this;
        },
		
		index:0,
		painted: false,
		update: function(director, time){
		},
		firstPaint: true,
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
			//}
			if(time<1){
				///*
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
				//*/
			}
			else if(this.firstPaint){
				this.firstPaint = false;
				this.cacheAsBitmap(0,CAAT.Foundation.Actor.CACHE_DEEP);
			}
			//*/
        },
		readString: function(dataString,type){
			if(dataString[0]=="#") dataString = dataString.substr(1);
			var splitData = dataString.split("#");
			var width = splitData[0]<<0;
			var index = 1;
			var lineIndex = 0;
			var mapData = [];
			var tempArray = [];
			for(index; index<splitData.length;index++) {
				
				if(lineIndex >= width) {
					mapData.push(tempArray);
					tempArray = [];
					lineIndex=0;
				}
				lineIndex++;
				var temp = splitData[index];
				if(type=="data"){
					var tile = temp.substr(0,2)>>0;
					var value = temp.substr(2)>>0;
					tempArray.push([tile,value]);
				}
				else tempArray.push(temp<<0);
			}
			mapData.push(tempArray);
			return mapData;
		},
		readCell: function(cellArray){
			for(var i=0;i<cellArray.length;i++){
				if(cellArray[i]==0)	return 0;
				//if((cellArray[i]==1)&&(i==cellArray.length-1)) return 1;
				if(cellArray[i]>=2) return 2;
			}
			return 1;
		}
    };
    extend(CAAT.TileMap, CAAT.Foundation.Actor);
})();
