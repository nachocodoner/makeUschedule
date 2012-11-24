var AditionalTagManager = new Class({
	initialize: function(){
		this.additionalTags = new Array();
		this.idManager = new IdentificationManager();
	},
	load: function(idLocal){
		return this.additionalTags[idLocal];
	},
	add: function(){
		var additionalTag = new AditionalTag();
		var idLocal = this.idManager.generateId();
		
		this.additionalTags[idLocal] = additionalTag;
		
		return idLocal;
	},
	setName: function(idAdditionalTag, name){
		this.additionalTags[idAdditionalTag].setName(name);
	},
	setTypeOfTag: function(idAdditionalTag, idTypeOfTag){
		this.additionalTags[idAdditionalTag].setTypeOfTag(idTypeOfTag);
	},
	join2Task: function(idAdditionalTag, idTask){
		this.additionalTags[idAdditionalTag].join2Task(idTask);
	},
	unbind2Task: function(idAdditionalTag, idTask){
		this.additionalTags[idAdditionalTag].unbindTask(idTask);
	},
	modify: function(idLocal, additionalTagModified){
		this.additionalTags[idLocal] = additionalTagModified;
	},
	remove: function(idLocal){
		this.additionalTags.splice(idLocal,1);
		this.idManager.removedId(idLocal);
	}
});
