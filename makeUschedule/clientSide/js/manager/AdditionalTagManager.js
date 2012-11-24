(function(se){
	var additionalTags = [];
	var idManager = new se.Managers.IdentificationManager();
	se.Managers.AdditionalTagManager = new Class({
		initialize: function(){
		},
		add: function(name, tagType){
			var idAdditionalTag = idManager.generateId();
			var additionalTag = new se.Entities.AdditionalTag(idAdditionalTag);
			
			this.setName(additionalTag, name);
			this.setTagType(additionalTag, tagType);
			
			additionalTags.push(additionalTag);
			
			return additionalTag;
		},
		update: function(additionalTag, additionalTagUpdatedData){
			this.setName(additionalTag, additionalTagUpdatedData.name);
			this.setTagType(additionalTag, additionalTagUpdatedData.tagType);
			
			return additionalTag;
		},
		remove: function(additionalTag){
			for(var i = 0; i < additionalTags.length; ++i){
				if(additionalTags[i].id == additionalTag.id){
					idManager.removedId(additionalTag.id);
					return additionalTags.splice(i,1)[0];
				}
			}
			return null;
		},
		loadOffline: function(idOffline){
			
		},
		setName: function(additionalTag, name){
			additionalTag.name = name;
		},
		setTagType: function(additionalTag, tagType){
			additionalTag.tagType = tagType;
		}
	});
})(se);
