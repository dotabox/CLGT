(function () {
    CAAT.User = function () {
        return (this);
    }
    CAAT.User.prototype = {
        init: function (id, userID, level, exp, totalTime, recentTime, buttressUnlock, achievement) {
            this.id = id;
            this.userID = userID;
            this.level = level;
            this.exp = exp;
            this.totalTime = totalTime;
            this.recentTime = recentTime;
            this.buttressUnlock = buttressUnlock;
            this.achievement = achievement;
            return this;
        },
        isCompleteTUT: function () {
            if (this.level > 0) return true;
            else return false;
        }
    }
    
})();

(function () {
    CAAT.InfoUserMap = function () {
        return (this);
    }
    CAAT.InfoUserMap.prototype = {
        init: function (mapID, highscore, star, times) {
            this.mapID = mapID;
            this.highscore = highscore;
            this.star = star;
            this.times = times;
            return this;
        }

    }

})();

(function () {
    CAAT.InfoUserMapSpecial = function () {
        CAAT.InfoUserMapSpecial.superclass.constructor.call(this);
        return (this);
    }
    CAAT.InfoUserMapSpecial.prototype = {
        init: function (id, userID, mapID, highscore, star, times) {
            this.id = id;
            this.userID = userID;
            this.mapID = mapID;
            this.highscore = highscore;
            this.star = star;
            this.times = times;
            return this;
        }

    }
    extend(CAAT.InfoUserMapSpecial, CAAT.InfoUserMap);
})();