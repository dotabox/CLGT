(function () {
    CAAT.MyActor = function () {
        CAAT.MyActor.superclass.constructor.call(this);
        return this;
    }

    CAAT.MyActor.prototype = {
        director: null,
        face: null,
        name: null,
        changeFPS: 1000,
        initialize: function (director, name, faceName, row, col) {
            this.director = director;
            this.name = name;
            this.face = new CAAT.SpriteImage().initialize(director.getImage(faceName), row, col);
            this.setBackgroundImage(this.face).
                        setAnimationImageIndex([0]).
                        setChangeFPS(this.changeFPS).
                        enableEvents(false);

            return this;
        },

        setAnimation: function (animation) {
            this.setAnimationImageIndex(animation);
            return this;
        }
    }
    extend(CAAT.MyActor, CAAT.Actor);
})();