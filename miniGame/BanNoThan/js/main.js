﻿    function bannothan(images,director) {  
		for(var i=0;i<images.length;i++) director.addImage(images[i].id,images[i].image);
		
		var SceneMain = director.currentScene;
		SceneMain.emptyChildren();
		var Main = new CAAT.Foundation.ActorContainer().setBounds(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
		var BGimg = new CAAT.Foundation.SpriteImage().initialize(director.getImage('bn_bg'), 1, 1 );
		var BG = new CAAT.Background().setBG(BGimg);
		SceneMain.addChild(Main);
		Main.isEnd=false;
		Main.addChild(BG);
		var menuImage = new CAAT.SpriteImage().initialize(director.getImage("menuListButton"),5,2);
		var quitButton = new CAAT.Button().initialize(director,menuImage,6,7,6,7,function(){
			var MiniGameContainer = new CAAT.MiniGameContainer().initialize(director);
			SceneMain.emptyChildren();
			SceneMain.addChild(MiniGameContainer);
		}).
			setLocation(CANVAS_WIDTH-170,CANVAS_HEIGHT-80);
		
		;
		var restartButton = new CAAT.Button().initialize(director,menuImage,0,1,1,0,function(){
			
		}).
			setLocation(CANVAS_WIDTH-170,CANVAS_HEIGHT-50);
		Main.addChild(quitButton);
		Main.addChild(restartButton);
		console.log("dsds");
		console.log(quitButton);
		
		var Player= new CAAT.Player().init(director,Main);
		
		Main.addChild(Player);
		
		PWidth=Player.width/2;

		Main.mouseMove = function(e){
			Player.x=e.screenPoint.x-PWidth;
			Player.y=e.screenPoint.y;
		}

		var score=0;
		var ScoreBar=new CAAT.Foundation.ActorContainer().setBounds(CANVAS_WIDTH-100,20,50,50);
		ScoreBar.paint=function(director){
			var ctx = director.ctx;
			ctx.font = "20px Times New Roman";
			var text = "Score: " + score;
			var text2= "Level: " + lvl;
			var text3= "Lives: " + Player.hp;
			ctx.fillStyle = "#0FF";
			ctx.fillText(text,0,25);
			ctx.fillText(text2,0,0);
			ctx.fillText(text3,0,50);
		}
		var bonus=0;
		var increaseScore=function(i){
			score+=i;
			if (score>100&&bonus==0){
				Player.hp++;
				bonus=1;
			} else
			if (score>500&&bonus==1){
				Player.hp++;
				bonus=2;
			}
		}
		Main.addChild(ScoreBar);
		var lastFire=0;
		var reloadFire=999;
		var bullets=[];
		var fire=false;
		Main.mouseDown = function(e){
			fire=true;
		}
		Main.mouseUp = function(e){
			fire=false;
		}

		Main.mouseDrag = function(e){
			Player.x=e.screenPoint.x;
			Player.y=e.screenPoint.y;
			fire=true;
		}

		var enemies=[];
		var xE=0;
		var speedEnemy=100;
		var lvl=0;
		function createWave(){
			hp=lvl/3+1>>0;
			for (i=0;i<10+lvl;i++){
			
			var enemy=new CAAT.Enemy().init(director, Main);
			enemy.setSpeed(speedEnemy+5*lvl);
			enemy.setHP(hp);
			//enemy.percentFire+=0.01*lvl;
			enemies.push(enemy);
			Main.addChild(enemy);
			enemy.isHit=function(){
				this.hp--;
				increaseScore(1);
				if (this.hp<=0){
					if(this.isEnd) this.isEnd();
				}
			}
			enemy.isEnd=function(){
				index=enemies.indexOf(this);
				enemies.splice(index,1);
				for (x in this.bullets)
					if (this.bullets[x].isEnd) this.bullets[x].isEnd();
				
				Main.removeChild(this);
				this.setExpired();
			}
			}
			lvl++;
		}
		

		var lastTime = SceneMain.time;
		
		SceneMain.createTimer(0, Number.MAX_VALUE,
			function (scene_time, timer_time, timertask_instance) {   // timeout

			},
			function (scene_time, timer_time, timertask_instance) {   // tick
				var dt = scene_time - lastTime;//Khoang thoi gian giua 2 lan cap nhat
			    lastTime = scene_time;
			    if (enemies.length==0) createWave();
			    if (Main.isEnd) this.cancel();
				BG.update(director,scene_time);

				reloadFire=scene_time - lastFire;
				if (fire && reloadFire>100){
					
					lastFire=scene_time;
					var bullet = new CAAT.Bullet().init(director);
					bullet.setLocation(Player.x+PWidth,Player.y);
					bullets.push(bullet);
					bullet.isEnd=function(){
						index=bullets.indexOf(this);
						bullets.splice(index,1);
						Main.removeChild(bullet);
						this.setExpired();
					};
					Main.addChild(bullet);
				}
				for (i in bullets){
					bullets[i].update(director,scene_time);
					for (x in enemies){
						if(bullets[i])
						if (enemies[x].isColision(bullets[i].x,bullets[i].y,bullets[i].width,bullets[i].height)) {
							if (bullets[i].isEnd) bullets[i].isEnd();
							if (enemies[x].isHit) enemies[x].isHit();
						}
					}
				}
					
				for (i in enemies)
					enemies[i].update(director,scene_time, Player);
			},
			function (scene_time, timer_time, timertask_instance) {   // cancel
				console.log(score);
			}
		);
        CAAT.loop(60);
    }


