(function(se){
	se.Entities.TaskTag = new Class({
		initialize: function(id){
			this.id = id;
			this.name = null;
			this.tagType = {};
			
			this.tasks = [];
		}	
	});
})(se);
