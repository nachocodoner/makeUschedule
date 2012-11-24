(function(se){
	se.Entities.Task = new Class({
		initialize: function(id){
			this.id = id;
			this.dayOfWeek = null;
			this.since = null;
			this.to = null;
			
			this.additionalTags = [];
		}	
	});
})(se);
