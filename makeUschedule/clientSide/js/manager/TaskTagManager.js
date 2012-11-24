(function(se){
	var taskTags = [];
	var idManager =  new se.Managers.IdentificationManager();
	se.Managers.TaskTagManager = new Class({
		initialize: function(){
		},
		add: function(name, tagType){
			var idTaskTag = idManager.generateId();
			var taskTag = new se.Entities.TaskTag(idTaskTag);
			
			this.setName(taskTag, name);
			this.setTagType(taskTag, tagType);
			
			taskTags.push(taskTag);
			
			return taskTag;
		},
		/*update: function(idTaskTagOffline, name, tagType){
			for(var i = 0; i < taskTags.length; ++i){
				if(taskTags[i].id == idTaskTagOffline){
					this.setName(taskTags[i], name);
					this.setTagType(taskTags[i], tagType);
					return taskTags[i];
				}
			}
			return null;
		},*/
		update: function(taskTag, name, tagType){
			this.setName(taskTag, name);
			this.setTagType(taskTag, tagType);
			
			return taskTag;
		},
		remove: function(taskTag){
			for(var i = 0; i < taskTags.length; ++i){
				if(taskTags[i].id == taskTag.id){
					idManager.removedId(taskTag.id);
					return taskTags.splice(i,1)[0];
				}
			}
			return null;
		},
		setName: function(taskTag, name){
			taskTag.name = name;
		},
		setTagType: function(taskTag, tagType){
			taskTag.tagType = tagType;
		},
		addTask: function(taskTag, task){
			taskTag.tasks.push(task);	
		},
		removeTask: function(taskTag, task){
			for(var i = 0; i < taskTag.tasks.length; ++i){
				if(taskTag.tasks[i].id == task.id){
					return taskTag.tasks.splice(i,1)[0];
				}
			}
			return null;			
		}		
	});
})(se);
