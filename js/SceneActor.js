(function () {
    CAAT.SceneActor = function () {
        CAAT.SceneActor.superclass.constructor.call(this);
        return this;
    }

    CAAT.SceneActor.prototype = {
        isDim: null,
        director: null,
        nextScene: null,
        prevScene: null,

        initialize: function (director, nextScene, prevScene) {
            this.director = director;
            this.nextScene = nextScene;
            this.prevScene = prevScene;
            return this;
        },

        paint: function(director, time) {
            CAAT.SceneActor.superclass.paint.call(this, director, time);
            var ctx = director.ctx;
            if (this.isDim) {
                ctx.fillStyle = "rgba(0,0,0,0.5)";
                ctx.fillRect(0, 0, this.width, this.height);
            }
        },

        switchToNextScene: function () {
            if (typeof this.nextScene !== "undefined") {
                this.director.switchToScene(this.nextScene);
            }
            return this;
        },

        switchToPrevScene: function () {
            if (typeof this.prevScene !== "undefined") {
                this.director.switchToScene(this.prevScene);
            }
        },

        switchToScene: function (scene) {
            if (typeof scene !== "undefined") {
                this.director.switchToScene(scene);
            }
        }
    }
    extend(CAAT.SceneActor, CAAT.Foundation.ActorContainer);
})();

(function () {
    CAAT.MenuActor = function () {
        CAAT.MenuActor.superclass.constructor.call(this);
        return this;
    }
    CAAT.MenuActor.prototype = {
        buttons: null,

        initialize: function (director, nextScene) {
            CAAT.MenuActor.superclass.initialize.call(this, director, nextScene);
            var self = this;
            this.buttons = [];

            this.setBackgroundImage(director.getImage("menu_bg"));
            var buttonImage = new CAAT.SpriteImage().initialize(director.getImage("menu_button"), 4, 2);
            var i = 0;
            for (i; i < 4; i++) {
                var button = new CAAT.Button().initialize(director, buttonImage, 2 * i, 2 * i + 1, 2 * i + 1);
                self.buttons.push(button);
                button.setActionPerformed(self.menuButtonAction(i));
                button.setPosition(550, 250 + i * 50);
                self.addChild(button);
            }
            return this;
        },

        enableButton: function () {
            var buttons = this.buttons;
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].setEnabled(true);
            }
            return this;
        },

        disableButton: function () {
            var buttons = this.buttons;
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].setEnabled(false);
            }
            return this;
        },

        menuButtonAction: function (j) {
            var self = this;
            return function () {
                switch (j) {
                    /* Start */
                    case 0:
                        console.log('start');
                        self.switchToNextScene();
						var randomSound = (1+(Math.random()*2)<<0);
						if(randomSound==3) randomSound = 1;
						Sound.playMusic("map"+randomSound);
                        break;
                        /* Unlock */
                    case 1:
                        console.log('unlock');
                        self.isDim = true;
                        self.disableButton();
                        break;
                        /* Option */
                    case 2:
                        console.log('option');
                        self.isDim = true;
                        self.disableButton();
						var option = new CAAT.OptionContainer().initialize(self.director);
						option.setLocation((CANVAS_WIDTH-option.width)/2,100);
						option.setCallbackFunction(function(){
							self.isDim = false;
                            self.enableButton();
							self.removeChild(self.option);
						});
						self.option = option;
						self.addChild(option);
                        break;
                        /* Credits */
                    case 3:
                        console.log('credits');
                        self.isDim = true;
                        self.disableButton();
						Sound.playMusic("credits");
                        var credits = [
                            "PROGRAM\n" +
                            "       Nguyễn Hoàng Tú\n\n" +
                            "GRAPHICS\n" +
                            "       Nguyễn Hoàng Tú\n" +
                            "       Đỗ Mạnh Cường\n" +
                            "       Nguyễn Tuấn Anh\n\n",

                            "CODER\n" +
                            "       Phạm Trung Thành\n" + 
                            "       Đinh Hoàng Anh\n" + 
                            "       Lê Việt Hà\n" + 
                            "       Nguyễn Thanh Tùng",
                            "LOGICTIC\n" +
                            "       Phạm Trung Thành\n"+
                            "       Lê Việt Hà\n"+
                            "       Nguyễn Thanh Tùng\n"+
                            "       Đinh Hoàng Anh",
                            "MUSIC\n" +
                            "       Nguyễn Quang Vũ\n"+
                            "       Golden Sun Dark Dawn\n"+
                            "       Fire Emblem 7\n"+
                            "       Age Of Mythology\n"+
                            "       Nền RPG của Tú đa\n",
                            "       SPECIAL THANK\n\n"+
                            "       Girl at Cafe Cốm :v\n\n\n"+
                            "For help us complete this games!",
							"\n\n"+
                            "       Bring to you by BKGM\n\n"+
                            "      THANK FOR PLAYING!"
                        ];
                        var creditActor = new CAAT.CreditsActor().initialize(self.director, credits);
                        creditActor.setPosition(100, 100);
                        creditActor.setFn(function () {
                            self.isDim = false;
                            self.enableButton();
							Sound.playMusic("start");
                            self.removeChild(this);
                        });
                        self.addChild(creditActor);
                        break;
                }
            }
        }
    }
    extend(CAAT.MenuActor, CAAT.SceneActor);
})();

