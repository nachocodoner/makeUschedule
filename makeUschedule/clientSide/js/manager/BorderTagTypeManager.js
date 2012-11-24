(function(se){
	var borderTagTypes = [];
	se.Managers.BorderTagTypeManager = new Class({
		initialize: function(){
		},
		add: function(idTagType, color){
			var borderTypeTag = new se.Entities.BorderTypeTag(idTagType);
			
			this.setColor(borderTypeTag, color);
			
			borderTagTypes.push(borderTypeTag);
			
			return borderTypeTag;
		},
		setColor: function(borderTypeTag, color){
			borderTypeTag.color = color;
		}
	});
})(se);
