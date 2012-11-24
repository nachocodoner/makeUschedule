(function(se){
	var backgroundTagTypes = [];
	se.Managers.BackgroundTagTypeManager = new Class({
		initialize: function(){
		},
		add: function(idTagType, color){
			var backgroundTypeTag = new se.Entities.BackgroundTypeTag(idTagType);
			
			this.setColor(backgroundTypeTag, color);
			
			backgroundTagTypes.push(backgroundTypeTag);
			
			return backgroundTypeTag;
		},
		setColor: function(backgroundTypeTag, color){
			backgroundTypeTag.color = color;
		}
	});
})(se);
