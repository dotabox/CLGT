
(function () {
    CAAT.DEBUG_VIEWPORT = 1;
	
    CAAT.SceneSkill = function () {
        CAAT.SceneSkill.superclass.constructor.call(this);
        return this;
    };

	CAAT.SceneSkill.prototype = {
		skillInfo: null,
		skillPoint: null,
		skillTab: null,
		pointLeft: 0,
		create: function(director, sIndex, sMain) {
			var self = this;
			this.sceneIndex = sIndex;
			this.setBounds(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
				.setFillStyle("#ccccff");
			this.director = director;
			this.skillInfo = new CAAT.Foundation.ActorContainer()
				.setBounds(0, 0, CANVAS_WIDTH - CANVAS_HEIGHT, CANVAS_HEIGHT/2)
				.setFillStyle('red');
			this.skillPoint = new CAAT.Foundation.ActorContainer()
				.setBounds(0, this.skillInfo.height, CANVAS_WIDTH - CANVAS_HEIGHT, CANVAS_HEIGHT - this.skillInfo.height)
				.setFillStyle('green');
			this.skillTab = new CAAT.Foundation.ActorContainer()
				.setBounds(this.skillInfo.width, 0, CANVAS_HEIGHT, CANVAS_HEIGHT)
				.setFillStyle("#ccccff");
			this.addChild(this.skillInfo);
			this.addChild(this.skillPoint);
			this.addChild(this.skillTab);
			this.curPoint = this.pointLeft = 0;

			var bttSize = 50;
			var upSkillImage = new CAAT.Foundation.SpriteImage().initialize(this.director.getImage("upSkill"), 1, 1);
			var upSkillBtt = new CAAT.Button().initialize(self.director, upSkillImage,0,0,0,0,
				function(button,ex,ey){		// down
				},
				function(button,ex,ey){		//drag 
				},
				function(button,ex,ey){		//up
					if(curSelectBtt != null) {
						if(0 <= curSelectBtt.data.tempLevel && curSelectBtt.data.tempLevel < maxPointPerSkill) {
							if(self.curPoint > 0) {
								minusPoint(1);	
								curSelectBtt.data.tempLevel++;
								checkLockSkill();
								setCurSkillInfo();
							}
						}
					}
				})
				.setScaleAnchored(bttSize/upSkillImage.singleWidth, bttSize/upSkillImage.singleHeight, 0, 0)
				.setLocation(0, this.skillInfo.height - bttSize);
			this.skillInfo.addChild(upSkillBtt);

			var downSkillImage = new CAAT.Foundation.SpriteImage().initialize(this.director.getImage("downSkill"), 1, 1);
			var downSkillBtt = new CAAT.Button().initialize(self.director, downSkillImage,0,0,0,0,
				function(button,ex,ey){		// down
				},
				function(button,ex,ey){		//drag 
				},
				function(button,ex,ey){		//up
					if(curSelectBtt != null) {
						if(curSelectBtt.data.tempLevel >= 0) {
							if(curSelectBtt.data.tempLevel > curSelectBtt.data.level) {
								addPoint(1);
								curSelectBtt.data.tempLevel--;
								checkLockSkill();
								setCurSkillInfo();
							}
						}
					}
				})
				.setScaleAnchored(bttSize/downSkillImage.singleWidth, bttSize/downSkillImage.singleHeight, 0, 0)
				.setLocation(this.skillInfo.width - bttSize, this.skillInfo.height - bttSize);
			this.skillInfo.addChild(downSkillBtt);

			var okImage = new CAAT.Foundation.SpriteImage().initialize(this.director.getImage("okIcon"), 1, 1);
			var okBtt = new CAAT.Button().initialize(self.director, okImage,0,0,0,0,
				function(button,ex,ey){		// down
				},
				function(button,ex,ey){		//drag 
				},
				function(button,ex,ey){		//up
					self.pointLeft = self.curPoint;
					setLevel();
					console.log("back to main map scene");
					sMain.updateSkillPoint();
					self.director.switchToScene(3);
				})
				.setScaleAnchored(2.5*bttSize/okImage.singleWidth, bttSize/okImage.singleHeight, 0, 0)
				.setLocation((this.skillPoint.width - 2.5*bttSize)/2, this.skillPoint.height - bttSize);
			this.skillPoint.addChild(okBtt);

			var curSkillName = new CAAT.Foundation.UI.TextActor()
				.setFont('20px Arial')
				.setTextFillStyle('#ffcccc')
            this.skillInfo.addChild(curSkillName);
            var curSkillInfo = new CAAT.Foundation.UI.TextActor()
				.setFont('20px Arial')
				.setTextFillStyle('#ffcccc')
            this.skillInfo.addChild(curSkillInfo);
            var curSkillLevel = new CAAT.Foundation.UI.TextActor()
				.setFont('20px Arial')
				.setTextFillStyle('#ffcccc')
            this.skillInfo.addChild(curSkillLevel);

			var pointInfo = new CAAT.Foundation.UI.TextActor()
				.setFont('30px Arial')
				.setTextFillStyle('#ffcccc')
				.setText(this.pointLeft + " points")
            	.centerAt(this.skillPoint.width/2, this.skillPoint.height/2);
            this.skillPoint.addChild(pointInfo);

            var maxPointPerSkill = 10;
            var minusPoint = function(p) {
            	if(self.curPoint - p >= 0) {
            		self.curPoint -= p;
            		pointInfo.setText(self.curPoint + " points")
            			.centerAt(self.skillPoint.width/2, self.skillPoint.height/2);
            	}
            }

            var addPoint = function(p) {
            	if(self.curPoint + p <= self.pointLeft) {
            		self.curPoint += p;
            		pointInfo.setText(self.curPoint + " points")
            			.centerAt(self.skillPoint.width/2, self.skillPoint.height/2);
            	}
            }

            var setBttIconEnable = function(button, enabled) {
            	if(enabled) {
            		button.lockActor.setAlpha(0);
            	}
            	else {
            		button.lockActor.setAlpha(0.6);
            	}
            }

            var skillBttSize = 50;
            var skillImg = [];
            var skillBtt = [];
            var lockImg = this.director.getImage("lockIcon");
            for(var i = 1; i <= 5; i++) {
				skillImg[i] = new CAAT.Foundation.SpriteImage().initialize(this.director.getImage("skillIcon" + i), 1, 4);
				skillBtt[i] = new CAAT.Button().initialize(self.director, skillImg[i],0,1,2,3,
					function(button,ex,ey){		// down
						curSelectBtt = this;
						selectMark.setLocation(this.x, this.y);
						setCurSkillInfo();
					},
					function(button,ex,ey){		//drag 
					},
					function(button,ex,ey){		//up
					})
					.setScaleAnchored(skillBttSize/skillImg[i].singleWidth, skillBttSize/skillImg[i].singleHeight, 0, 0)
					.setLocation((i-1)*skillBttSize*1.5, (this.skillTab.height - skillBttSize)/2);
				this.skillTab.addChild(skillBtt[i]);
				skillBtt[i].data = {};
				skillBtt[i].data.name = "skill " + i;
				skillBtt[i].data.info = "skill info...";
				skillBtt[i].data.level = -1;	// -1 mean locked
				skillBtt[i].lockActor = new CAAT.Foundation.Actor()
	            	.setLocation((i-1)*skillBttSize*1.5, (this.skillTab.height - skillBttSize)/2)
	            	.setBackgroundImage(lockImg)
	            	.setScaleAnchored(skillBttSize/lockImg.width, skillBttSize/lockImg.height, 0, 0)
	            	.enableEvents(false);
	            this.skillTab.addChild(skillBtt[i].lockActor);
	            setBttIconEnable(skillBtt[i], false);
            }
            var selectMark = new CAAT.Foundation.Actor()
            	.setLocation(skillBtt[1].x, skillBtt[1].y)
            	.setSize(skillBttSize, skillBttSize)
            	.setFillStyle("yellow")
            	.setAlpha(0.4)
            	.enableEvents(false);
            this.skillTab.addChild(selectMark);
            var curSelectBtt = skillBtt[1];
            skillBtt[1].data.level = 0;
            setBttIconEnable(skillBtt[1], true);

            var checkLockSkill = function() {
            	for(var i = 2; i <= 5; i++) {
            		if(skillBtt[i].data.tempLevel == -1) {
            			if(skillBtt[i-1].data.tempLevel >= 3) {
            				skillBtt[i].data.tempLevel = 0;
            				setBttIconEnable(skillBtt[i], true);
            			}
            		}
            		else {
            			if(skillBtt[i-1].data.tempLevel < 3) {
            				addPoint(skillBtt[i].data.tempLevel);
            				skillBtt[i].data.tempLevel = -1;
            				setBttIconEnable(skillBtt[i], false);
            			}
            		}
            	}
            }

            var space = 5;
            var setCurSkillInfo = function() {
            	curSkillName.setText(curSelectBtt.data.name)
            		.setLocation((self.skillInfo.width - curSkillName.width)/2, space);
            	curSkillInfo.setText(curSelectBtt.data.info)
            		.setLocation((self.skillInfo.width - curSkillInfo.width)/2, space + curSkillName.height);
            	var levelText = curSelectBtt.data.tempLevel;
            	if(levelText == maxPointPerSkill) {
            		curSkillLevel.setTextFillStyle("yellow");
            	}
            	else {
            		curSkillLevel.setTextFillStyle('#ffcccc');
            	}
            	if(levelText == 0) {
            		levelText = "0";
            	}
            	if(levelText == -1) {
            		levelText = "locked";
            		curSkillLevel.setTextFillStyle("black");
            	}
            	curSkillLevel.setText(levelText)
            		.centerAt(self.skillInfo.width/2, downSkillBtt.y + bttSize/2);
            }            

            var setTempLevel = function() {
            	for(var i=1; i<=5; i++) {
            		skillBtt[i].data.tempLevel = skillBtt[i].data.level;
            	}
            }

            var setLevel = function() {
            	for(var i=1; i<=5; i++) {
            		skillBtt[i].data.level = skillBtt[i].data.tempLevel;
            	}	
            }

            var setPoint = function(point) {
            	self.pointLeft = point;
            	self.curPoint = point;
            	pointInfo.setText(self.curPoint + " points")
            		.centerAt(self.skillPoint.width/2, self.skillPoint.height/2);
            }

            // set each time go to scene Skill
            this.addNewPoint = function(point) {
            	setTempLevel(); 
	            setCurSkillInfo();
	            setPoint(this.pointLeft + point);
            }

			return this;
		}
	};
	extend(CAAT.SceneSkill, CAAT.Foundation.ActorContainer);
	 
})();