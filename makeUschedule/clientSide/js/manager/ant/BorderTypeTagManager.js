var BorderTypeTagManager = new Class({
	initialize: function(){
		this.BorderTypeTags = new Array();
		this.idManager = new IdentificationManager();
	},
	load: function(idLocal){
		return this.BorderTypeTags[idLocal];
	},
	add: function(color){
		var BorderTypeTag = new BorderTypeTag(color);
		var idLocal = this.idManager.generateId();
		
		this.BorderTypeTags[idLocal] = BorderTypeTag;
	},
	modify: function(idLocal, BorderTypeTagModified){
		this.BorderTypeTags[idLocal] = BorderTypeTagModified;
	},
	remove: function(idLocal){
		this.BorderTypeTags.splice(idLocal,1);
		this.idManager.removeId(idLocal);
	}
});
