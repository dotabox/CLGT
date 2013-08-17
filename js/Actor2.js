(function () {
    CAAT.Actor2 = function () {
        CAAT.Actor2.superclass.constructor.call(this);
        return this;
    };
	 var __CD =                      CAAT.Foundation.Actor.CACHE_DEEP;

   
		
    CAAT.Actor2.prototype = {  
		 /**
             * Private.
             * Performs the animate method for this ActorContainer and every contained Actor.
             *
             * @param director the CAAT.Foundation.Director object instance that contains the Scene the Actor is in.
             * @param time an integer indicating the Scene time when the bounding box is to be drawn.
             *
             * @return {boolean} is this actor in active children list ??
             */
			lastTime1:0,
			pauseTime:0,
			isTimePaused: false,
			animate2:function (director, time) {

                if (!this.visible) {
                    return false;
                }

                var i;
				
                if (!this.isInAnimationFrame(time)) {
                    this.inFrame = false;
                    this.dirty = true;
                    return false;
                }

                if (this.x !== this.oldX || this.y !== this.oldY) {
                    this.dirty = true;
                    this.oldX = this.x;
                    this.oldY = this.y;
                }
				if (!this.isTimePaused){
                for (i = 0; i < this.behaviorList.length; i++) {
                    this.behaviorList[i].apply(time, this);
                }
				
                if (this.clipPath) {
                    this.clipPath.applyBehaviors(time);
                }
				}
                // transformation stuff.
                this.setModelViewMatrix();

                if (this.dirty || this.wdirty || this.invalid) {
                    if (director.dirtyRectsEnabled) {
                        director.addDirtyRect(this.AABB);
                    }
                    this.setScreenBounds();
                    if (director.dirtyRectsEnabled) {
                        director.addDirtyRect(this.AABB);
                    }
                }
                this.dirty = false;
                this.invalid = false;

                this.inFrame = true;

                if ( this.backgroundImage ) {
                    this.backgroundImage.setSpriteIndexAtTime(time);
                }

                return this.AABB.intersects(director.AABB);
                //return true;
            },
			setScene:function(scene){
			this.scene=scene;
			},
            animate:function (director, time) {
				//time=time/GAME_SPEED;
				var t=time-this.lastTime1;
				if (this.lastTime1==0) t=0;
				this.lastTime1=time;
				
				
                if (!this.visible) {
                    return false;
                }

                this.activeChildren = [];
                var last = null;
				// var active=this.parent.activeChildren;
				// for (x in active) if (active[x].id==this.id)
				 //{console.log(this.actived()}
				 
				if (this.isTimePaused) this.pauseTime+=t;
				
				time=time-this.pauseTime;
				//this.time=time;
				//if (!this.isTimePaused){
                if (false === this.animate2( director, time)) {
                    return false;
                }
				
				//}
                if (this.cached === __CD) {
                    return true;
                }

                this.__validateLayout();
                CAAT.currentDirector.inValidation = false;

                var i, l;

                /**
                 * Incluir los actores pendientes.
                 * El momento es ahora, antes de procesar ninguno del contenedor.
                 */
				 
                var pcl = this.pendingChildrenList;
                for (i = 0; i < pcl.length; i++) {
                    var child = pcl[i];
                    this.addChildImmediately(child.child, child.constraint);
                }

                this.pendingChildrenList = [];
                var markDelete = [];

                var cl = this.childrenList;
                this.size_active = 1;
                this.size_total = 1;
                for (i = 0; i < cl.length; i++) {
                    var actor = cl[i];
                    actor.time = time;
                    this.size_total += actor.size_total;
                    if (actor.animate(director, time)) {
						actor.isTimePaused=this.isTimePaused;
                        this.activeChildren.push(actor);
                        this.size_active += actor.size_active;
                    } else {
                        if (actor.expired && actor.discardable) {
                            markDelete.push(actor);
                        }
                    }
                }

                for (i = 0, l = markDelete.length; i < l; i++) {
                    var md = markDelete[i];
                    md.destroy(time);
                    if (director.dirtyRectsEnabled) {
                        director.addDirtyRect(md.AABB);
                    }
                }

                return true;
            }
	};
    extend(CAAT.Actor2, CAAT.Foundation.ActorContainer);
})();