Sound = {
	playSfx: function(director,soundId){
		director.audioPlay(soundId);
		this.setSfxVolume(director,SFX_VOLUME);
		var workingChannels = director.audioManager.workingChannels;
		workingChannels[workingChannels.length-1].caat_id = soundId;
		if(director.audioManager.channels.length==0) this.cancelPlay(director,workingChannels[0].caat_id);
	},
	playMusic:function(director,soundId,endCallback){
		director.endSound();
		director.audioLoop(soundId);
		this.setMusicVolume(director,MUSIC_VOLUME);
		var loopingChannels = director.audioManager.loopingChannels;
		loopingChannels[loopingChannels.length-1].id = soundId;
		if(endCallback) {
			var loopingChannels = director.audioManager.loopingChannels;
			for(var i=0;i<loopingChannels.length;i++){
				var audio = loopingChannels[i];
				if(audio.id===soundId){
					audio.loop = false;
					audio.addEventListener("ended",endCallback);
					break;
				}
			}
		}
	},
	endSound: function(director){
		director.endSound();
	},
	cancelPlay:function(director,soundId){
		var audioManager = director.audioManager;
		for( var i=0 ; i<audioManager.workingChannels.length; i++ ) {
			var audio= audioManager.workingChannels[i];
			if ( audio.caat_id===soundId ) {
				audio.pause();
				audioManager.channels.push(audio);
				audioManager.workingChannels.splice(i,1);
			}
		}
	},
	setSfxVolume: function(director,value){
		SFX_VOLUME = value;
		var workingChannels = director.audioManager.workingChannels;
		for(var i=0;i<workingChannels.length;i++){
			var audio = workingChannels[i];
			audio.volume = value/100;
		}
	},
	setMusicVolume: function(director,value){
		MUSIC_VOLUME = value;
		var loopingChannels = director.audioManager.loopingChannels;
		for(var i=0;i<loopingChannels.length;i++){
			var audio = loopingChannels[i];
			audio.volume = value/100;
		}
	}
}