(function(se){
	se.Entities.Schedule = new Class({
		initialize: function(id){
			this.id = id;
			this.name = null;
			this.daysOfWeek = [];
			this.since = null;
			this.to = null;
			this.each = null;
			
			this.nameDaysOfWeek = null;
			
			this.taskTags = [];
			this.additionalTags = [];
		}
	});
})(se);
