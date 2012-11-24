var OwnTagManager = new Class({
	initialize: function(){
		this.ownTags = new Array();
		this.idManager = new IdentificationManager();
	},
	load: function(idLocal){
		return this.ownTags[idLocal];
	},
	add: function(){
		var ownTag = new OwnTag();
		var idLocal = this.idManager.generateId();
		
		this.ownTags[idLocal] = ownTag;
		
		return idLocal;
	},
	setName: function(idOwnTag, name){
		this.ownTags[idOwnTag].setName(name);
	},
	setTypeOfTag: function(idOwnTag, idTypeOfTag){
		this.ownTags[idOwnTag].setTypeOfTag(idTypeOfTag);
	},
	modify: function(idLocal, ownTagModified){
		this.ownTags[idLocal] = ownTagModified;
	},
	remove: function(idLocal){
		this.ownTags.splice(idLocal,1);
		this.idManager.removedId(idLocal);
	}
});
