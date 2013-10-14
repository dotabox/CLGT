/*
var LIFE = 50;
var GOLD = 0;

var towerArray = [];
var monsterArray = [];
var currentLevel = 1 // Màn hiện tại đang chơi, map tương ứng là data.Map[0];
var currentMap;
var monsterAddTime = 750;
var addedMonster = 0;
*/
window.onload = function () {
    var loadedImage = 0;
	var loadedAudio = 0;
	var loadedPercent = 0;
	var loadAudios,loadImages;
    windowLoad();
	function windowLoad(){
		var director = new CAAT.Foundation.Director().initialize(CANVAS_WIDTH, CANVAS_HEIGHT, document.getElementById("canvas"));
		var sceneMenu = director.createScene();
		var startTime = +new Date();
        var loadActor = new CAAT.Foundation.ActorContainer().setBounds(0,0,director.width,director.height);
		sceneMenu.addChild(loadActor);
		loadActor.paint = function(director,time){
			var ctx = director.ctx;
			ctx.fillStyle = "#0F0";
			ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
			ctx.fillStyle = "#0FF";
			ctx.font = "30px Times New Roman";
			ctx.strokeRect(300,200,200,20);
			ctx.fillRect(300,200,200*loadedPercent/100,20)
			ctx.fillText(loadedPercent+"%",300,190);
			(loadedImage==0)? ctx.fillText("LOADING SOUND...",300,250):ctx.fillText("LOADING IMAGE...",300,250);
			if(loadAudios&&loadImages&&(+new Date() - startTime>1000)) {
				run(director,loadImages,loadAudios);
				sceneMenu.removeChild(this);
			}
		}
		load();
		CAAT.loop(60);
	}
    function load() {
		
		
		var audioElement = new AudioPreloader().
			addElement("thunder1", "sound/sfx/thunder1.ogg").
			addElement("thunder2", "sound/sfx/thunder2.ogg").
			addElement("thunder3", "sound/sfx/thunder3.ogg").
			addElement("thunder4", "sound/sfx/thunder4.ogg").
			addElement("thunder5", "sound/sfx/thunder5.ogg").
			addElement("thunder6", "sound/sfx/thunder6.ogg").
			addElement("ice", "sound/sfx/ice.ogg").
			addElement("fire", "sound/sfx/fire.ogg").
			addElement("gold", "sound/sfx/gold.ogg").
			addElement("star", "sound/sfx/star.ogg").
			addElement("arrow1", "sound/sfx/arrow1.ogg").
			addElement("arrow2", "sound/sfx/arrow2.ogg").
			addElement("arrow3", "sound/sfx/arrow3.ogg").
			addElement("arrow4", "sound/sfx/arrow4.ogg").
			addElement("arrow5", "sound/sfx/arrow5.ogg").
			addElement("button", "sound/sfx/button.ogg").
			addElement("start", "sound/music/start.ogg").
			addElement("lose", "sound/music/lose.ogg").
			addElement("win", "sound/music/win.ogg").
			addElement("winMelody", "sound/music/winMelody.ogg").
			addElement("credits", "sound/music/credits.ogg").
			addElement("map1", "sound/music/map1.ogg").
			addElement("map2", "sound/music/map2.ogg").
			addElement("battle1", "sound/music/battle1.ogg").
			addElement("battle2", "sound/music/battle2.ogg").
			addElement("battle3", "sound/music/battle3.ogg").
			addElement("battle4", "sound/music/battle4.ogg");
			
        var imageElement = new CAAT.Module.Preloader.Preloader().
            addElement("monster1", "img/monster1.png").
            addElement("monster2", "img/monster2.png").
            addElement("monster3", "img/monster3.png").
            addElement("monster4", "img/monster4.png").
            addElement("monster5", "img/monster5.png").
            addElement("monster6", "img/monster6.png").
            addElement("monster7", "img/monster7.png").
            addElement("monster8", "img/monster8.png").
            addElement("monster9", "img/monster9.png").
            addElement("monster10", "img/monster10.png").
            addElement("monster11", "img/monster11.png").
            addElement("monster12", "img/monster12.png").
            addElement("monster13", "img/monster13.png").
            addElement("tower1", "img/Tower1.png").
            addElement("tower3", "img/Tower3.png").
            addElement("tower5", "img/Tower5.png").
            addElement("tower9", "img/Tower9.png").
            addElement("towerSprite1", "img/sprite_tower.png").
            addElement("towerEarth1", "img/earth_tower.png").
            addElement("towerEarth2", "img/earth_tower2.png").
            addElement("tile1", "img/tile1.png").
            addElement("tile2", "img/tile2.png").
            addElement("tile3", "img/tile3.png").
            addElement("tile4", "img/tile4.png").
            addElement("tile5", "img/tile5.png").
            addElement("tile6", "img/tile6.png").
            addElement("tile7", "img/tile7.png").
            addElement("tile8", "img/tile8.png").
            addElement("tile12", "img/tile12.png").
            addElement("bulletArrow", "img/arrow1.png").
            addElement("bullet1", "img/bullet1.png").        
            addElement("bullet2", "img/star1.png").
            addElement("flag", "img/Flag.png").
			addElement("star", "img/star.png").
			addElement("starEmpty", "img/starEmpty.png").
			addElement("back", "img/goBack.png").
			addElement("castle", "img/castle.png").
			addElement("forest", "img/forest.png").
			addElement("grave", "img/grave.jpg").
			addElement("mine", "img/mine.png").
			addElement("sea", "img/sea.jpg").
			addElement("volcano", "img/volcano.png").
            addElement("life", "img/Life.png").
            addElement("gold", "img/Gold.png").
            addElement("dmg", "img/dmg.png").
            addElement("redArrow", "img/arrow_red.png").
			addElement("button1", "img/button.png").
            addElement("towerEff0", "img/Image 39.png").
            addElement("towerEff1", "img/Image 45.png").
            addElement("towerEff2", "img/Image 54.png").
            addElement("towerEff3", "img/Image 52.png").
            addElement("towerEff4", "img/Image 44.png").
            addElement("towerEff5", "img/Image 38.png").
            addElement("towerEff6", "img/Image 33.png").
			addElement("lightning", "img/lightning_0.png").
            addElement("setting", "img/setting.png").
            addElement("cancel", "img/cancer.png").
            addElement("upgrade", "img/upgrade.png").
            addElement("skillFire", "img/skillFire.png").
            addElement("skillThunder", "img/skillThunder.png").
            addElement("skillIce", "img/skillIce.png").
            addElement("skillCircle", "img/skillCircle.png").
            addElement("skillAnimation1", "img/ani 48.png").
            addElement("skillAnimation2", "img/ani 588.png").
            addElement("cloud", "img/cloud.png").
            addElement("skillAnimation3", "img/ani 998.png").
            addElement("elementIcon0", "img/status/steel2_icon.png").
            addElement("elementIcon1", "img/status/tree_icon.png").
            addElement("elementIcon2", "img/status/rock2_icon.png").
            addElement("elementIcon3", "img/status/water_icon.png").
            addElement("elementIcon4", "img/status/fire_icon.png").
            addElement("armorIcon", "img/status/armor_icon.png").
            addElement("levelIcon", "img/status/level_icon.png").
            addElement("damageIcon", "img/status/damage_icon.png").
            addElement("sellTower", "img/buttons/sellTower.png").
            addElement("towerElementIcon0", "img/buttons/kim2.png").
            addElement("towerElementIcon1", "img/buttons/moc2.png").
            addElement("towerElementIcon2", "img/buttons/tho2.png").
            addElement("towerElementIcon3", "img/buttons/thuy2.png").
            addElement("towerElementIcon4", "img/buttons/hoa2.png").
            addElement("menuBattleButton", "img/buttons/menuButton.png").
            addElement("menuListButton", "img/buttons/menu_battle_button.png").
			addElement("menu_button", "img/menu_button.png").
            addElement("talk1", "img/talk1.png").
            addElement("talk2", "img/talk2.png").
            addElement("thought", "img/thought.png").
            addElement("tower", "img/Tower2.png").
            addElement("menu_bg", "img/menu_background.jpg").
            addElement("credits_bg", "img/credits_bg.png").
            addElement("cancelButton", "img/cancelButton.png").
            addElement("dialog_bg", "img/dialog.png").
            addElement("king_face", "img/king_face.png").
            addElement("sodier_face", "img/sodier_face.png").
            addElement("knight_face", "img/knight_face.png").
            addElement("checkbox","img/buttons/checkbox.png").
            addElement("upSkill", "img/buttons/upSkill.png").
            addElement("downSkill", "img/buttons/downSkill.png").
            addElement("okIcon", "img/buttons/ok.png").
            addElement("lockIcon", "img/buttons/lock.png").
            addElement("skillIcon1", "img/buttons/kim.png").
            addElement("skillIcon2", "img/buttons/moc.png").
            addElement("skillIcon3", "img/buttons/tho.png").
            addElement("skillIcon4", "img/buttons/thuy.png").
            addElement("skillIcon5", "img/buttons/hoa.png").
            addElement("pauseButton", "img/buttons/pauseButton.png").
			addElement("startButton", "img/buttons/start.png").
            addElement("talk1", "img/talk1.png").
            addElement("talk2", "img/talk2.png").
            addElement("thought", "img/thought.png").
            addElement("tower", "img/Tower2.png").
            addElement("menu_bg", "img/menu_background.jpg").
            addElement("credits_bg", "img/credits_bg.png").
            addElement("cancelButton", "img/cancelButton.png").
            addElement("dialog_bg", "img/dialog.png").

            addElement("inCastle_bg", "img/castle_in.jpg").
            addElement("cg1", "img/cg1.jpg").

            addElement("king_face", "img/king_face.png").
            addElement("sodier_face", "img/sodier_face.png").
            addElement("knight_face", "img/knight_face.png").
            addElement("fire_face", "img/fire_face.png").
            addElement("water_face", "img/water_face.png").
            addElement("wood_face", "img/wood_face.png").
            addElement("earth_face", "img/earth_face.png").
            addElement("steel_face", "img/steel_face.png").

            addElement("sodier", "img/sodier.png").
            addElement("knight", "img/knight.png").
            addElement("king", "img/king.png").
            addElement("fire", "img/fire.png").
            addElement("water", "img/water.png").
            addElement("wood", "img/wood.png").
            addElement("earth", "img/earth.png").
			
            addElement("loadingScreen", "img/loading.jpg").
            addElement("backgroundBoard", "img/backgroundBoard.jpg");
		
		var multipleAudioBy = 2;
		var elementLength = multipleAudioBy*audioElement.elements.length + imageElement.elements.length;
		audioElement.load (
		function loadAll(audios){
			loadAudios = audios;
			imageElement.load(function onAllAssetsLoaded(images) {
				loadImages = images;
            },
			function onEachLoad(index){
				loadedImage++;
				loadedPercent = Math.round((multipleAudioBy*loadedAudio + loadedImage)/elementLength*100);
			});
		},
		function loadEach(audio){
			loadedAudio++;
			loadedPercent = Math.round((multipleAudioBy*loadedAudio + loadedImage)/elementLength*100);
		});
        
    }
    function run(director,images,audios) {
        CAAT.DEBUG = 1;
        console.log('thanhdeptrai');
        
        director.setImagesCache(images);
		Sound.initialize(audios);
		Sound.playMusic("start");
		var sceneMenu = director.currentScene;
		var sceneBattle = director.createScene();
		var sceneMenuBattle = director.createScene();
        //main map
		var sceneMap = director.createScene();
		var sceneGame = director.createScene();
		var sceneSkill = director.createScene();		
		
		var sceneMapContainer = new CAAT.SceneMapCtn().create(director);
		sceneMap.addChild(sceneMapContainer);
		var sceneGameContainer = new CAAT.SceneGameCtn().create(director);
		sceneGame.addChild(sceneGameContainer);
		var sceneSkillContainer = new CAAT.SceneSkill().create(director);
		sceneSkill.addChild(sceneSkillContainer);

		var sceneMenuIndex = 0;
		var sceneBattleIndex = 1;
		var sceneMenuBattleIndex = 2;
		var sceneMapIndex =sceneMainMenuIndex= 3;
		var sceneGameIndex = 4;		
		var sceneSkillIndex = 5;
        //load user data
		var user = new CAAT.User().init(0, 0, 1, 0, 0, 0, [0,1,2,3,4,5,6,7,8,9,10], []);
		
		//var battleContainer = new CAAT.BattleContainer().initialize(director,1,"",8,50,200,null, sceneMenuIndex);
		//sceneBattle.addChild(battleContainer);
		var menu = new CAAT.MenuActor().initialize(director, sceneBattleIndex);
		sceneMenu.addChild(menu);


		var battleContainer;
		var lastTime = 0;
		var t = 0;
		var sceneTime = 0;
        
		var battleLoad = function (battleContainer) {
		   

		    if (battleContainer.loadingRep !== null) sceneBattle.addChild(battleContainer);
			if(battleContainer.endBattle = 0) menu.initialize(director, 1);
			else menu.initialize(director,3);
			battleContainer.resetTime = function(){
				sceneBattle.time = 0;
				sceneTime = 0;
				lastTime = 0;
			}
			battleContainer.restart = function(){
				var bc = battleContainer;
				bc.endBattle = 0;
				sceneBattle.time = 0;
				bc.resetTime();
				bc.emptyChildren();
				bc.initialize(bc.director,bc.currentLevel, bc.userSkill, bc.unlockTower, bc.level, bc.sceneSkillContainer, bc.nextScene, bc.prevScene);
			}
		    var menuBattleContainer;
		    
		    lastTime = sceneBattle.time;
		    sceneBattle.createTimer(sceneBattle.time, Number.MAX_VALUE,
				function (scene_time, timer_time, timertask_instance) {   // timeout

				},
				function (scene_time, timer_time, timertask_instance) {   // tick
				    var bc = battleContainer;

					
				    var dt = scene_time - lastTime;//Khoang thoi gian giua 2 lan cap nhat
				    lastTime = scene_time;
				    t += dt * GAME_SPEED;//Thoi gian delay giua 2 lan cap nhat
				    while (t >= frameTime) {//Chay chi khi thoi gian delay giua 2 lan lon hon 10ms
				        t -= frameTime;//Dung de xac dinh so buoc' tinh toan
				        sceneTime += frameTime;
				        bc.update(director, sceneTime, scene_time);
				    }
				    if (bc.isTimePaused) { this.cancel(); }
					/*
				    if (bc.endBattle != 0) {
						bc.restart();
						menu.initialize(director, 3);
						/*
				        sceneBattle.time = 0;
				        //battleContainer = new CAAT.BattleContainer().initialize(director, 1, [2, 1, 0], [0, 1, 2, 5, 6, 7, 10, 11, 14], 5, sceneSkillContainer, scenMainMenuIndex, sceneMenuIndex);
				        //sceneBattle.emptyChildren();
				        //bc.paused = pausedFunction;
				        bc.endBattle = 0;
				        menu.initialize(director, 3);
				       // sceneBattle.addChild(battleContainer);
				        sceneTime = 0;
				        lastTime = 0;
						* /
				    }
					*/
				},
				function (scene_time, timer_time, timertask_instance) {   // cancel
				    var _this = this;
				    battleContainer.isStart = function () { var ss = sceneBattle.time; lastTime = ss; _this.reset(ss); };
				}
			);
		}
		if (!user.isCompleteTUT()) {
		    var king = new CAAT.MyActor().initialize(director, "An Dương Vương", "king_face", 2, 4);
		    king.setAnimation([4, 5]);
		    var sodier = new CAAT.MyActor().initialize(director, "Lính ghẻ", "sodier_face", 2, 4);
		    sodier.setAnimation([0, 4]);
		    var knight = new CAAT.MyActor().initialize(director, "Coder", "knight_face", 2, 4);
		    knight.setAnimation([6, 7]);
		    var fire = new CAAT.MyActor().initialize(director, "Fire Elemental", "fire_face", 1, 1);
		    var water = new CAAT.MyActor().initialize(director, "Water Elemental", "water_face", 1, 1);
		    var earth = new CAAT.MyActor().initialize(director, "Earth Elemental", "earth_face", 1, 1);
		    var wood = new CAAT.MyActor().initialize(director, "Wood Elemental", "wood_face", 1, 1);
		    var steel = new CAAT.MyActor().initialize(director, "Steel Elemental", "steel_face", 1, 1);
		    var sceneDatas = [
                  {
                      "callback": [{
                          "name": "changeBackground",
                          "arguments": "inCastle_bg"
                      }]
                  },
                 /*
                  {
                      "callback": [{
                          "name": "shakeScreen",
                          "arguments": [20, 30, 20]
                      }]
                  },
                  {
                      "actor": 0,
                      "dialog": "CLGT"
                  },
                  {
                      "actor": 1,
                      "dialog": "We are under attack",
                      "callback": [{
                          "name": "changeBackground",
                          "arguments": "cg1"
                      }]
                  },
               // */
                  {
                      "actor": 0,
                      "dialog": "I need help",
                      "callback": [
                          {
                              "name": "addImage",
                              "arguments": ["king", 100, 300]
                          },
                          {
                              "name": "createChoose",
                              "arguments": {
                                  "choices": ["Fire", "Water", "Earth", "Wood", "Steel"],
                                  "choice1": [
                                      {
                                          "actor": 3,
                                          "dialog": "I am fire element. I will help you"
                                      },
                                      {
                                          "actor": 3,
                                          "dialog": "Nothing imposible"
                                      }
                                  ],
                                  "choice2": [{
                                      "actor": 4,
                                      "dialog": "I am water element. I will help you"
                                  }],
                                  "choice3": [{
                                      "actor": 5,
                                      "dialog": "I am earth element. I will help you"
                                  }],
                                  "choice4": [{
                                      "actor": 6,
                                      "dialog": "I am wood element. I will help you"
                                  }],
                                  "choice5": [{
                                      "actor": 7,
                                      "dialog": "I am steel element. I will help you"
                                  }]
                              }
                          }
                      ]
                  },
                  {
                      "actor": 0,
                      "dialog": ""
                  },
                  {
                      "actor": 0,
                      "dialog": "Ok. Thank for the help",
                      "callback": [{
                          "name": "complete"
                      }]
                  },
                  {}
		    ];
		    var actor = [king, sodier, knight, fire, water, earth, wood, steel];
		    var log = new CAAT.StoryScene().initialize(director, 0, 0, actor, sceneDatas);
		    log.setBounds(0, 0, 800, 600);
		    sceneBattle.addChild(log);
		    log.createTut = function (element) {
		        
		        battleContainer = new CAAT.TUT();
		        sceneBattle.removeChild(log);
		        log.setExpired();
		        //var load_data = new CAAT.Replay();
		        var load_data = null;
		        if (load_data) load_data.load_data(function () { battleContainer.loadingRep = true; console.log(loadObj); }, 'https://dl.dropboxusercontent.com/u/153398256/26_7_2013_10_37_22.json')
		        else battleContainer.loadingRep = false;
		        var elementPP = 5;
		        for (var i = 0; i < element; i++) elementPP += 5 - i;
		        var unlockTower = [element, elementPP];
                
		        //for(var i=0;i<15;i++) unlockTower.push(i);

		        battleContainer.initData(element).initialize(director, 0, [1, 0, 2], unlockTower, 0, sceneSkillContainer, sceneMainMenuIndex, sceneMenuIndex).runTUT();	// 0: map index, skill, trụ đã unlock, level
		        battleLoad(battleContainer);
		    }
		} else {
		    battleContainer = new CAAT.BattleContainer();
		    
		    
		    //var load_data = new CAAT.Replay();
		    var load_data = null;
		    if (load_data) load_data.load_data(function () { battleContainer.loadingRep = true; console.log(loadObj); }, 'https://dl.dropboxusercontent.com/u/153398256/26_7_2013_10_37_22.json')
		    else battleContainer.loadingRep = false;
		    
		    var unlockTower = user.buttressUnlock;
		    var level = user.level;
		    menu.initialize(director, 3);
		    sceneMapContainer.initMap(director, battleContainer,  [1, 0, 2], unlockTower, level, sceneSkillContainer, sceneMainMenuIndex, sceneMenuIndex, battleLoad);
		   // battleContainer.initialize();	// 0: map index, skill, trụ đã unlock, level
		    //for(var i=0;i<15;i++) unlockTower.push(i);	
		    //menu.initialize(director, 3);
		    
		}
    }
}


var loadObj;
