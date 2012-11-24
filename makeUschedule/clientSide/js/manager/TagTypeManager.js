(function(se){
	var tagTypes = [];
	var idManager = new se.Managers.IdentificationManager();
	se.Managers.TagTypeManager = new Class({
		initialize: function(){
		},
		add: function(type, color){
			var idTypeTag = idManager.generateId();
			switch(type){
				case 'background':
					var backgroundTagTypeManager = new se.Managers.BackgroundTagTypeManager();
					tagTypeObj = backgroundTagTypeManager.add(idTypeTag, color);
					break;
				case 'text':
					var textTagTypeManager = new se.Managers.TextTagTypeManager();
					tagTypeObj = textTagTypeManager.add(idTypeTag, color);
					break;
				case 'border':
					var borderTagTypeManager = new se.Managers.BorderTagTypeManager();
					tagTypeObj = borderTagTypeManager.add(idTypeTag, color);
					break;
			}
			
			tagTypes.push(tagTypeObj);
			
			return tagTypeObj;
		},
		update: function(idTagTypeOffline ,type, color){
			this.remove(idTagTypeOffline);
			return this.add(type, color);
		},
		remove: function(idTagTypeOffline){
			idManager.removedId(idTagTypeOffline);
			for(var i = 0; i < tagTypes.length; ++i){
				if(tagTypes[i].id == idTagTypeOffline){
					return tagTypes.splice(i,1);
				}
			}
				return null;
		}
	});
})(se);