(function () {
    CAAT.CreditsActor = function () {
        CAAT.CreditsActor.superclass.constructor.call(this);
        return this;
    }

    CAAT.CreditsActor.prototype = {
        director: null,
        credits: null,
        currentCredit: null,
        numberCredits: null,
        fn: null,
        initialize: function (director, credits, fn) {
            var self = this;
            this.director = director;
            this.credits = credits;
            this.currentCredit = 0;
            this.numberCredits = credits.length;
            this.fn = fn;
            this.setBackgroundImage(director.getImage("credits_bg"));
            
            var fadeBehavior = new CAAT.AlphaBehavior().setValues(0, 1).setFrameTime(director.currentScene.time, 500).
                addListener({
                    behaviorExpired: function (behavior, time, actor) {
                        actor.emptyBehaviorList();
                        
                        var textActor = new CAAT.MyTextActor().initialize(director, credits[0], 350);
                        textActor.setTextFillStyle("rgb(255, 223, 167)");
                        textActor.setHorizontalAlign("left");
                        textActor.setFontSize(20);
                        textActor.setLineHeight(25);
                        textActor.setPosition(120, 100);

                        var behavior = new CAAT.AlphaBehavior().setValues(0, 1).setPingPong().setFrameTime(time, 3000).
                            addListener({
                                behaviorExpired: function (behavior, time, actor) {
                                    self.currentCredit++;
                                    if (self.currentCredit < self.numberCredits) {
                                        actor.setText(credits[self.currentCredit]);
                                        behavior.setFrameTime(time, 3000);
                                        actor.addBehavior(behavior);
                                    } else {
                                        self.actionComplete();
                                        actor.emptyBehaviorList();
                                    }
                                }
                            });
                        textActor.addBehavior(behavior);

                        var img = new CAAT.SpriteImage().initialize(director.getImage("cancelButton"), 1, 1);
                        var cancelButton = new CAAT.Button().initialize(director, img, 0, 0, 0, 0, function () {
                            textActor.emptyBehaviorList();
                            self.actionComplete();
                        });
                        cancelButton.setPosition(400, 250);

                        self.addChild(textActor);
                        self.addChild(cancelButton);
                    }
                })
            this.addBehavior(fadeBehavior);

            
            return this;
        },

        setFn: function(fn) {
            this.fn = fn;
        },

        actionComplete: function () {
            if (this.fn) {
                this.fn();
            }
            return;
        }
    }
    extend(CAAT.CreditsActor, CAAT.Foundation.ActorContainer);
})();

