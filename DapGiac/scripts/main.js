(function(window) {

	var namespace = BKGMDapGiac||{};
	
	var init = function init() {
        
		main();
        
	};
    
    CAAT.DEBUG = 1;
    
    var Actor = CAAT.Foundation.Actor;
    var Behavior = CAAT.Behavior;

	var main = function main() {
        
        var director = new CAAT.Foundation.Director().initialize(
            800, 600,
            document.getElementById('BKGMDAPGIAC')
        );
        
        var scene = director.createScene();
        
        var lastTime = scene.time;
        var slotno = Math.floor(Math.random() * maxNumberOfEnemies+1);
        
        scene.createTimer(scene.time,Number.MAX_VALUE,
            function (scene_time, timer_time, timertask_instance) {   // timeout
                
            },
            function (scene_time, timer_time, timertask_instance) {   // tick

                if (enemies.length>0) {
                    for(var i = 0; i < enemies.length; i++){
                        if (scene_time - enemies[i].time >= 1000) {
                            enemies[i].remove();
                        } else {
                            enemiesNotRemoved.push(enemies[i]);
                        }
                    };
                    enemies = enemiesNotRemoved.slice();
                    enemiesNotRemoved = [];
                }

                if (enemies.length<maxNumberOfEnemies) {
                    if (scene_time-lastTime>=500) {
                        lastTime = scene_time;
                        slotno = Math.floor(Math.random() * maxNumberOfEnemies);
                        while (slots[slotno].hasEnemy){
                            slotno = Math.floor(Math.random() * maxNumberOfEnemies);
                        }
                        enemies.push(new Enemy().init(scene,slotno,20,20,'black'));
                    }
                }
            },
            function (scene_time, timer_time, timertask_instance) {   // cancel
                
            });
        
        CAAT.loop(20);
	};

    var enemies = [];
    var enemiesNotRemoved = [];
    
    var slots = [
        {x: 50, y: 120, hasEnemy: false},
        {x: 100, y: 120, hasEnemy: false},
        {x: 150, y: 120, hasEnemy: false},
        {x: 200, y: 120, hasEnemy: false}
    ];
    var maxNumberOfEnemies = slots.length;
    
    var Enemy = function () {return this;};
    Enemy.prototype = {};
    
    (function(Model){
        Model.init = function(scene,slotno,w,h,color){

            this.scene = scene;

            this.slot = slots[slotno];
            var slot = this.slot;

            this.actor = new Actor()
                .setLocation(slot.x,slot.y)
                .setSize(w,h)
                .setFillStyle(color);

            slot.hasEnemy = true;

            var actor = this.actor;

            var me = this;

            actor.mouseDown = function(e){
                me.remove();
                enemies.splice(enemies.indexOf(me),1);
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

	namespace.init = init;

})(window);