(function(window) {

	var namespace = BKGMDapGiac;
    var game = BKGMDapGiac.game;
    game.point = 0;
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

        // var reset= function(spriteImage, time) {
        //     spriteImage.playAnimation("stand");
        // };
         
        var asset = new CAAT.Foundation.SpriteImage().initializeFromTexturePackerJSON(director.getImage('assets'), assetjson)
            .addAnimation("stand",   ["Symbol 2 instance 10000", "Symbol 2 instance 10001", "Symbol 2 instance 10002", "Symbol 2 instance 10003", "Symbol 2 instance 10004", "Symbol 2 instance 10005", "Symbol 2 instance 10006", "Symbol 2 instance 10007", "Symbol 2 instance 10008", "Symbol 2 instance 10009", "Symbol 2 instance 10010"], 100);
            //.addAnimation("fall",    [0,1,2,3,4,5,6,7], 100, reset);

        var child = new Actor().setBounds(0,0,350,300);
        child.setBackgroundImage(asset);
        child.playAnimation("stand");
        
        var scene = director.createScene();
        scene.addChild(child);
        
        var lastTime = scene.time;
        var slotno = Math.floor(Math.random() * maxNumberOfEnemies+1);
        
        // scene.createTimer(scene.time,Number.MAX_VALUE,
        //     function (scene_time, timer_time, timertask_instance) {   // timeout
        //         game.point = point;
        //     },
        //     function (scene_time, timer_time, timertask_instance) {   // tick

        //         if (enemies.length>0) {
        //             for(var i = 0; i < enemies.length; i++){
        //                 if (scene_time - enemies[i].time >= 10000) {
        //                     enemies[i].remove();
        //                 } else {
        //                     enemiesNotRemoved.push(enemies[i]);
        //                 }
        //             };
        //             enemies = enemiesNotRemoved.slice();
        //             enemiesNotRemoved = [];
        //         }

        //         if (enemies.length < maxNumberOfEnemies) {
        //             if (scene_time-lastTime>=5000) {
        //                 lastTime = scene_time;
        //                 slotno = Math.floor(Math.random() * maxNumberOfEnemies);
        //                 while (slots[slotno].hasEnemy){
        //                     slotno = Math.floor(Math.random() * maxNumberOfEnemies);
        //                 }
        //                 enemies.push(new Enemy().init(scene,slotno,asset));
        //             }
        //         }
        //     },
        //     function (scene_time, timer_time, timertask_instance) {   // cancel
                
        //     });
        
        CAAT.loop(20);
	};

    var enemies = [];
    var enemiesNotRemoved = [];
    
    var slots = [
        {x: 50, y: 50, hasEnemy: false},
        {x: 400, y: 50, hasEnemy: false},
        {x: 50, y: 300, hasEnemy: false},
        {x: 400, y: 300, hasEnemy: false}
    ];

    var width = 323;
    var height = 273;

    var maxNumberOfEnemies = slots.length;
    
    var Enemy = function () {return this;};
    Enemy.prototype = {};
    
    (function(Model){
        Model.init = function(scene,slotno,asset){

            this.scene = scene;

            this.slot = slots[slotno];
            var slot = this.slot;

            this.actor = new Actor()
                .setLocation(slot.x,slot.y)
                .setSize(width,height);
            var actor = this.actor;

            actor.setBackgroundImage(asset);
            actor.playAnimation("stand");

            slot.hasEnemy = true;

            var actor = this.actor;

            var me = this;

            actor.mouseDown = function(e){
                me.remove();
                enemies.splice(enemies.indexOf(me),1);
                point++;
                console.log(point);
            }
            
            this.time = scene.time;
            
            scene.addChild(actor);
            return this;
        }

        Model.remove = function(){
            this.scene.removeChild(this.actor);
            this.slot.hasEnemy = false;
        }
    })(Enemy.prototype);

	namespace.main = main;

})(window);