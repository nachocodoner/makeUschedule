var TextTypeTagManager = new Class({
	initialize: function(){
		this.TextTypeTags = new Array();
		this.idManager = new IdentificationManager();
	},
	load: function(idLocal){
		return this.TextTypeTags[idLocal];
	},
	add: function(color){
		var TextTypeTag = new TextTypeTag(color);
		var idLocal = this.idManager.generateId();
		
		this.TextTypeTags[idLocal] = TextTypeTag;
	},
	modify: function(idLocal, TextTypeTagModified){
		this.TextTypeTags[idLocal] = TextTypeTagModified;
	},
	remove: function(idLocal){
		this.TextTypeTags.splice(idLocal,1);
		this.idManager.removeId(idLocal);
	}
});
