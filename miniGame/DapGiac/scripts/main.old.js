(function(window) {

    BKGMDapGiac.game = {};
    var point = 0;
    
    CAAT.DEBUG = 1;
    
    var Actor = CAAT.Foundation.Actor;
    var Behavior = CAAT.Behavior;

	var main = function main(images) {
        
        var director = new CAAT.Foundation.Director().initialize(
            CANVAS_WIDTH, CANVAS_HEIGHT,
            document.getElementById('canvas')
        );
        director.setImagesCache(images);
        console.log(director.getImage('assets'));
         
        BKGMDapGiac.enemyAsset = new CAAT.Foundation.SpriteImage().initializeFromTexturePackerJSON(director.getImage('assets'), assetjson)
            .addAnimation("none",   ["Symbol 2 instance 10000"], 100)
            .addAnimation("in",   ["Symbol 2 instance 10004"], 100)
            .addAnimation("out",   ["Symbol 2 instance 10008"], 100)
            .addAnimation("hit",   ["Symbol 2 instance 10009"], 100);

        var randomRunList = [];
        var timerList = [];

        BKGMDapGiac.game = {
            addActor: function(actor){
                scene.addChild(actor);
            },
            getPlayerDam: function(){
                return 1;
            },
            registerRandomRun: function(fn,period){
                randomRunList.push({
                    fn: fn,
                    period: period,
                    lastTime: scene.time
                });
            },
            registerTimer: function(fn, time){
                timerList.push({
                    fn: fn,
                    time: time,
                    lastTime: scene.time
                });
            },
            addPoint: function(p){
                point += p;
            }
        };

        console.log(BKGMDapGiac.game);

        var scene = director.createScene();
        
        scene.createTimer(scene.time,Number.MAX_VALUE,
            function (scene_time, timer_time, timertask_instance) {   // timeout
                
            },
            function (scene_time, timer_time, timertask_instance) {   // tick

                for (var i = randomRunList.length - 1; i >= 0; i--) {
                    
                    var fn = randomRunList[i].fn;
                    var period = randomRunList[i].period;
                    var lastTime = randomRunList[i].lastTime;
                    if (scene_time-lastTime>=period) {
                        if (Math.floor(Math.random()+0.5)){
                            fn();
                        }
                        lastTime = scene_time;
                    }

                };

                var temp = [];

                for (var i = timerList.length - 1; i >= 0; i--) {
                    
                    var fn = timerList[i].fn;
                    var period = timerList[i].period;
                    var lastTime = timerList[i].lastTime;
                    if (scene_time-lastTime>=period) {
                        fn();
                        lastTime = scene_time;
                    } else {
                        temp.push(timerList[i]);
                    }

                };

                timerList = temp.slice();
                
            },
            function (scene_time, timer_time, timertask_instance) {   // cancel
                
            });
        
        CAAT.loop(20);

        BKGMDapGiac.enemyPopulate();
	};

	BKGMDapGiac.main = main;

})(window);