(function () {
    CAAT.Dialog = function () {
        CAAT.Dialog.superclass.constructor.call(this);
        return this;
    }

    CAAT.Dialog.prototype = {
        director: null,
        actor: null,
        textActor: null,

        initialize: function (director) {
            this.director = director;
            this.setBackgroundImage(director.getImage("dialog_bg"));
            this.enableEvents(false);

            var textActor = new CAAT.MyTextActor().initialize(director, "", this.width - 200);
            this.textActor = textActor;
            textActor.setPosition(160, 30);
            textActor.setTextFillStyle("rgb(255, 223, 167)");
            textActor.setHorizontalAlign("left");
            textActor.setFontSize(16);
            textActor.setLineHeight(22);
            textActor.enableEvents(false);
            this.addChild(textActor); 

            return this;
        },

        setText: function (text) {
            this.textActor.setText(text);
            return this;
        },

        setActor: function (actor) {
            if (this.actor != actor) {
                this.removeChild(this.actor);
                this.actor = actor;
                this.actor.setPosition(25, 35);
                this.addChild(actor);
            }
            return this;
        },

        show: function() {
            this.setVisible(true);
            return this;
        },

        hide: function () {
            this.setVisible(false);
            return this;
        },

        paint: function (director, time) {
            CAAT.Dialog.superclass.paint.call(this, director, time);
            if (this.actor) {
                var ctx = director.ctx;
                ctx.font = '16px Times New Roman';
                ctx.fillStyle = "rgb(255, 223, 167)";
                var length = ctx.measureText(this.actor.name).width;
                ctx.fillText(this.actor.name, 75 - length/2, 22);
            }
        }
    }
    extend(CAAT.Dialog, CAAT.Foundation.ActorContainer);
})();

