(function(se){
	var tasks = [];
	var idManager = new se.Managers.IdentificationManager();
	se.Managers.TaskManager = new Class({
		initialize: function(){
		},
		add: function(dayOfWeek, since, to, additionalTags){
			var idTask = idManager.generateId();
			var task = new se.Entities.Task(idTask);
			
			this.setDayOfWeek(task, dayOfWeek);
			this.setSince(task, since);
			this.setTo(task, to);
			
			for(var i = 0; i < additionalTags.length; ++i){
				this.addAdditionalTag(task, additionalTags[i]);
			}
			
			tasks.push(task);
			
			return task;
		},
		update: function(task, taskUpdatedData){
			this.setDayOfWeek(task, taskUpdatedData.dayOfWeek);
			this.setSince(task, taskUpdatedData.since);
			this.setTo(task, taskUpdatedData.to);
			
			task.additionalTags= [];
			for(var i = 0; i < taskUpdatedData.additionalTags.length; ++i){
				this.addAdditionalTag(task, taskUpdatedData.additionalTags[i]);
			}
			
			return task;
		},
		remove: function(task){
			for(var i = 0; i < tasks.length; ++i){
				if(tasks[i].id == task.id){
					idManager.removedId(task.id);
					return tasks.splice(i,1)[0];
				}
			}
			return null;
		},
		setDayOfWeek: function(task, dayOfWeek){
			task.dayOfWeek = se.Util.dayOfWeekToNumber(dayOfWeek);
		},
		setSince: function(task, since){
			task.since = se.Util.timeToMinutes(since);		
		},
		setTo: function(task, to){
			task.to = se.Util.timeToMinutes(to);		
		},
		addAdditionalTag: function(task, additionalTag){
			task.additionalTags.push(additionalTag);		
		},
		removeAdditionalTag: function(task, additionalTag){
			return task.additionalTags.splice(task.additionalTags.indexOf(additionalTag), 1)[0];		
		}
		
	});
})(se);
