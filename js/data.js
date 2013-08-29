﻿data={
	Map:[{
		WaveNumber: 8,
		Wave:[//quái có id 0: số lượng 3 con, đi vào từ cổng 0 (map hiện tại có 2 cổng)
				
			],
		WavePoint: [5,10,15,20,30,40,50,60],
		Life: 50,
		Gold: 300,
		Level:0,
		Tile:"tile1",
		Data:[
				 [12,12,12,8,12,12,12,12,12,12,12,12,12],
				 [12,8,8,8,12,12,12,12,12,12,12,12,12],
				 [12,8,0,0,0,0,0,0,0,12,12,12,12], 
				 [12,8,8,8,8,8,0,0,0,12,12,12,12], 
				 [12,0,0,0,0,8,0,0,0,12,12,12,12],
				 [12,0,0,0,0,8,8,8,0,12,12,12,12],
				 [12,0,0,0,0,0,0,8,0,12,12,12,12],
				 [12,0,0,8,8,8,8,8,0,12,12,12,12], 
				 [12,0,0,8,0,0,0,0,0,12,12,12,12], 
				 [12,12,12,8,12,12,12,12,12,12,12,12,12]
			 ],
			// mảng data, map 1 dùng data[0], map 2 dùng data[1], ....
		Cdata:[ //0 là cản, 1 là chỗ có thể đặt trụ, 2 là đường đi,  3-9 là điểm xuất phát, 10 là đích
				 [0 ,0 ,0 ,3 ,0 ,0 ,0 ,0 ,0 ,0,0,0,0],
				 [0 ,2 ,2 ,2 ,0 ,0 ,0 ,0 ,0 ,0,0,0,0],
				 [0 ,2 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,0,0,0,0], 
				 [0 ,2 ,2 ,2 ,2 ,2 ,1 ,1 ,1 ,0,0,0,0], 
				 [0 ,1 ,1 ,1 ,1 ,2 ,1 ,1 ,1 ,0,0,0,0],
				 [0 ,1 ,1 ,1 ,1 ,2 ,2 ,2 ,1 ,0,0,0,0],
				 [0 ,1 ,1 ,1 ,1 ,1 ,1 ,2 ,1 ,0,0,0,0],
				 [0 ,1 ,1 ,2 ,2 ,2 ,2 ,2 ,1 ,0,0,0,0], 
				 [0 ,1 ,1 ,2 ,1 ,1 ,1 ,1 ,1 ,0,0,0,0], 
				 [0 ,0 ,0 ,10 ,0 ,0 ,0 ,0 ,0 ,0,0,0,0],
			]
	},{
		WaveNumber: 4,//quái có id 0: số lượng 3 con, đi vào từ cổng 0 (map hiện tại có 2 cổng)
		Wave:[
			],
		WavePoint: [5,10,15,20,30,40,50,60],
		Life: 20,
		Gold: 300,
		Level:0,
		Tile:"tile1",
		Data:[
				[12, 12, 12, 8, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 8, 12, 12, 12, 12], 
				[12, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 8, 0, 0, 0, 12], 
				[12, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 8, 0, 0, 0, 12], 
				[12, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12, 8, 0, 0, 0, 12], 
				[12, 0, 0, 8, 0, 0, 0, 0, 0, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 12], 
				[12, 0, 0, 8, 0, 0, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 0, 0, 12],
				[12, 0, 0, 8, 8, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 12], 
				[12, 0, 0, 0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 8, 8, 8, 0, 0, 0, 8, 0, 0, 12], 
				[12, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 8, 8, 0, 8, 8, 0, 0, 8, 0, 0, 12],
				[12, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 8, 0, 0, 8, 0, 0, 12], 
				[12, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 8, 8, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 8, 0, 0, 8, 0, 0, 12], 
				[12, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 8, 8, 0, 0, 0, 8, 0, 0, 8, 0, 0, 12], 
				[12, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 8, 8, 0, 0, 0, 0, 8, 0, 0, 8, 0, 0, 12], 
				[12, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 8, 8, 0, 0, 8, 0, 0, 12], 
				[12, 0, 0, 0, 0, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 8, 8, 0, 0, 12], 
				[12, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 8, 0, 0, 0, 12], 
				[12, 0, 0, 0, 0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 8, 8, 8, 8, 0, 0, 0, 12], 
				[12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12], 
				[12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 12], 
				[12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 8, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12]
			],
			// mảng data, map 1 dùng data[0], map 2 dùng data[1], ....
		Cdata:[ //0 là cản, 1 là chỗ có thể đặt trụ, 2 là đường đi,  3-9 là điểm xuất phát, 10 là đích
				[0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0], 
				[0, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 1, 1, 1, 0], 
				[0, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 1, 1, 1, 0], 
				[0, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 1, 1, 1, 0], 
				[0, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0], 
				[0, 1, 1, 2, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0],
				[0, 1, 1, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 0], 
				[0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 1, 1, 0], 
				[0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 1, 1, 2, 1, 1, 0],
				[0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 0], 
				[0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 0], 
				[0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 0], 
				[0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 0], 
				[0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 2, 1, 1, 0], 
				[0, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 1, 1, 0], 
				[0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 0], 
				[0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 0], 
				[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], 
				[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0], 
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
	}
	],
	Effect:[{
		ID:0,
		Name:["Làm chậm","Slow"],
		Info:[1,0.2],
		Hint:["Giảm tốc độ di chuyển",""]
		},
		{
		ID:25,
		Name:["Bắn lan","AOE"],
		Info:{},
		Hint:["Bắn lan",""]
		}
	],
	CombineTower: [
        [0], [1], [2], [3], [4],
        [0,0],[0,1],[0,2],[0,3],[0,4],[1,1],[1,2],[1,3],[1,4],[2,2],[2,3],[2,4],[3,3],[3,4],[4,4]
    ],
	UserSkill:[
		{
			ID:0,
			Icon: "skillFire",
			Range: 2.5,
			Name:lang.data.UserSkill.ID0,
			Description:lang.description.UserSkill.ID0,
			AnimationType: "AOE",
			Damage: 500,
			EffectID:[1],
			InfoEff:[[70,100,5000]],
			CoolDown: 10000,
			Animation: {
				File: "skillAnimation1",
				x: 5,
				y: 4,
				Data: 
				[
					[],
					[[14,-70,-45,15,15,0,0,100]],
					[[14,-73,-48,23,23,0,0,100]],
					[[14,-78,-55,35,35,0,0,100]],
					[[14,-76,-53,31,31,0,0,100]],
					[[14,-83,-60,45,45,0,0,100]],
					[[14,-86,-63,50,50,0,0,100]],
					[[14,-89,-67,58,58,0,0,100]],
					[[14,-91,-69,62,62,0,0,100]],
					[[14,-96,-73,71,71,0,0,100]],
					[[14,24,-38,43,43,0,0,100],[5,-96,-73,71,71,0,0,100]],
					[[14,21,-41,49,49,0,0,100],[6,-98,-78,77,77,0,0,100]],
					[[7,-98,-78,77,77,0,0,100],[14,18,-44,55,55,0,0,100]],
					[[8,-98,-78,77,77,0,0,100],[14,15,-48,64,64,0,0,100],[11,-111,-53,64,64,0,0,100]],
					[[14,15,-48,64,64,0,0,100],[9,-98,-78,77,77,0,0,100],[12,-111,-53,64,64,0,0,100]],
					[[14,10,-52,73,73,0,0,100],[8,-98,-78,77,77,0,0,100],[13,-111,-53,64,64,0,0,100],[11,-44,-61,64,64,0,0,100]],
					[[9,-98,-78,77,77,0,0,100],[12,-111,-53,64,64,0,0,100],[11,-44,-61,64,64,0,0,100],[12,-106,-101,64,64,0,0,100],[12,-35,-108,64,64,0,0,100],[5,10,-52,73,73,0,0,100]],
					[[8,-98,-78,77,77,0,0,100],[12,-111,-53,64,64,0,0,100],[14,-57,17,53,53,0,0,100],[6,10,-51,72,72,0,0,100],[12,-106,-101,64,64,0,0,100],[13,-35,-108,64,64,0,0,100],[11,-45,-61,64,64,0,0,100]],
					[[14,-60,13,60,60,0,0,100],[9,-98,-78,77,77,0,0,100],[11,-106,-101,64,64,0,0,100],[12,-44,-61,64,64,0,0,100],[7,9,-54,76,76,0,0,100],[11,-111,-53,64,64,0,0,100],[13,-35,-108,64,64,0,0,100]],
					[[14,-60,13,60,60,0,0,100],[9,-98,-78,80,80,0,0,100],[13,-35,-108,67,67,0,0,100],[12,-44,-61,67,67,0,0,100],[12,-106,-101,64,64,0,0,100],[11,-111,-50,64,64,0,0,100],[10,-79,-20,64,64,0,0,100],[9,9,-54,76,76,0,0,100]],
					[[9,-92,-76,68,68,0,0,100],[12,-112,-60,67,67,0,0,100],[11,-107,-106,65,65,0,0,100],[13,-37,-112,66,66,0,0,100],[12,-41,-59,67,67,0,0,100],[8,7,-58,78,78,0,0,100],[5,-56,14,55,55,0,0,100]],
					[[9,-87,-72,56,56,0,0,100],[12,-107,-56,60,60,0,0,100],[11,-106,-107,74,74,0,0,100],[13,-32,-108,54,54,0,0,100],[12,-36,-55,55,55,0,0,100],[5,-55,12,56,56,0,0,100],[11,60,-32,53,53,0,0,100],[13,-1,-90,54,54,0,0,100],[9,7,-58,78,78,0,0,100],[11,-90,6,43,43,0,0,100],[12,-1,-14,38,38,0,0,100],[12,45,19,40,40,0,0,100],[7,0,19,45,45,350,0,100],[5,-103,6,40,40,0,0,100]],
					[[9,-84,-72,52,52,355,0,100],[12,-104,-55,56,56,320,0,100],[11,-103,-107,78,78,0,0,100],[13,-29,-108,51,51,320,0,100],[12,-33,-55,51,51,275,0,100],[8,7,-58,78,78,0,0,100],[11,68,-28,49,49,0,0,100],[13,2,-90,50,50,305,0,100],[7,-54,13,55,55,0,0,100],[12,-77,21,39,39,0,0,100],[9,0,18,39,39,0,0,100],[11,-93,-7,52,52,0,0,100],[12,27,5,48,48,0,0,100],[13,-36,-24,43,43,0,0,100]],
					[[9,-84,-72,53,53,0,0,100],[12,-104,-56,57,57,0,0,100],[11,-103,-107,71,71,0,0,100],[13,-29,-108,51,51,0,0,100],[12,-33,-55,52,52,0,0,100],[11,67,-23,42,42,0,0,100],[13,2,-90,51,51,0,0,100],[7,-55,13,55,55,0,0,100],[12,-77,21,40,40,0,0,100],[9,7,-58,78,78,0,0,100],[9,-91,0,39,39,0,0,100],[11,-39,-25,41,41,0,0,100],[11,-9,17,35,35,0,0,100],[11,19,1,46,46,0,0,100]],
					[[12,-104,-56,57,57,0,0,100],[12,-33,-55,52,52,0,0,100],[11,67,-23,42,42,0,0,100],[13,2,-90,51,51,0,0,100],[12,-77,21,40,40,0,0,100],[8,-84,-71,52,52,0,0,100],[7,7,-57,77,77,0,0,100],[8,-55,13,55,55,0,0,100]],
					[[9,-81,-68,46,46,0,0,100],[11,67,-23,42,42,0,0,100],[13,2,-90,51,51,0,0,100],[7,-51,15,48,48,0,0,100],[12,-77,21,40,40,0,0,100],[8,10,-54,71,71,0,0,100]],
					[[12,-77,21,40,40,0,0,100],[9,14,-47,59,59,0,0,100],[8,-73,-65,36,36,0,0,100],[6,-46,21,36,36,0,0,100]],
					[[7,-55,13,55,55,0,0,100],[9,7,-58,78,78,0,0,100]],
					[[7,-50,20,40,40,0,0,100],[8,12,-51,64,64,0,0,100]],
					[[5,-41,25,28,28,0,0,100],[6,20,-40,44,44,0,0,100]],
					[[8,26,-33,29,29,0,0,100]],
					[]
				]
			}
		},
		{
			ID:1,
			Icon: "skillThunder",
			Range: 3.5,
			Name:lang.data.UserSkill.ID1,
			Description:lang.description.UserSkill.ID1,
			AnimationType: "Target",
			TargetNumber: 10,
			Duration : 5000,
			Damage: 500,
			EffectID:[7],
			InfoEff:[[100,10]],
			CoolDown: 15000,
			Animation: {
				File: "skillAnimation2",
				x: 5,
				y: 5,
				Data:
				[
					[
						[],
						[[5,-48,-48,96,96,0,0,100]],
						[[4,-48,-48,96,96,0,0,100]],
						[[4,-48,-48,96,96,0,0,100],[16,-46,-26,96,96,0,0,100]],
						[[17,-46,-26,96,96,0,0,100],[5,-48,-48,96,96,0,0,100]],
						[[4,-48,-48,96,96,0,0,100],[18,-46,-26,96,96,0,0,100]],
						[[19,-46,-26,96,96,0,0,100],[2,-48,-48,96,96,0,0,100]],
						[[4,-48,-48,96,96,0,0,100],[20,-46,-26,96,96,0,0,100]],
						[[4,-48,-48,96,96,0,0,100],[16,-46,-26,96,96,0,0,100]]
					],
					[
						[],
						[[10,-36,-48,96,96,0,0,100]],
						[[9,-36,-48,96,96,0,0,100]],
						[[16,-48,-26,96,96,0,0,100],[9,-36,-48,96,96,0,0,100]],
						[[17,-46,-26,96,96,0,0,100],[8,-36,-48,96,96,0,0,100]],
						[[18,-46,-26,96,96,0,0,100],[8,-36,-48,96,96,0,0,100]],
						[[19,-46,-26,96,96,0,0,100],[7,-36,-48,96,96,0,0,100]],
						[[20,-46,-26,96,96,0,0,100],[7,-36,-48,96,96,0,0,100]],
						[[16,-46,-26,96,96,0,0,100],[6,-36,-48,96,96,0,0,100]]
					],
					[
						[],
						[[10,-59,-48,96,96,0,2,100]],
						[[9,-59,-48,96,96,0,2,100]],
						[[16,-48,-26,96,96,0,0,100],[9,-59,-48,96,96,0,2,100]],
						[[17,-46,-26,96,96,0,0,100],[8,-59,-48,96,96,0,2,100]],
						[[18,-46,-26,96,96,0,0,100],[8,-59,-48,96,96,0,2,100]],
						[[19,-46,-26,96,96,0,0,100],[7,-59,-48,96,96,0,2,100]],
						[[20,-46,-26,96,96,0,0,100],[7,-59,-48,96,96,0,2,100]],
						[[16,-46,-26,96,96,0,0,100],[6,-59,-48,96,96,0,2,100]]
					]
				]
			}	
			
		},
		{
			ID:2,
			Icon: "skillIce",
			Range: 2.5,
			Name:lang.data.UserSkill.ID2,
			Description:lang.description.UserSkill.ID2,
			AnimationType: "AOE",
			Damage: 700,
			EffectID:[6],
			InfoEff:[[100,0.5,2000,5000]],
			CoolDown: 12000,
			Animation: {
				File: "skillAnimation3",
				x: 5,
				y: 5,
				Data: 
				[
					[],
					[[1,-33,36,64,64,0,0,100]],
					[[2,-33,36,64,64,0,0,100]],
					[[3,-33,36,64,64,0,0,100]],
					[[4,-33,36,64,64,0,0,100]],
					[[5,-33,36,64,64,0,0,100],[1,-96,2,48,48,0,0,100]],
					[[6,-33,36,64,64,0,0,100],[2,-96,2,48,48,0,0,100]],
					[[7,-33,36,64,64,0,0,100],[3,-96,2,48,48,0,0,100]],
					[[8,-33,36,64,64,0,0,100],[4,-96,2,48,48,0,0,100]],
					[[5,-96,2,48,48,0,0,100],[9,-33,36,64,64,0,0,100]],
					[[10,-33,36,64,64,0,0,100],[6,-96,2,48,48,0,0,100]],
					[[11,-33,36,64,64,0,0,100],[7,-96,2,48,48,0,0,100],[1,-125,-62,82,82,0,0,100]],
					[[12,-33,36,64,64,0,0,100],[8,-96,2,48,48,0,0,100],[3,-125,-62,82,82,0,0,100]],
					[[13,-33,36,64,64,0,0,100],[9,-96,2,48,48,0,0,100],[1,32,-35,64,64,0,0,100],[5,-125,-62,82,82,0,0,100]],
					[[14,-33,36,64,64,0,0,100],[10,-96,2,48,48,0,0,100],[7,-125,-62,82,82,0,0,100],[3,32,-35,64,64,0,0,100]],
					[[15,-33,36,64,64,0,0,100],[11,-96,2,48,48,0,0,100],[5,32,-35,64,64,0,0,100],[9,-125,-62,82,82,0,0,100]],
					[[16,-33,36,64,64,0,0,100],[12,-96,2,48,48,0,0,100],[11,-125,-62,82,82,0,0,100],[7,32,-35,64,64,0,0,100]],
					[[17,-33,36,64,64,0,0,100],[13,-96,2,48,48,0,0,100],[13,-125,-62,82,82,0,0,100],[9,32,-35,64,64,0,0,100],[1,-104,43,64,64,0,0,100],[1,30,33,64,64,0,0,100],[1,-104,-103,64,64,0,0,100],[1,-51,-36,64,64,0,0,100],[1,-6,-98,92,92,0,0,100]],
					[[14,-96,2,48,48,0,0,100],[18,-33,36,64,64,0,0,100],[15,-125,-62,82,82,0,0,100],[11,32,-35,64,64,0,0,100],[3,-104,43,64,64,0,0,100],[3,30,33,64,64,0,0,100],[3,-104,-103,64,64,0,0,100],[3,-51,-36,64,64,0,0,100],[3,-6,-98,92,92,0,0,100]],
					[[15,-96,2,48,48,0,0,100],[19,-33,36,64,64,0,0,100],[17,-125,-62,82,82,0,0,100],[13,32,-35,64,64,0,0,100],[5,-104,43,64,64,0,0,100],[5,30,33,64,64,0,0,100],[5,-104,-103,64,64,0,0,100],[5,-51,-36,64,64,0,0,100],[5,-6,-98,92,92,0,0,100]],
					[[20,-33,36,64,64,0,0,100],[16,-96,2,48,48,0,0,100],[19,-125,-62,82,82,0,0,100],[15,32,-35,64,64,0,0,100],[7,-104,43,64,64,0,0,100],[7,30,33,64,64,0,0,100],[7,-51,-36,64,64,0,0,100],[7,-104,-103,64,64,0,0,100],[7,-6,-98,92,92,0,0,100]],
					[[21,-33,36,64,64,0,0,100],[17,-96,2,48,48,0,0,100],[21,-125,-62,82,82,0,0,100],[17,32,-35,64,64,0,0,100],[9,-104,43,64,64,0,0,100],[9,30,33,64,64,0,0,100],[9,-51,-36,64,64,0,0,100],[9,-104,-103,64,64,0,0,100],[9,-6,-98,92,92,0,0,100]],
					[[22,-33,36,64,64,0,0,100],[18,-96,2,48,48,0,0,100],[22,-125,-62,82,82,0,0,100],[18,32,-35,64,64,0,0,100],[11,-104,43,64,64,0,0,100],[11,30,33,64,64,0,0,95],[11,-104,-103,64,64,0,0,100],[11,-51,-36,64,64,0,0,100],[11,-6,-98,92,92,0,0,100]],
					[[19,-96,2,48,48,0,0,100],[23,-33,36,64,64,0,0,100],[23,-125,-62,82,82,0,0,100],[19,32,-35,64,64,0,0,100],[13,-104,43,64,64,0,0,100],[13,30,33,64,64,0,0,100],[13,-51,-36,64,64,0,0,100],[13,-104,-103,64,64,0,0,100],[13,-6,-98,92,92,0,0,100]],
					[[20,-96,2,48,48,0,0,100],[20,32,-35,64,64,0,0,100],[14,-104,43,64,64,0,0,100],[14,30,33,64,64,0,0,100],[14,-51,-36,64,64,0,0,100],[14,-104,-103,64,64,0,0,100],[14,-6,-98,92,92,0,0,100]],
					[[21,-96,2,48,48,0,0,100],[21,32,-35,64,64,0,0,100],[15,-104,43,64,64,0,0,100],[16,30,33,64,64,0,0,100],[15,-6,-98,92,92,0,0,100],[16,-51,-36,64,64,0,0,100],[16,-104,-103,64,64,0,0,100]],
					[[22,-96,2,48,48,0,0,100],[22,32,-35,64,64,0,0,100],[18,30,33,64,64,0,0,100],[17,-104,43,64,64,0,0,100],[17,-6,-98,92,92,0,0,100],[18,-51,-36,64,64,0,0,100],[18,-104,-103,64,64,0,0,100]],
					[[23,-96,2,48,48,0,0,100],[23,32,-35,64,64,0,0,100],[19,-104,43,64,64,0,0,100],[19,-6,-98,92,92,0,0,100],[20,30,33,64,64,0,0,100],[20,-51,-36,64,64,0,0,100],[20,-104,-103,64,64,0,0,100]],
					[[21,30,33,64,64,0,0,100],[21,-51,-36,64,64,0,0,100],[21,-104,-103,64,64,0,0,100],[20,-104,43,64,64,0,0,100],[20,-6,-98,92,92,0,0,100]],
					[[22,30,33,64,64,0,0,100],[22,-51,-36,64,64,0,0,100],[22,-104,-103,64,64,0,0,100],[21,-104,43,64,64,0,0,100],[21,-6,-98,92,92,0,0,100]],
					[[23,30,33,64,64,0,0,100],[23,-51,-36,64,64,0,0,100],[23,-104,-103,64,64,0,0,100],[22,-104,43,64,64,0,0,100],[22,-6,-98,92,92,0,0,100]],
					[[23,-104,43,64,64,0,0,100],[23,-6,-98,92,92,0,0,100]],
					[]
				]
			}
		}
	],
	/*
	Phân biệt loại effect:
		+ ID: 9,10 - Các loại effect buff cho trụ khác
		+ ID: 8,11,12,13,19,23 - Các loại effect gây dam, eff lên toàn bộ quái trong range
		+ Các loại effect còn lại
	Các effect khác loại nhau sẽ không thể kết hợp được với nhau.
	
	0:slow, [x,a,d]: x% dính, a tốc độ bị giảm (slow), d là thời gian hiệu ứng
	1:burn, [x,b,d]: x% dính, b là dam/s, d là thời gian hiệu ứng
	2: poison, [x,a,b,d]: x% dính, a tốc độ bị giảm (slow), b là dam/s, d là thời gian hiệu ứng
	3: bind, [x,d] x% dính, d là thời gian hiệu ứng
	4: blind [x,d] x% dính, d thời gian hiệu ứng
	5: bite [x,b,d] x% dính, b là dam/s, d là thời gian hiệu ứng
	6:  ice [x,a,d1,d2] x% dính, a% slow, d1 thời gian đóng băng, d2 thời gian slow
	7: corrupt [x,a] x% dính,trừ a giáp
	8: push (air;2) [a,d] a là dam, d là thời gian hiệu ứng
	9:buff damage, [a,b] a% dam buff, b là dam được cộng thêm
	10: buff speed [a] % tốc được buff
	11: Water [a,b,c,d] a là % slow, b là dam/s, c là cấp số dam sét được buff, d là thời gian
	12: Oil [a,b,c,d] a là % slow, b là dam/s, c là cấp số dam lửa được buff, d là thời gian
	13: Mire [a,b,c,d] a là % slow, b là dam/s, c là cấp số dam độc được buff, d là thời gian
	14: life, [a]: số mạng đc bonus
	15: bounty [a]: số tiền được bonus
	16: Impetus [c]: % bonus dam dựa trên khoảng cách
	17: Critical [x,a]: x% dính, a số dam được nhân lên
	18: Multiplier [b] cấp số tăng của dam
	19: Split shot [a] % dam gốc
	20: Frenzy [a,d] bonus a% tốc độ đánh, tối đa d lần.
	21: Inner Toxic [g] dam sẽ đc tăng thêm g% từ số máu bị mất.
	22: Bomb [e,f] khi giết được quái sẽ kích hoạt nổ f dam với bán kính e
	23: Earthquake 
	24: Chain [a,b,c] a là % dam sau mỗi lần chuyển đổi tượng, b là số lần chuyển đối tượng tối đa, c là bán kính tối đa để tìm đối tượng mới
	25: AOE dam [b] bán kính vùng lan
	
	Resitant là mảng gồm 5 phần tử tương ứng với cấp số dam nhận vào khi bắn vào quái của 5 element Kim Mộc Thủy Hỏa Thổ
	
	*/
	Tower:[{
		ID:0,
		Name:lang.data.Tower.ID0,
		Description:lang.description.Tower.ID0,
		Image: "tower1",
		Damage:[22,22],
		Element:[0],
		Resitant:[1,2,1.5,0.75,0.5],
		EffectID:[17],
		InfoEff:{ID17:[30,1.5]},
		BulletID:2,
		LevelUp:{Dmg:10,Ran:0.1,RlT:10,Eff:[3,0.1]},
		Range:3,
		ReloadTime:300,
		Price:100,		
	},
	{
		ID:1,
		Name:lang.data.Tower.ID1,
		Description:lang.description.Tower.ID1,
		Image: "tower1",
		Damage:[15,25],
		Element:[1],
		Resitant:[0.5,1,2,1.5,0.75],
		EffectID:[2],
		InfoEff:{ID2:[20,0.2,10,5000]},
		BulletID:1,
		LevelUp:{Dmg:10,Ran:0.1,RlT:10,Eff:[3,0.02,5,200]},
		Range:5,
		ReloadTime:600,
		Price:100,		
	},
	{
		ID:2,
		Name:lang.data.Tower.ID2,
		Description:lang.description.Tower.ID2,
		Image: "towerEarth1",
		Damage:[25,35],
		Element:[2],
		Resitant:[0.75,0.5,1,2,1.5],
		EffectID:[25],
		InfoEff:{ID25:[2]},
		BulletID:2,
		LevelUp:{Dmg:10,Ran:0.1,RlT:10,Eff:[0.3]},
		Range:5,
		ReloadTime:1500,
		Price:100,		
	},
	{
		ID:3,
		Name:lang.data.Tower.ID3,
		Description:lang.description.Tower.ID3,
		Image: "tower1",
		Damage:[5,12],
		Element:[3],
		Resitant:[1.5,0.75,0.5,1,2],
		EffectID:[0],
		InfoEff:{ID0:[100,0.3,2000]},
		BulletID:1,
		LevelUp:{Dmg:10,Ran:0.1,RlT:10,Eff:[0,0.05,100]},
		Range:5,
		ReloadTime:300,
		Price:100,		
	},
	{
		ID:4,
		Name:lang.data.Tower.ID4,
		Description:lang.description.Tower.ID4,
		Image: "tower1",
		Damage:[10,14],
		Element:[4],
		Resitant:[2,1.5,0.75,0.5,1],
		EffectID:[1],
		InfoEff:{ID1:[50,30,2000]},
		BulletID:0,
		LevelUp:{Dmg:10,Ran:0.1,RlT:10,Eff:[5,10,100]},
		Range:5,
		ReloadTime:300,
		Price:100,		
	},
    {
        ID: 5,
        Name:lang.data.Tower.ID5,
        Description:lang.description.Tower.ID5,
        Image: "tower1",
        Damage: [50, 50],
        Element: [0,0],
		Resitant:[1,2,1.5,0.75,0.5],
        EffectID: [17],
        InfoEff: { ID17: [50, 1.5] },
        BulletID: 0,
		LevelUp:{Dmg:10,Ran:0.1,RlT:10,Eff:[5,0.25]},
        Range: 5,
        ReloadTime: 300,
        Price: 200,
    },
	{
        ID: 6,
        Name:lang.data.Tower.ID6,
        Description:lang.description.Tower.ID6,
        Image: "tower1",
        Damage: [30, 40],
        Element: [0,1],
		Resitant:[1,2,1.5,0.75,0.5],
        EffectID: [21],
        InfoEff: { ID21: [10] },
        BulletID: 0,
		LevelUp:{Dmg:10,Ran:0.1,RlT:10,Eff:[1]},
        Range: 5,
        ReloadTime: 300,
        Price: 300,
    },
	{
        ID: 7,
        Name:lang.data.Tower.ID7,
        Description:lang.description.Tower.ID7,
        Image: "tower1",
        Damage: [10, 40],
        Element: [0,2],
		Resitant:[1,2,1.5,0.75,0.5],
        EffectID: [0],
        InfoEff: { ID0: [20, 0.85,1500] },
        BulletID: 0,
		LevelUp:{Dmg:10,Ran:0.1,RlT:10,Eff:[5,0.01,200]},
        Range: 5,
        ReloadTime: 300,
        Price: 200,
    },
	{
        ID: 8,
        Name:lang.data.Tower.ID8,
        Description:lang.description.Tower.ID8,
        Image: "tower1",
        Damage: [35, 35],
        Element: [0,3],
		Resitant:[1,2,1.5,0.75,0.5],
        EffectID: [10],
        InfoEff: { ID10: [30] },
        BulletID: 0,
		LevelUp:{Dmg:10,Ran:0.1,RlT:10,Eff:[15]},
        Range: 5,
        ReloadTime: 300,
        Price: 100,
    },
	{
        ID: 9,
        Name:lang.data.Tower.ID9,
        Description:lang.description.Tower.ID9,
        Image: "tower1",
        Damage: [10, 100],
        Element: [0,4],
		Resitant:[1,2,1.5,0.75,0.5],
        EffectID: [15],
        InfoEff: { ID15: [5] },
        BulletID: 0,
		LevelUp:{Dmg:10,Ran:0.1,RlT:10,Eff:[5]},
        Range: 5,
        ReloadTime: 300,
        Price: 150,
    },
	{
        ID: 10,
        Name:lang.data.Tower.ID10,
        Description:lang.description.Tower.ID10,
        Image: "tower1",
        Damage: [88, 88],
        Element: [1,1],
		Resitant:[0.5,1,2,1.5,0.75],
        EffectID: [2],
        InfoEff: { ID2: [50, 0.2,20,3000] },
        BulletID: 0,
		LevelUp:{Dmg:10,Ran:0.1,RlT:10,Eff:[5,0.05,10,200]},
        Range: 5,
        ReloadTime: 300,
        Price: 200,
    },
	{
        ID: 11,
        Name:lang.data.Tower.ID11,
        Description:lang.description.Tower.ID11,
        Image: "tower1",
        Damage: [77, 77],
        Element: [1,2],
		Resitant:[1,2,1.5,0.75,0.5],
        EffectID: [14],
        InfoEff: { ID14: [0.4] },
        BulletID: 0,
		LevelUp:{Dmg:10,Ran:0.1,RlT:10,Eff:[0.05]},
        Range: 5,
        ReloadTime: 300,
        Price: 150,
    },
	{
        ID: 12,
        Name:lang.data.Tower.ID12,
        Description:lang.description.Tower.ID12,
        Image: "tower1",
        Damage: [0, 0],
        Element: [1,3],
		Resitant:[1,2,1.5,0.75,0.5],
        EffectID: [12],
        InfoEff: { ID12: [0.2, 15,3,3000] },
        BulletID: 0,
		LevelUp:{Dmg:10,Ran:0.1,RlT:10,Eff:[0.05,15,0.5,200]},
        Range: 5,
        ReloadTime: 300,
        Price: 300,
    },
	{
        ID: 13,
        Name:lang.data.Tower.ID13,
        Description:lang.description.Tower.ID13,
        Image: "tower1",
        Damage: [30, 50],
        Element: [1,4],
		Resitant:[1,2,1.5,0.75,0.5],
        EffectID: [1,22],
        InfoEff: { ID1: [100, 15,1000],ID22:[3,100] },
        BulletID: 0,
		LevelUp:{Dmg:10,Ran:0.1,RlT:10,Eff:[5,15,200,0.3,100]},
        Range: 5,
        ReloadTime: 300,
        Price: 300,
    },
	{
        ID: 14,
        Name:lang.data.Tower.ID14,
        Description:lang.description.Tower.ID14,
        Image: "towerEarth2",
        Damage: [66, 88],
        Element: [2,2],
		Resitant:[1,2,1.5,0.75,0.5],
        EffectID: [25],
        InfoEff: { ID25: [3] },
        BulletID: 0,
		LevelUp:{Dmg:10,Ran:0.1,RlT:10,Eff:[0.3]},
        Range: 5,
        ReloadTime: 300,
        Price: 200,
    },
	{
        ID: 15,
        Name:lang.data.Tower.ID15,
        Description:lang.description.Tower.ID15,
        Image: "tower1",
        Damage: [0, 0],
        Element: [2,3],
		Resitant:[1,2,1.5,0.75,0.5],
        EffectID: [13],
        InfoEff: { ID13: [0.2,20,3, 1500] },
        BulletID: 0,
		LevelUp:{Dmg:10,Ran:0.1,RlT:10,Eff:[0.03,20,0.2,200]},
        Range: 5,
        ReloadTime: 300,
        Price: 250,
    },
	{
        ID: 16,
        Name:lang.data.Tower.ID16,
        Description:lang.description.Tower.ID16,
        Image: "tower1",
        Damage: [40, 45],
        Element: [2,4],
		Resitant:[1,2,1.5,0.75,0.5],
        EffectID: [1,25],
        InfoEff: { ID1: [100, 30,2000],ID25:[2.5] },
        BulletID: 0,
		LevelUp:{Dmg:10,Ran:0.1,RlT:10,Eff:[0,30,200,0.125]},
        Range: 5,
        ReloadTime: 300,
        Price: 250,
    },
	{
        ID: 17,
        Name:lang.data.Tower.ID17,
        Description:lang.description.Tower.ID17,
        Image: "tower1",
        Damage: [33, 66],
        Element: [3,3],
		Resitant:[1.5,0.75,0.5,1,2],
        EffectID: [0],
        InfoEff: { ID0: [100, 0.4,3000] },
        BulletID: 0,
		LevelUp:{Dmg:10,Ran:0.1,RlT:10,Eff:[0,0.05,200]},
        Range: 5,
        ReloadTime: 300,
        Price: 200,
    },
	{
        ID: 18,
        Name:lang.data.Tower.ID18,
        Description:lang.description.Tower.ID18,
        Image: "tower1",
        Damage: [0, 0],
        Element: [3,4],
		Resitant:[1,2,1.5,0.75,0.5],
        EffectID: [8],
        InfoEff: { ID8: [10, 1000] },
        BulletID: 0,
		LevelUp:{Dmg:10,Ran:0.1,RlT:10,Eff:[10,200]},
        Range: 5,
        ReloadTime: 6000,
        Price: 100,
    },
	{
        ID: 19,
        Name:lang.data.Tower.ID19,
        Description:lang.description.Tower.ID19,
        Image: "tower1",
        Damage: [100, 100],
        Element: [4,4],
		Resitant:[2,1.5,0.75,0.5,1],
        EffectID: [1],
        InfoEff: { ID1: [100, 35,2000] },
        BulletID: 0,
		LevelUp:{Dmg:10,Ran:0.1,RlT:10,Eff:[0,30,200]},
        Range: 5,
        ReloadTime: 300,
        Price: 300,
    }
	
	],
	Bullet:[{
		ID:0,
		Name:["Kim","Steel"],
		Image: "bullet1",	
		Typebullet: 1,
		Speed:8
		
	},
	{
		ID:1,
		Name:["Mộc","Nature"],
		Image: "bullet1",
		Typebullet: 1,
		Speed:14
	},
	{
		ID:2,
		Name:["Thổ","Earth"],
		Image: "bullet2",	
		Typebullet: 1,
		Speed:7
		
	},
	{
		ID:3,
		Name:["Kim","Steel"],
		Image: "bullet1",	
		Typebullet: 1,
		Speed:8
		
	},
	{
		ID:4,
		Name:["Mộc","Nature"],
		Image: "bullet1",
		Typebullet: 1,
		Speed:14
	},
	{
		ID:5,
		Name:["Thổ","Earth"],
		Image: "bullet2",	
		Typebullet: 1,
		Speed:7
		
	},{
		ID:6,
		Name:["Kim","Steel"],
		Image: "bullet1",	
		Typebullet: 1,
		Speed:8
		
	},
	{
		ID:7,
		Name:["Mộc","Nature"],
		Image: "bullet1",
		Typebullet: 1,
		Speed:14
	},
	{
		ID:8,
		Name:["Thổ","Earth"],
		Image: "bullet2",	
		Typebullet: 1,
		Speed:7
		
	},
	{
		ID:9,
		Name:["Kim","Steel"],
		Image: "bullet1",	
		Typebullet: 1,
		Speed:8
		
	},
	{
		ID:10,
		Name:["Mộc","Nature"],
		Image: "bullet1",
		Typebullet: 1,
		Speed:14
	},
	{
		ID:11,
		Name:["Thổ","Earth"],
		Image: "bullet2",	
		Typebullet: 1,
		Speed:7
		
	},{
		ID:12,
		Name:["Kim","Steel"],
		Image: "bullet1",	
		Typebullet: 1,
		Speed:8
		
	},
	{
		ID:13,
		Name:["Mộc","Nature"],
		Image: "bullet1",
		Typebullet: 1,
		Speed:14
	},
	{
		ID:14,
		Name:["Thổ","Earth"],
		Image: "bullet2",	
		Typebullet: 1,
		Speed:7
		
	},
	{
		ID:15,
		Name:["Kim","Steel"],
		Image: "bullet1",	
		Typebullet: 1,
		Speed:8
		
	},
	{
		ID:16,
		Name:["Mộc","Nature"],
		Image: "bullet1",
		Typebullet: 1,
		Speed:14
	},
	{
		ID:17,
		Name:["Thổ","Earth"],
		Image: "bullet2",	
		Typebullet: 1,
		Speed:7
		
	},
    {
        ID: 18,
        Name: ["Thổ", "Earth"],
        Image: "bullet2",
        Typebullet: 1,
        Speed: 7

    },
	{
		ID:19,
		Name:["Sét","Lightning"],
		Image: "bullet2",	
		Typebullet: 1,
		Speed:8
		
	}
	],
	/*
	XP Table:
	Hero XP Gained - Normal, Constant factor: 5
	Hero XP Gained - Normal, Level factor: 5
	Hero XP Gained - Normal, Previous value factor: 1
	Hero XP Gained - Normal, Table: 25
	*/
	XP:[
	{
		ID:0,
		Name:["Bình thường","Normal"],
		XPTime:1,//Số XP có trong 1s
		Gained :{//Thông số tính XP từ 1 monster
			Constant:5,
			Level:5,
			PreviousValue:1,
			Table:25
		},
		Required:{//Thông số tính EXP của 1 level cho trụ
			Constant:0,
			Level:100,
			PreviousValue:1,
			Table:200
		}
	}
	],
	/*
	Monster Skill: 
	0: Regeneration : [a] Regen a%HP/s
	1: Healing: [a,b] Heal a%HP every b mili second
	2: Evade: [a] Miss a%
	3: Haste: [a,b] Movement speed increase a%/s, limit at b\
	4: Harden: [a] Each hit taken + a armor
	5: Immunity: [a,b] Reduces 100% damage in a mili seconds, cool down b mili seconds
	
	*/
	Monster:[
	{
		ID:0,
		Name:lang.data.Monster.ID0,
		Image: "monster1",
		Speed:1.5,
		Element:3,
		BaseHP:150,		
		Bounty:10,
		Skill: 2,
		Armor: -2,
		SkillInfo: [30]
	},
	{
		ID:1,
		Name:lang.data.Monster.ID1,
		Image: "monster1",
		Speed:1,
		Element:3,
		BaseHP:400,
		Bounty:20,
		Skill: 1,
		Armor: 4,
		SkillInfo: [30,6000]
	},
	{
		ID:2,
		Name:lang.data.Monster.ID2,
		Image: "monster1",
		Speed:1,
		Element:3,
		BaseHP:1000,	
		isBoss:true,		
		Bounty:50,
		Skill: 0,
		Armor: 10,
		SkillInfo: [2]
	},{
		ID:3,
		Name:lang.data.Monster.ID3,
		Image: "monster1",
		Speed:1.25,
		Element:4,
		BaseHP:150,		
		Bounty:10,
		Skill: 0,
		Armor: -3,
		SkillInfo: [3]
	},{
		ID:4,
		Name:lang.data.Monster.ID4,
		Image: "monster1",
		Speed:1.5,
		Element:4,
		BaseHP:400,
		Bounty:20,
		Skill: 0,
		Armor: 20,
		SkillInfo: [2]
	},
	{
		ID:5,
		Name:lang.data.Monster.ID5,
		Image: "monster1",
		Speed:1.75,
		Element:4,
		BaseHP:1000,		
		Bounty:50,
		isBoss:true,
		Skill: 5,
		Armor: 2.5,
		SkillInfo: [3000,6000]
	},
	{
		ID:6,
		Name:lang.data.Monster.ID6,
		Image: "monster1",
		Speed:1.5,
		Element:0,
		BaseHP:150,		
		Bounty:10,
		Skill: 3,
		Armor: 5.5,
		SkillInfo: [20,3]
	},
	{
		ID:7,
		Name:lang.data.Monster.ID7,
		Image: "monster1",
		Speed:1.75,
		Element:0,
		BaseHP:400,
		Bounty:20,
		Skill: 4,
		Armor: 0.2,
		SkillInfo: [0.3]
	},
	{
		ID:8,
		Name:lang.data.Monster.ID8,
		Image: "monster1",
		Speed:1,
		Element:0,
		BaseHP:1000,		
		Bounty:50,
		isBoss:true,
		Skill: 3,
		Armor: 15,
		SkillInfo: [20,3]
	},
	{
		ID:9,
		Name:lang.data.Monster.ID9,
		Image: "monster1",
		Speed:2,
		Element:1,
		BaseHP:150,		
		Bounty:10,
		Skill: 5,
		Armor: 1.5,
		SkillInfo: [3000,8000]
	},
	{
		ID:10,
		Name:lang.data.Monster.ID10,
		Image: "monster1",
		Speed:1.5,
		Element:1,
		BaseHP:400,
		Bounty:20,
		Skill: 2,
		Armor: 3.5,
		SkillInfo: [40]
	},
	{
		ID:11,
		Name:lang.data.Monster.ID11,
		Image: "monster1",
		Speed:1,
		Element:1,
		BaseHP:1000,		
		Bounty:50,
		isBoss:true,
		Skill: 0,
		Armor: 7,
		SkillInfo: [2]
	},
	{
		ID:12,
		Name:lang.data.Monster.ID12,
		Image: "monster1",
		Speed:1.25,
		Element:2,
		BaseHP:150,
		Bounty:10,
		Skill: 4,
		Armor: -5,
		SkillInfo: [0.3]
	},
	{
		ID:13,
		Name:lang.data.Monster.ID13,
		Image: "monster1",
		Speed:1,
		Element:2,
		BaseHP:400,
		Bounty:20,
		Skill: 3,
		Armor: 6,
		SkillInfo: [20,3]
	},
	{
		ID:14,
		Name:lang.data.Monster.ID14,
		Image: "monster1",
		Speed:1.5,
		Element:2,
		BaseHP:1000,		
		Bounty:50,
		isBoss:true,
		Skill: 4,
		Armor: 7,
		SkillInfo: [0.5]
	},
	
	]
}