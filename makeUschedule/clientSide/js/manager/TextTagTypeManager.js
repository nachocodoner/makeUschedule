(function(se){
	var textTagTypes = [];
	se.Managers.TextTagTypeManager = new Class({
		initialize: function(){
		},
		add: function(idTagType, color){
			var textTypeTag = new se.Entities.TextTypeTag(idTagType);
			
			this.setColor(textTypeTag, color);
			
			textTagTypes.push(textTypeTag);
			
			return textTypeTag;
		},
		setColor: function(textTypeTag, color){
			textTypeTag.color = color;
		}
	});
})(se);
