CAAT.AudioPreloader = function() {

        var descriptor= function(id, path, loader) {

            var me= this;

            this.id=    id;
            this.path=  path;
            this.audio= new Audio();
            this.loader= loader;
            return this;
        };

        descriptor.prototype= {
            id : null,
            path : null,
            audio : null,
            loader : null,

            onload : function(e) {
                this.loader.__onload(this);
                this.audio.onload= null;
                this.audio.onerror= null;
            },

            onerror : function(e) {
                this.loader.__onerror(this);
            },

            load : function() {
				this.audio.addEventListener("canplaythrough1", this.onload(this));
				this.audio.onerror= this.onerror(this);
                this.audio.src= this.path;
				this.audio.load();
				this.audio.preload = "auto";
            },

            clear : function() {
                this.loader= null;

            }
        };
        return {

            /**
             * @lends CAAT.Module.Preloader.Preloader.prototype
             */

            __init : function()   {
                this.elements= [];
                this.baseURL= "";
                return this;
            },

            currentGroup : null,

            /**
             * a list of elements to load.
             * @type {Array.<{ id, audio }>}
             */
            elements:       null,

            /**
             * Callback finished loading.
             */
            cfinished:      null,

            /**
             * Callback element loaded.
             */
            cloaded:        null,

            /**
             * Callback error loading.
             */
            cerrored:       null,

            /**
             * loaded elements count.
             */
            loadedCount:    0,

            baseURL : null,

            addElement : function( id, path ) {
                this.elements.push( new descriptor(id,this.baseURL+path,this));
                return this;
            },

            clear : function() {
                for( var i=0; i<this.elements.length; i++ ) {
                    this.elements[i].clear();
                }
                this.elements= null;
            },

            __onload : function( d ) {
                if ( this.cloaded ) {
                    this.cloaded(d.id);
                }
                this.loadedCount++;
                if ( this.loadedCount===this.elements.length ) {
                    if ( this.cfinished ) {
                        this.cfinished( this.elements );
                    }
                }
            },

            __onerror : function( d ) {
                if ( this.cerrored ) {
                    this.cerrored(d.id);
                }
            },

            setBaseURL : function( base ) {
                this.baseURL= base;
                return this;
            },

            load: function( onfinished, onload_one, onerror ) {

                this.cfinished= onfinished;
                this.cloaded= onload_one;
                this.cerroed= onerror;

                var i;
                for( i=0; i<this.elements.length; i++ ) {
                    this.elements[i].load();
                }

                return this;
            }
        }
    }