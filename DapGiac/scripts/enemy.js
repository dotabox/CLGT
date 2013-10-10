(function(){

    var slots = [
        {x: 50, y: 50, hasEnemy: false},
        {x: 400, y: 50, hasEnemy: false},
        {x: 50, y: 300, hasEnemy: false},
        {x: 400, y: 300, hasEnemy: false}
    ];
    var width = 0, height = 0;
    var initHp = 1;

    var scene = BKGMDapGiac.scene;
    var game = BKGMDapGiac.game;
    var getPlayerDam = game.getPlayerDam;
    var registerRandomRun = game.registerRandomRun;
    var asset = BKGMDapGiac.enemyAsset;

    for (var i = 0; i < slots.length; i++){
        var e = {};
        e.prototype = EnemyPrototype;
        e.init(i,initHp);
    }

    var EnemyPrototype = (function(){

        var scene, slot, hp;
        var actor = new Actor()
            .setSize(width, height)
            .setBackgroundImage(asset);
            .playAnimation("none");

        var isIn = false;

        function in(){
            actor.playAnimation("in");
            actor.mouseDown = hit;
            isIn = true;
        }

        function out(){
            actor.playAnimation("out");
            disappear();
        }

        function hit(){
            actor.playAnimation("hit");
            lostHp(getPlayerDam());
        }

        function disappear(){
            actor.mouseDown = {};
            slot.hasEnemy = false;
            isIn = false;
        }

        function lostHp(Hp){
            hp -= Hp;
            if (hp<=0) die();
        }

        function die(){
            disappear();
            game.addPoint(1);
        }

        return {
            init: function(slotNo, Hp){
                scene = Scene;
                slot = slots[slotNo];
                slot.hasEnemy = true;
                actor.setLocation(slot.x,slot.y);
                hp = Hp;
                registerRandomRun(in);
            }
        }

    })();

}