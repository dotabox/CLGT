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
            var wave=[[],[],[],[],[],[],[],[]];
			data.Map[this.id].Wave=[];
			var a = [6, 9, 12, 0, 3];
			for (i=0;i<8;i++){
				var n=this.arr_mon[i];
				while (n>0){
					var m=this.random(this.arr_mon[i]/3)>>0;
					if (n<m)
						m=n;
					var a1=[a[this.randomMon(5)],m,this.random(this.num_gate)];
					wave[i].push(a1);
					n-=m;						
				}
			}
			console.log(wave);
			data.Map[this.id].Wave=wave;
        },
		random: function (x) {
		 number=this.battleContainer.random()*x>>0;
			return number;
		},
		randomMon: function (x) {
		 number=this.battleContainer.random()*x>>0;
		 if (number==5)number=0;
			return number;
		}
    }
    
})();
