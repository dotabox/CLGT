
(function () {
    CAAT.DEBUG_VIEWPORT = 1;
    CAAT.MapData = function () {
        return this;
    };

    var self;
	CAAT.MapData.prototype = {
		create: function() {
			self = this;
			self.isLock = true;
			self.lastScore = 0;
			self.highScore = 0;
			self.star = 0;
			self.numberOfPlay = 0; // So lan choi
			return self;
		}
	};
	 
})();

(function () {
    CAAT.DEBUG_VIEWPORT = 1;
    CAAT.GameHistory = function () {
        return this;
    };

    var self;
	CAAT.GameHistory.prototype = {
		create: function() {
			self = this;
			self.historyMaps = [];
			self.totalArea = 6;
			self.normalMapNumber = 4;
			self.coLoaMapNumber = 6;

			for(var i=0; i < self.totalArea; i++) {
				self.historyMaps[i] = [];
				if(i == self.totalArea - 1) {
					for(var j=0; j < self.coLoaMapNumber; j++) {
						self.historyMaps[i][j] = new CAAT.MapData();
						self.historyMaps[i][j].create();
					}
				}
				else {
					for(var j=0; j < self.normalMapNumber; j++) {
						self.historyMaps[i][j] = new CAAT.MapData();
						self.historyMaps[i][j].create();
					}
				}
			}
			return self;
		}
	};
	 
})();