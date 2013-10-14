(function () {
    CAAT.Player = function () {
    	CAAT.Player.superclass.constructor.call(this);
        return (this);
    }
    CAAT.Player.prototype = {
        init: function(director, Main){
        	this.Main=Main;
        	var PlayerImg = new CAAT.Foundation.SpriteImage().initialize(director.getImage('player'), 1, 1 );
        	this.enableEvents(false)
        		.setBackgroundImage(PlayerImg)
        		.setScaleAnchored(1,1,0.5,0.5);
        	this.hp=1;
        	return this;
        },
        setHP:function(hp){
        	this.hp=hp;
        },
        isHit:function(){
        	console.log("LOSE");
        	this.hp--;
        	if (this.hp<=0)
        		this.Main.isEnd=true;
        },
        isColision:function(x,y,w,h){
        	 return !(this.x > x+w ||
            this.x+this.width < x ||
            this.y > y+h ||
            this.y+this.height < y);       	
        },
        update:function(director){

        }

    }
    extend(CAAT.Player,CAAT.Foundation.ActorContainer);
})();

(function () {
    CAAT.Bullet = function () {
    	CAAT.Bullet.superclass.constructor.call(this);
        return (this);
    }
    CAAT.Bullet.prototype = {
        init: function(director){
        	var BulletImg = new CAAT.Foundation.SpriteImage().initialize(director.getImage('bullet'), 1, 1 );
        	this.setBackgroundImage(BulletImg)
        		.enableEvents(false)
        		.setScaleAnchored(1,1,0.5,0.5);
        	return this;
        },
        lastTime:0,
        speed:300,
        update:function(director, time){

        	var dt = time - this.lastTime;
        	if (this.lastTime==0) dt=0;
		    this.lastTime = time;

        	this.y-=this.speed*dt/1000;

        	if (this.y<0)
        		if (this.isEnd) this.isEnd();
        }

    }
    extend(CAAT.Bullet,CAAT.Foundation.ActorContainer);
})();

(function () {
    CAAT.BulletEnemy = function () {
    	CAAT.BulletEnemy.superclass.constructor.call(this);
        return (this);
    }
    CAAT.BulletEnemy.prototype = {
        init: function(director){
        	var BulletImg = new CAAT.Foundation.SpriteImage().initialize(director.getImage('bulletenemy'), 1, 1 );
        	this.setBackgroundImage(BulletImg)
        		.enableEvents(false)
        		.setScaleAnchored(1,1,0.5,0.5);
        	return this;
        },
        lastTime:0,
        speed:-300,
        isColision:function(x,y,w,h){
        	 return !(this.x > x+w ||
            this.x+this.width < x ||
            this.y > y+h ||
            this.y+this.height < y);       	
        },
        update:function(director, time, Player){

        	var dt = time - this.lastTime;
        	if (this.lastTime==0) dt=0;
		    this.lastTime = time;

        	this.y-=this.speed*dt/1000;
        	if (this.y<0)
        		if (this.isEnd) this.isEnd();
        	if (this.isColision(Player.x,Player.y,Player.width,Player.height)){
        		if (Player.isHit) Player.isHit();
        		if (this.isEnd) this.isEnd();
        	}


        }

    }
    extend(CAAT.BulletEnemy,CAAT.Foundation.ActorContainer);
})();

(function () {
    CAAT.Enemy = function () {
    	CAAT.Enemy.superclass.constructor.call(this);
        return (this);
    }
    CAAT.Enemy.prototype = {
        init: function(director,Main){
        	var EnemyImg = new CAAT.Foundation.SpriteImage().initialize(director.getImage('enemy'), 1, 1 );
        	this.Main=Main;
        	this.setBackgroundImage(EnemyImg)
        		.enableEvents(false)
        		.setScaleAnchored(1,1,0.5,0.5);
    		this.x=CANVAS_WIDTH / 4 + Math.random() * CANVAS_WIDTH / 2;
    		this.hp=10;
        	return this;
        },
        setHP:function(hp){
        	this.hp=hp;
        },
        setSpeed:function(speed){
        	this.speed=Math.floor(Math.random() * speed);
    		this.speedX=0;
    		this.speedY=speed/3;
    		this.alive=true;
    		this.leftEdge=0;
    		this.rightEdge=CANVAS_WIDTH;
    		this.bottonEdge=this.y+CANVAS_HEIGHT/2;
    		return this;
        },
        isColision:function(x,y,w,h){
        	 return !(this.x > x+w ||
            this.x+this.width < x ||
            this.y > y+h ||
            this.y+this.height < y);       	
        },
        bullets:[],
        fire:function(director){
        	var self=this;
        	var bullet = new CAAT.BulletEnemy().init(director);
        	var EWidth=this.width/2;
			bullet.setLocation(self.x+EWidth,self.y);	
			this.bullets.push(bullet);
			bullet.isEnd=function(){
				index=self.bullets.indexOf(this);
				self.bullets.splice(index,1);
				self.Main.removeChild(bullet);
				bullet.setExpired();
			};
			self.Main.addChild(bullet);
			return this;
        },
        lastTime:0,
        percentFire:0.01,
        lastFire:0,
        update:function(director, time, Player){

        	var dt = time - this.lastTime;
        	if (this.lastTime==0) dt=0;
		    this.lastTime = time;
		    
		    this.x += this.speedX*dt/1000;
        	this.y+=this.speedY*dt/1000;
        	if (this.x < this.leftEdge) {
			  this.speedX = this.speed*5;
			}
			else if (this.x>this.rightEdge) {
			  this.speedX = -this.speed*5;
			}
			else if (this.y <= this.bottomEdge) {
			  this.speedY = 0;
			  this.y += 75;
			  this.speedX = -this.speed;
			} else {
				this.speedX =  50 *Math.sin(this.speed * Math.PI / 64);;
			}
			this.speed++;
			if (this.y>CANVAS_HEIGHT&&this.isHit) this.isHit();
			if (time-this.lastFire>50){
				this.lastFire=time;
				chance = Math.floor(Math.random()*101);
				if (chance/100 < this.percentFire) {
				  this.fire(director);
				}	
			}
        	if (this.isColision(Player.x,Player.y,Player.width,Player.height)){
        		if (this.isHit) this.isHit();
        		if (Player.isHit) Player.isHit();
        	}

			for (i in this.bullets)
				this.bullets[i].update(director,time, Player);
        }

    }
    extend(CAAT.Enemy,CAAT.Foundation.ActorContainer);
})();

(function () {
    CAAT.Background = function () {
    	CAAT.Background.superclass.constructor.call(this);
        return (this);
    }
    CAAT.Background.prototype = {
    	setBG: function(img){
    		var self=this;
    		this.setBounds(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
    		var h = this.height;
    		var w= this.width;
    		this.actor1= new CAAT.Foundation.ActorContainer().setBackgroundImage(img).setLocation(0,0);
    		this.actor2= new CAAT.Foundation.ActorContainer().setBackgroundImage(img).setLocation(0, -CANVAS_HEIGHT);
    		this.addChild(self.actor1);
    		this.addChild(self.actor2);
    		this.enableEvents(false);
    		return this;
    	},
    	speed:100,
    	lastTime:0,
        update: function(director,time){
        	var dt = time - this.lastTime;
        	if (this.lastTime==0) dt=0;
		    this.lastTime = time;	
		    
        	this.y += this.speed*dt/1000;
        	if (this.y >= CANVAS_HEIGHT)
        		this.y =0;
        	return this;
        },

    }
    extend(CAAT.Background, CAAT.Foundation.ActorContainer);
})();
