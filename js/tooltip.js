(function () {
	CAAT.Tooltip = function(){
		CAAT.Tooltip.superclass.constructor.call(this);
		return(this);
	}
	CAAT.Tooltip.prototype = {
		initialize: function(director,type,argTooltip){ // type: 0 = "guide",1 = "tower",2 = "skill"
			var self = this;
			var width = 200;
			
			this.director = director;
			this.reset(type,argTooltip);
			var textActor = new CAAT.MyTextActor().initialize(director,this.text,width).setFontSize(20).setTextFillStyle("#0FF");
			this.textActor = textActor;
			this.addChild(textActor);
			
			var headTextActor = new CAAT.MyTextActor().initialize(director,this.headText,width).setFontSize(25).setTextFillStyle("#0FF").setFontStyle("Bold");
			this.headTextActor = headTextActor;
			this.addChild(headTextActor);
			this.setBounds(director.width-width,director.height/2-textActor.height,width,textActor.height+10);
			this.fillStyle = "#00F";
			this.alpha = 0.5;
			this.enableEvents(false);
			this.hide();
			return this;
		},
		setPosition: function(positionIndex){
			this.positionIndex = positionIndex;
			switch(positionIndex){
				case 0:
					this.setLocation(this.director.width-this.width,this.director.height/2-this.textActor.height);
					break;
				case 1:
					this.setLocation(0,this.director.height/5);
					break;
			}
		},
		reset: function(type,argTooltip){
			this.text = "";
			this.headText = "";
			switch(type){
				case 0:
					this.text += (typeof argTooltip == "string")?argTooltip:argTooltip[LANGUAGE];
					break;
				case 1:
					var tower = data.Tower[argTooltip];
					this.headText += tower.Name[LANGUAGE];
					(LANGUAGE)?this.headText+=" Tower":this.headText = "Trụ " + this.headText;
					this.text += "\n\n";
					this.text += ["Giá: ","Price: "][LANGUAGE] + tower.Price + "\n";
					this.text += tower.Description[LANGUAGE];
					break;
				case 2:
					var skill = data.UserSkill[argTooltip];
					this.headText += skill.Name[LANGUAGE];
					this.text += "\n\n"+["Thời gian hồi: ","Cooldown: "][LANGUAGE] + ((skill.CoolDown/1000)<<0) +[" giây.",[" second."]][LANGUAGE]+ "\n";
					this.text += skill.Description[LANGUAGE];
					break;
			}
			if(this.textActor){
				this.headTextActor.setText(this.headText);
				for (var i=0;i<this.headTextActor.lineNumber;i++) this.text = "\n"+ this.text;
				this.textActor.setText(this.text);
				this.height = this.textActor.height+10;
			}
			this.show();
		},
		show: function(){
			this.setVisible(true);
		},
		hide: function(){
			this.setVisible(false);
		}
	}
	extend(CAAT.Tooltip, CAAT.Foundation.ActorContainer);
})();