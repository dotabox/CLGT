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
//test commit;
window.onload = function () {
    
	//*
    load();
	//*/
    function load() {
        new CAAT.Module.Preloader.Preloader().
            addElement("monster1", "img/monster1.png").
            addElement("tower1", "img/Tower1.png").
            addElement("towerSprite1", "img/sprite_tower.png").
            addElement("towerEarth1", "img/earth_tower.png").
            addElement("towerEarth2", "img/earth_tower2.png").
            addElement("tile1", "img/tile1.png").
            addElement("bullet1", "img/arrow1.png").            
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
            load(function onAllAssetsLoaded(images) {
                run(images);
            }
        );
    }
    function run(images) {
        CAAT.DEBUG = 1;
        console.log('thanhdeptrai');
        var director = new CAAT.Foundation.Director().initialize(CANVAS_WIDTH, CANVAS_HEIGHT, document.getElementById("canvas"));
        director.setImagesCache(images);
		
		var sceneMenu = director.createScene();
		var sceneBattle = director.createScene();
		var sceneMenuBattle = director.createScene();
        

		var sceneMenuIndex = 0;
		var sceneBattleIndex = 1;
		var sceneMenuBattleIndex = 2;
        var scenMainMenuIndex = 3;
		
		//var battleContainer = new CAAT.BattleContainer().initialize(director,1,"",8,50,200,null, sceneMenuIndex);
		//sceneBattle.addChild(battleContainer);
		var menu = new CAAT.MenuActor().initialize(director, sceneBattleIndex);
		
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
                  "callback" : [{
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
			*/
              {
                  "actor": 0,
                  "dialog": "I need help",
                  "callback": [
                      {
                          "name": "addImage",
                          "arguments" : ["king", 100, 300]
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

        sceneMenu.addChild(menu);
        sceneBattle.addChild(log);

		var lastTime = 0;
		var t = 0;
		var sceneTime = 0;
		var battleContainer;
		log.createTut=function(element){
			battleContainer = new CAAT.TUT();
			sceneBattle.removeChild(log);
			log.setExpired();
			
			//var load_data = new CAAT.Replay();
			var load_data = null;
			if (load_data) load_data.load_data(function () { battleContainer.loadingRep = true; console.log(loadObj); }, 'https://dl.dropboxusercontent.com/u/153398256/26_7_2013_10_37_22.json')
			else battleContainer.loadingRep = false;
			var elementPP = 5; 
			for(var i=0;i<element;i++) elementPP += 5-i ;
			var unlockTower = [element,elementPP];
			//for(var i=0;i<15;i++) unlockTower.push(i);

			battleContainer.initData(element).initialize(director, 0 ,[1,0],unlockTower,5, sceneSkillContainer,scenMainMenuIndex,sceneMenuIndex).runTUT();;	// 0: map index, skill, trụ đã unlock, level

			if (battleContainer.loadingRep !== null) sceneBattle.addChild(battleContainer);
			
			var menuBattleContainer;
			var pausedFunction =function(){
				director.switchToScene(sceneMenuBattleIndex);
				menuBattleContainer = new CAAT.MenuBattleContainer().initialize(battleContainer,null,sceneBattleIndex);
				sceneMenuBattle.emptyChildren();
				sceneMenuBattle.addChild(menuBattleContainer);
			}
			battleContainer.paused = pausedFunction;
			lastTime=sceneBattle.time;
			sceneBattle.createTimer(sceneBattle.time,Number.MAX_VALUE,
				function (scene_time, timer_time, timertask_instance) {   // timeout

				},
				function (scene_time, timer_time, timertask_instance) {   // tick
						var bc = sceneBattle.getChildAt(0);
						
						
						var dt = scene_time - lastTime;//Khoang thoi gian giua 2 lan cap nhat
						lastTime = scene_time;
						t += dt*GAME_SPEED;//Thoi gian delay giua 2 lan cap nhat
						while (t >= frameTime) {//Chay chi khi thoi gian delay giua 2 lan lon hon 10ms
							t -= frameTime;//Dung de xac dinh so buoc' tinh toan
							sceneTime += frameTime;
							bc.update(director, sceneTime,scene_time);
						}
						if (bc.isTimePaused) {this.cancel();}
						if(bc.endBattle!=0){
							sceneBattle.time = 0;
							var tower = [];
							for(var i=0;i<20;i++) tower.push(i);
							battleContainer = new CAAT.BattleContainer().initialize(director, 1 ,[2,1,0],tower,5, sceneSkillContainer,scenMainMenuIndex,sceneMenuIndex);
							sceneBattle.emptyChildren();
							battleContainer.paused=pausedFunction;
							sceneBattle.addChild(battleContainer);
							sceneTime = 0;
							lastTime = 0;
						}
						
				},
				function (scene_time, timer_time, timertask_instance) {   // cancel
					var _this=this;					
					battleContainer.isStart=function(){var ss=sceneBattle.time;lastTime=ss;_this.reset(ss);};
				}
			);
		}
		//main map
		var sceneMap = director.createScene();
        var sceneMapContainer = new CAAT.SceneMapCtn().create(director);
        sceneMap.addChild(sceneMapContainer);

        var sceneGame = director.createScene();
        var sceneGameContainer = new CAAT.SceneGameCtn().create(director);
        sceneGame.addChild(sceneGameContainer);
		
		var sceneSkill = director.createScene();
        var sceneSkillContainer = new CAAT.SceneSkill().create(director);
        sceneSkill.addChild(sceneSkillContainer);
        CAAT.loop(60);
    }
}

var loadObj;
