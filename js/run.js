window.addEventListener('load', eventWindowLoaded, false);

function eventWindowLoaded() {
    load();
    function load() {
        new CAAT.Module.Preloader.Preloader().
            addElement("menu_button", "img/menu_button.png").
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
        console.log('run');
        var director = new CAAT.Director().initialize(800, 600, document.getElementById("canvas"));
        director.setImagesCache(images);
        var scene = director.createScene();
        var temp = new CAAT.MenuActor().initialize(director, 1);

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
        var battleScene = director.createScene();
        var log = new CAAT.StoryScene().initialize(director, 0, 0, actor, sceneDatas);
        log.setBounds(0, 0, 800, 600);

        scene.addChild(temp);
        battleScene.addChild(log);

        CAAT.loop(1);
    }
}