(function () {
    CAAT.StoryScene = function () {
        CAAT.StoryScene.superclass.constructor.call(this);
        return this;
    }

    CAAT.StoryScene.prototype = {
        actionList: null,
        actorList: null,
        sceneTime: null,
        currentIndex: null,
        numberDialog: null,
        dialogActor: null,
        callback: null,
        bgImg: null,
        offsetX: null,
        offsetY: null,
        imageList: null,

        choose: null,
        initialize: function (director, nextScene, prevScene, actorList, actionList) {
            CAAT.StoryScene.superclass.initialize.call(this, director, nextScene, prevScene);
            this.actorList = actorList;
            this.actionList = actionList;
            this.currentIndex = 0;
            this.numberDialog = actionList.length;
            this.offsetX = 0;
            this.offsetY = 0;
            this.choose = 0;

            this.dialogActor = new CAAT.Dialog().initialize(director).setPosition(100, 420);
            this.addChild(this.dialogActor);

            this.updateAction();

            if (this.callback) {
                this.doAction(this.callback);
                this.currentIndex++;
            }

            return this;
        },

        updateAction: function() {
            var data = this.actionList[this.currentIndex];
            var actor = this.actorList[data["actor"]];
            var dialog = data["dialog"];
            var callback = data["callback"];

            if (typeof actor === "undefined") {
                this.dialogActor.hide();
            } else {
                this.dialogActor.show();
                this.dialogActor.setActor(actor);
            }

            if (typeof dialog !== "undefined") {
                this.dialogActor.setText(dialog);
            }

            if (typeof callback !== "undefined") {
                this.callback = callback;
            } else {
                this.callback = null;
            }
            //this.currentIndex++;
        },

        complete: function () {
			
            if (this.createTut) this.createTut(4-this.choose);
            return this;
        },

        mouseDown: function() {
            if (this.callback) {
                this.doAction(this.callback);
            }
            this.updateAction();
            this.currentIndex++;
        },

        doAction: function (callbacks) {
            for (var i = 0; i < callbacks.length; i++) {
                var callback = callbacks[i];
                var action = callback["name"];
                var arguments = callback["arguments"];
                //console.log(action);
                //console.log(arguments);
                switch (action) {
                    case "changeBackground":
                        this.changeBackground(arguments);
                        break;
                    case "addImage":
                        this.addImage(arguments);
                        break;
                    case "clearBackground":
                        this.clearBackground();
                        break;
                    case "removeImage":
                        this.removeImage(arguments);
                        break;
                    case "removeAllImage":
                        this.removeAllImage();
                        break;
                    case "shakeScreen":
                        this.shakeScreen(arguments);
                        break;
                    case "createChoose":
                        this.createChoose(arguments);
                        break;
                    case "complete":
                        this.complete();
                        break;
                }
            }
        },

        changeBackground: function (bg) {
            var img = this.director.getImage(bg);
            this.bgImg = img;
            return this;
        },

        addImage: function (arguments) {
            if (!this.imageList) {
                this.imageList = [];
            }
            this.imageList.push(arguments);
            return this;
        },

        removeImage: function (index) {
            if (this.imageList) {
                this.imageList.splice(index, index + 1);
            }
            return this;
        },

        removeAllImage: function () {
            this.imageList = null;
            return this;
        },

        shakeScreen: function(arguments) {
            var self = this;
            var speed = arguments[0];
            var power = arguments[1];
            var decay = arguments[2];
            self.enableEvents(false);

            elapsedTime = 0;
            var lastX = self.x;
            var lastY = self.y;
            var xrate = 2;
            var yrate = 2;

            self.offsetX = Math.sin(elapsedTime*xrate)*power;
            self.offsetY = Math.sin(elapsedTime * yrate) * power + Math.cos(elapsedTime * yrate) * power;
            var behavior = new CAAT.ContainerBehavior().setFrameTime(0, speed).addListener({
                behaviorExpired: function (behavior, time) {
                    elapsedTime += speed;
                    power -= speed / 1000 * decay;
                    if (power <= 0) {
                        self.enableEvents(true);
                        self.setPosition(lastX, lastY);
                        self.removeBehaviorById(0);
                    } else {
                        self.offsetX = Math.sin(elapsedTime * xrate) * power;
                        self.offsetY = Math.sin(elapsedTime * yrate) * power + Math.cos(elapsedTime * yrate) * power;
                        behavior.setFrameTime(time, speed);
                    }
                }
            });
            self.addBehavior(behavior);
            return this;
        },

        createChoose: function (arguments) {
            var self = this;
            var arg = arguments;
            var choices = arg["choices"];
            var x = 500;
            var y = 450;
            var width = 50;
            var chooseActor = new CAAT.ChooseActor().initialize(self.director, choices, width);
            chooseActor.setFn(function () {
                chooseActor.destroy();
                self.choose = chooseActor.selected;
                var choice = "choice" + (chooseActor.selected + 1);
                var choicesAction = arg[choice];
                for (var i = 0; i < choicesAction.length; i++) {
                    self.actionList.splice(self.currentIndex + i , 0, choicesAction[i]);
                }
                
                self.enableEvents(true);
            });
            chooseActor.setPosition(x, y);
            self.parent.addChild(chooseActor);
            self.enableEvents(false);
        },

        paint: function (director, time) {
            CAAT.StoryScene.superclass.paint.call(this, director, time);
            var ctx = director.ctx;
            if (this.bgImg) {
                ctx.drawImage(this.bgImg, this.offsetX, this.offsetY);
            }
            if (this.imageList) {
                var imageList = this.imageList;
                for (var i = 0; i < imageList.length; i++) {
                    var currentImg = imageList[i]
                    ctx.drawImage(director.getImage(currentImg[0]), currentImg[1]+this.offsetX, currentImg[2]+this.offsetY);
                }
            }
        }
    }
    extend(CAAT.StoryScene, CAAT.SceneActor);
})();