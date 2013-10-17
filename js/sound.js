Sound = {
	initialize: function(audioDescriptor){
		this.audioDescriptor = audioDescriptor;
		this.audioObjects =  {};
		for(var i=0;i<audioDescriptor.length;i++){
			this.audioObjects[audioDescriptor[i].id] = audioDescriptor[i].audio;
		}
		this.sfxChannelId = [];
		this.musicChannelId;
		this.sfxLength = 16;
	},
	playSfx: function(soundId){
		var self = this;
		this.sfxChannelId.push(soundId);
		var audio = this.audioObjects[soundId];
		audio._onend = [function(){
			var index = self.sfxChannelId.indexOf(audio);
			self.sfxChannelId.splice(index,1);
		}];
		audio.volume(SFX_VOLUME/100);
		audio.play();
		this.setSfxVolume(SFX_VOLUME);
		//console.log(this.sfxChannelId.length);
		if(this.sfxChannelId.length>this.sfxLength){
			var audio = this.audioObjects[this.sfxChannelId[0]];
			audio.stop();
			self.sfxChannelId.splice(0,1);
		}
	},
	playMusic:function(soundId,endCallback){
		if(this.musicChannelId) this.audioObjects[this.musicChannelId].stop();
		this.musicChannelId = soundId;
		var audio = this.audioObjects[soundId];
		if(endCallback) {			
			audio.loop(false);
			audio._onend = [endCallback];
		}
		else audio.loop(true);
		audio.volume(MUSIC_VOLUME/100);
		audio.play();
		this.setMusicVolume(MUSIC_VOLUME);
		
		
	},
	endSound: function(){
		if(this.musicChannelId) this.audioObjects[this.musicChannelId].stop();
	},
	setSfxVolume: function(value){
		SFX_VOLUME = value;
		for(var i=0;i<this.sfxChannelId.length;i++){
			var audio = this.audioObjects[this.sfxChannelId[i]];
			audio.volume(value/100);
			audio._audioNode[0].volume = value/100;
		}
	},
	setMusicVolume: function(value){
		MUSIC_VOLUME = value;
		var audio = this.audioObjects[this.musicChannelId];
		audio.volume(value/100);
		audio._audioNode[0].volume = (value/100);
	}
}