(function () {
	
	CAAT.TUT = function(){
		CAAT.TUT.superclass.constructor.call(this);
		return(this);
	}
	var actorMain = new CAAT.Foundation.ActorContainer();
	var numberTUT=0;
	var _next=false;
	CAAT.TUT.prototype = {
	    blur: function () {
	        actorMain.
            setSize(this.width, this.height).
            setFillStyle('black').
            setGlobalAlpha(true).
            setAlpha(.83);
	        this.addChild(actorMain);
	        return this;
	    },
	    unblur: function () {
	        actorMain.emptyChildren();
	        this.removeChild(actorMain);
			return this;
	    },
		highlight: function (actor) {
		    var self = this;
		    this.blur();
		    //this.setZOrder(this.menuButton, Number.MAX_VALUE);
		    this.setZOrder(actor, Number.MAX_VALUE);
			var ax=actor.x, ay=actor.y, aw=actor.width, ah=actor.height;
			if (arguments[1]&&arguments[2]) {ax=arguments[1], ay=arguments[2], aw=arguments[3], ah=arguments[4];}
		    var hidenButton = new CAAT.Foundation.ActorContainer()
                                    .setSize(aw, ah)
									.setLocation(ax,ay)
                                    .setScaleAnchor(0.5, 0.5)                                    
		                            .setFillStyle('red')
		                            .setGlobalAlpha(true)
                                    .setAlpha(0);
									//console.log(hidenButton.width+"+"+actor.AABB.width+"+"+actor.width);
			this.isTimePaused=!this.isTimePaused;
		    hidenButton.mouseDown = function (e) {
			
		        actor.mouseDown(e);
		        self.unhighlight();
		        self.pauseButton.mouseDown(e);
				if (_next) self.runTUT();
				//_next=false;
		        this.setExpired();
				
		    }
		    hidenButton.mouseEnter = function (e) {
				
		        actor.mouseEnter(e);
		    }
		    hidenButton.mouseExit = function (e) {
		        actor.mouseExit(e);
		    }
		    hidenButton.mouseMove=function(e){
					actor.mouseMove(e);
			}
			hidenButton.mouseUp=function(e){
				actor.mouseUp(e);
			}
			hidenButton.mouseDrag=function(e){
				actor.mouseDrag(e);
			}
		    this.addChild(hidenButton);
			//this.setZOrder(this.hidenButton, Number.MAX_VALUE);
			return this;
		},
		unhighlight: function () {
		    this.unblur();
			return this;
		},
		showRedArrow: function (actor,text) {
		    var self = this;
			var ax=actor.x, ay=actor.y, aw=actor.width, ah=actor.height;
			if (typeof arguments[2] != "undefined") {
				ax=arguments[2]-arguments[6];
				ay=arguments[3];
				aw=arguments[4];
				ah=arguments[5];
			}
		    var redArrow = new CAAT.Foundation.SpriteImage().initialize(self.director.getImage('redArrow'), 1, 1);
		    var arrow = new CAAT.Foundation.ActorContainer().setBackgroundImage(redArrow, true).setScaleAnchor(0.5, 0.5);
		    var h1 = 42 + arrow.height ;
		    var h2 = 2 + arrow.height ;
		    if (ay < this.width/3) {
		        arrow.setRotation(Math.PI);
				arrow.flipped = true;
		        h1 = -2 - ah;
		        h2 = -42   - ah;
		    }
		    var path = new CAAT.PathUtil.LinearPath().
					setInitialPosition(ax, ay - h1).
					setFinalPosition(ax, ay - h2);
		    var behavior = new CAAT.PathBehavior().setPath(path).setFrameTime(0, 2000).setCycle(true).setPingPong();
		    arrow.addBehavior(behavior);
			if(text){
				var textbox=new CAAT.MangaTextBox().initialize(self.director,text,80,arrow);
				if(ax>self.width-120) {
					textbox.x -= 80;
					textbox.setTalkPositionX(60);
				}
				if(arrow.flipped) textbox.getChildAt(0).setRotation(Math.PI);
			}
		    actorMain.addChild(arrow);
			return arrow;
		},
		runTUT:function(){
			var _this=this;
			switch(numberTUT){
			case 0:
				var actor=new CAAT.Foundation.ActorContainer().setSize(50,50).setPosition(50,50)
									.setFillStyle("#f0f").enableEvents(true);			
				
				_this.addChild(actor);
				_this.highlight(actor);
				_next=true;
				actor.mouseDown=function(){
					
					this.setExpired();					
				}
				break;
			case 1:
			
				_this.highlight(_this.buildButton);
				
				var actor=_this.showRedArrow(_this.buildButton,lang.tut.ID0[LANGUAGE]);
				_next=true;
				break;
			case 2:
				var actor=_this.buildButtonArray[_this.unlockTower[0]];
				xx=_this.buildButtonXYArray[_this.unlockTower[0]][0];
				yy=_this.buildButtonXYArray[_this.unlockTower[0]][1];
				_this.highlight(actor,xx,yy,32,32);			
				var actor2=_this.showRedArrow(actor,lang.tut.ID0[LANGUAGE],xx,yy,32,32,16);
				_next=true;				
				break;
			case 3:
				var actor=new CAAT.Foundation.ActorContainer().setSize(CANVAS_WIDTH,CANVAS_HEIGHT/3).setPosition(0,0)
									.setFillStyle("#000")
									.enableEvents(true)
									.setGlobalAlpha(false)
									.setAlpha(0.5);
				var actor2=new CAAT.Foundation.ActorContainer().setSize(CANVAS_WIDTH,CANVAS_HEIGHT/3).setPosition(0,CANVAS_HEIGHT*2/3)
									.setFillStyle("#000")
									.enableEvents(true)
									.setGlobalAlpha(true)
									.setAlpha(0.5);
				var actor3=new CAAT.Foundation.ActorContainer().setSize(CANVAS_WIDTH,CANVAS_HEIGHT).setPosition(0,0)
									.setFillStyle("#000")
									.enableEvents(true)
									.setGlobalAlpha(true)
									.setAlpha(0);
				_this.addChild(actor3);
				_this.addChild(actor);
				_this.addChild(actor2);
			var text=new CAAT.MyTextActor().initialize(_this.director,lang.tut.ID1[LANGUAGE],300).setFontSize(30).setTextFillStyle("black")
			.setHorizontalAlign("center");
			var box=new CAAT.Foundation.ActorContainer().setSize(300,50).setFillStyle("#fff").setPosition(CANVAS_WIDTH/3,100).setAlpha(1);
			box.addChild(text);
			actor.addChild(box);
			actor3.mouseEnter = function (e) {				
		        _this.mouseEnter(e);
		    }
		    actor3.mouseExit = function (e) {
		        _this.mouseExit(e);
		    }
		    actor3.mouseMove=function(e){
				_this.mouseMove(e);
				if (_this.towerArray.length>0) {Remove();_this.runTUT();}
			}
			actor3.mouseUp=function(e){
				_this.mouseUp(e);
			}
			actor3.mouseDrag=function(e){
				_this.mouseDrag(e);
			}
			var Remove=function(){
				_this.removeChild(actor);
				_this.removeChild(actor2);
				_this.removeChild(actor3);
				actor.setExpired();
				actor2.setExpired();
				actor3.setExpired();
			}
			actor3.mouseDown=function(e){
				_this.mouseDown(e);
				
				if (_this.towerArray.length>0) {Remove();_this.runTUT();}
			}
				
				_next=true;	
				break;
			case 4:
				var pointList = _this.currentMap.pointList[0];
				var pointStart = pointList[0],pointEnd = pointList[pointList.length-1];
				
				var px1 = pointStart.y*TILE_SIZE_FOR_DRAWING, py1 = pointStart.x*TILE_SIZE_FOR_DRAWING,
					px2= pointEnd.y*TILE_SIZE_FOR_DRAWING, py2 = pointEnd.x*TILE_SIZE_FOR_DRAWING;
				var actor=new CAAT.Foundation.ActorContainer().
							setBounds(0,0,_this.width,_this.height).
							enableEvents(true);
				actor.paint = function(director,time){
					var ctx = director.ctx;
					ctx.fillStyle = "#0F0";
					ctx.fillRect(px1,py1,TILE_SIZE,TILE_SIZE);
					ctx.fillStyle = "#800";
					ctx.fillRect(px2,py2,TILE_SIZE,TILE_SIZE);
				}
				_this.addBlinkBehavior(actor);
				actor.mouseDown=function(){
					this.setExpired();					
				}
				_this.addChild(actor);
				_this.highlight(actor);
				_this.showRedArrow(actor,lang.tut.ID3[LANGUAGE],px1,py1,TILE_SIZE,TILE_SIZE,-8);
				_this.showRedArrow(actor,lang.tut.ID4[LANGUAGE],px2,py2,TILE_SIZE,TILE_SIZE,-8);
				_next=true;
				break;
			case 5:
				_this.addBlinkBehavior(_this.startButton);
				_this.highlight(_this.startButton,_this.startButton.AABB.x,_this.startButton.AABB.y,_this.startButton.AABB.width,_this.startButton.AABB.height);
				_this.showRedArrow(_this.startButton,lang.tut.ID2[LANGUAGE],_this.startButton.AABB.x,_this.startButton.AABB.y,_this.startButton.AABB.width,_this.startButton.AABB.height,-8);
				break;
			}
			numberTUT++;
			return this;
		},
		addBlinkBehavior: function(actor){
			var alphaBehavior = new CAAT.Behavior.AlphaBehavior().setValues(1, 0.5).setFrameTime(this.time, 700).
			addListener({
				behaviorExpired: function(director,time){
					actor.emptyBehaviorList();
					var alphaBehavior2 = new CAAT.Behavior.AlphaBehavior().setValues(0.5, 1).setFrameTime(time, 700).
					addListener({
						behaviorExpired: function(director,time){
							actor.emptyBehaviorList();
							alphaBehavior.setFrameTime(time,700);
							actor.addBehavior(alphaBehavior);
						}
					})
					actor.addBehavior(alphaBehavior2);
				}
			});
			actor.addBehavior(alphaBehavior);
		},
		initData: function (id) {
		    var a = [6, 9, 12, 0, 3];// a[0] Kim a[1] Moc a[2] Tho a[3] Thuy a[4]Hoa
		    var id;
		    var a1,a2,a3,a4;
		    switch (id) {
		        case 0: a1 = [[a[1], 2, 0]];
		            a2 = [[a[2], 2, 0], [a[3], 2, 0]];
		            a3 = [[a[4], 2, 0]];
		            a4 = [[a[0], 2, 0], [5, 1, 0]];
		            break;
		        case 1: a1 = [[a[2], 2, 0]];
		            a2 = [[a[3], 2, 0], [a[4], 2, 0]];
		            a3 = [[0, 2, 0]];
		            a4 = [[a[1], 2, 0], [8, 1, 0]];
		            break;
		        case 2: a1 = [[a[3], 2, 0]];
		            a2 = [[a[4], 2, 0], [a[0], 2, 0]];
		            a3 = [[a[1], 2, 0]];
		            a4 = [[a[2], 2, 0], [11, 1, 0]];
		            break;
		        case 3: a1 = [[a[4], 2, 0]];
		            a2 = [[a[0], 2, 0], [a[1], 2, 0]];
		            a3 = [[a[2], 2, 0]];
		            a4 = [[a[3], 2, 0], [14, 1, 0]];
		            break;
		        case 4: a1 = [[a[0], 2, 0]];
		            a2 = [[a[1], 2, 0], [a[2], 2, 0]];
		            a3 = [[a[3], 2, 0]];
		            a4 = [[a[4], 2, 0], [2, 1, 0]];
		            break;
		    }

		    data.Map[0].Wave = [];
		    data.Map[0].Wave.push(a1);
		    data.Map[0].Wave.push(a2);
		    data.Map[0].Wave.push(a3);
		    data.Map[0].Wave.push(a4);

		    return this;
		}
	}
	extend(CAAT.TUT, CAAT.BattleContainer);
})();
