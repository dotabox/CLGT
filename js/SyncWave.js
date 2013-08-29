(function () {
    CAAT.SyncWave = function () {
        return (this);
    }
    CAAT.SyncWave.prototype = {
		// id: id của map, level: level người chơi, num_gate: số điểm xuất phát, arr_mon: tổng số quái mỗi wave
        init: function (director, battleContainer, id, level, num_gate, arr_mon) {

            this.id = id;
            this.level = level;
            this.director = director;
            this.battleContainer = battleContainer;
            this.num_gate = num_gate;
            this.arr_mon = arr_mon;
			
            return this;
        },
        create: function () {
			data.Map[this.id].Wave=[];
			var waveNumber = data.Map[this.id].WaveNumber;
			var wavePoint = data.Map[this.id].WavePoint.concat();
			var wave = [];
			for (i=0;i<waveNumber;i++){
				var tempArray = [];
				wave.push(tempArray);
				while (wavePoint[i]>0){
					var randomNum = (i<2)?this.random(2):this.random(3);
					var randomMonster;
					var monsterNumber = 0;
					switch(randomNum){
						case 2:
							monsterNumber = 1;
							randomMonster = this.random(5)*3+2;
							break;
						case 1:
							monsterNumber = 2;
							randomMonster = this.random(5)*3+1;
							break;
						default:
							monsterNumber = 6;
							randomMonster = this.random(5)*3;
							break;
					}
					wavePoint[i] -= 6;
					var a1=[randomMonster,monsterNumber,this.random(this.num_gate)];
					wave[i].push(a1);
				}
			}
			data.Map[this.id].Wave=wave;
        },
		random: function (x) {
			number=this.battleContainer.random()*x>>0;
			if(number== x) number = 0;
			return number;
		}
    }
    
})();
