var BackgroundTypeTagManager = new Class({
	initialize: function(){
		this.BackgroundTypeTags = new Array();
		this.idManager = new IdentificationManager();
	},
	load: function(idLocal){
		return this.BackgroundTypeTags[idLocal];
	},
	add: function(color){
		var BackgroundTypeTag = new BackgroundTypeTag(color);
		var idLocal = this.idManager.generateId();
		
		this.BackgroundTypeTags[idLocal] = BackgroundTypeTag;
	},
	modify: function(idLocal, BackgroundTypeTagModified){
		this.BackgroundTypeTags[idLocal] = BackgroundTypeTagModified;
	},
	remove: function(idLocal){
		this.BackgroundTypeTags.splice(idLocal,1);
		this.idManager.removeId(idLocal);
	}
});
