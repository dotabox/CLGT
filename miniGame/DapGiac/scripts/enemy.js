(function(){

    var slots = [
        {x: 50, y: 50, hasEnemy: false},
        {x: 400, y: 50, hasEnemy: false},
        {x: 50, y: 300, hasEnemy: false},
        {x: 400, y: 300, hasEnemy: false}
    ];

    var width = 0, height = 0;

    var initHp = 1;

    var Actor = CAAT.Foundation.Actor;

    BKGMDapGiac.enemyPopulate = function(){

        var game = BKGMDapGiac.game;
        var getPlayerDam = game.getPlayerDam;
        var registerRandomRun = game.registerRandomRun;
        var asset = BKGMDapGiac.enemyAsset;
        var addPoint = game.addPoint;
        var addActor = game.addActor;
        var registerTimer = game.registerTimer;
        for (var i = 0; i < slots.length; i++){
            var e = (function(){

                var slot, hp;
                var actor = new Actor()
                    .setSize(width, height)
                    .setBackgroundImage(asset)
                    .playAnimation('none');

                var isIn = false;

                var timer;

                function In(){
                    if (!isIn) {
                        console.log('In');
                        actor.playAnimation("in");
                        actor.mouseDown = hit;
                        isIn = true;
                        timer = registerTimer(out, 1000);
                    }
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
                    hp+=1;
                    disappear();
                    addPoint(1);
                }

                return {
                    init: function(slotNo, Hp){
                        console.log(game);
                        slot = slots[slotNo];
                        slot.hasEnemy = true;
                        actor.setLocation(slot.x,slot.y);
                        hp = Hp;
                        addActor(actor);
                        registerRandomRun(In, 3000);
                    }
                }

            })();
            
            e.init(i,initHp);
        }
    }

})();