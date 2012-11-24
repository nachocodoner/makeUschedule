(function(se){
	se.Interface.InterfaceManager = new Class({
		initialize: function(){
		},
		addSchedule: function(schedule/*name, daysOfWeek, since, to, each, tasks*/){
			var schM = new se.Managers.ScheduleManager();		
				
			var scheduleObj = schM.add(schedule.name, schedule.daysOfWeek, schedule.since, schedule.to, schedule.each);

			if(schedule.taskTags != undefined && schedule.taskTags != null){
				for(var i = 0; i < schedule.taskTags.length; ++i){
					var taskTag = this.addTaskTag(scheduleObj, schedule.taskTags[i]);
				}
			}
			
			return scheduleObj;
		},
		drawSchedule: function(schedule){
			var elementDrawer = new se.Interface.ElementDrawer();
			var workareaManager = new se.InterfaceManagers.WorkareaManager();
			
			var scheduleObj = this.addSchedule(schedule);
			
			var workarea = workareaManager.add(scheduleObj);
			workareaManager.loadMenu(workarea);
			workareaManager.loadTasksMenu(workarea);
			workareaManager.loadAdditionalTagMenu(workarea);
			
			elementDrawer.drawSchedule(workarea, scheduleObj);
			
		},
		addTaskTag: function(schedule, taskTag){
			var scheduleManager = new se.Managers.ScheduleManager();
			var taskTagManager = new se.Managers.TaskTagManager();
			var tagTypeManager = new se.Managers.TagTypeManager();
			var taskManager = new se.Managers.TaskManager();
			
			
			var taskTagtagTypeObj = tagTypeManager.add(taskTag.tagType.type, taskTag.tagType.color);
			var taskTagObj = taskTagManager.add(taskTag.name, taskTagtagTypeObj);
			
			scheduleManager.addTaskTag(schedule, taskTagObj);			
			
			for(var i = 0; i < taskTag.tasks.length; ++i){
				var additionalTags = [];
				for(var j = 0; j < taskTag.tasks[i].additionalTags.length; ++j){
					var additionalTag = this.addAdditionalTag(schedule, taskTag.tasks[i].additionalTags[j]);
					additionalTags.push(additionalTag);
				}
				taskTag.tasks[i].additionalTags = additionalTags;
				this.addTask(schedule, taskTagObj, taskTag.tasks[i]);
			}
			
			return taskTagObj;
		},
		drawTaskTag: function(schedule, taskTag){
			var elementDrawer = new se.Interface.ElementDrawer();
			
			var taskTagObj = this.addTaskTag(schedule, taskTag);
			
			elementDrawer.drawTaskTag(schedule, taskTagObj);
			
			return taskTagObj;
		},
		addTask: function(schedule, taskTag, task){
			var scheduleManager = new se.Managers.ScheduleManager();
			var taskManager = new se.Managers.TaskManager();
			var taskTagManager = new se.Managers.TaskTagManager();
			
			var taskObj = taskManager.add(task.dayOfWeek, task.since, task.to, task.additionalTags);
			taskTagManager.addTask(taskTag, taskObj);
			
			return taskObj;
			
		},
		addAdditionalTag: function(schedule, additionalTag){
			var scheduleManager = new se.Managers.ScheduleManager();
			var additionalTagManager = new se.Managers.AdditionalTagManager();
			var tagTaskManager = new se.Managers.TagTypeManager();
			
			var AdditionalTagTypeObj = tagTaskManager.add(additionalTag.tagType.type, additionalTag.tagType.color);
			var additionalTag = additionalTagManager.add(additionalTag.name, AdditionalTagTypeObj);
			scheduleManager.addAdditionalTag(schedule, additionalTag);
			
			return additionalTag;
		},
		drawAdditionalTag: function(schedule, additionalTag){
			var elementDrawer = new se.Interface.ElementDrawer();
			
			var additionalTagObj = this.addAdditionalTag(schedule, additionalTag);
			
			elementDrawer.drawAdditionalTag(schedule, additionalTagObj);
		},
		addAdditionalTagToTask: function(schedule, task, additionalTag){
			var taskManager = new se.Managers.TaskManager();
			taskManager.addAdditionalTag(task, additionalTag);
		},
		drawAdditionalTagToTask: function(schedule, task, additionalTag){
			var elementDrawer = new se.Interface.ElementDrawer();
			
			this.addAdditionalTagToTask(schedule, task, additionalTag);
			
			elementDrawer.drawAdditionalTag(schedule ,task , additionalTag);
		},
		drawTask: function(schedule, taskTag, task){
			var elementDrawer = new se.Interface.ElementDrawer();
		
			var taskObj = this.addTask(schedule, taskTag, task);
			
			elementDrawer.drawTask(schedule, taskTag, taskObj);
		},
		addTaskToTaskTag: function(schedule, taskTag, task){
			
		},
		removeTaskTag: function(schedule, taskTag){
			var scheduleManager = new se.Managers.ScheduleManager();
			var taskTagManager = new se.Managers.TaskTagManager();
			
			for(var i = 0; i < taskTag.tasks.length; ++i){
				this.removeTask(schedule, taskTag, taskTag.tasks[i]);
			}
			
			scheduleManager.removeTaskTag(schedule, taskTag);
			var taskTagRemoved = taskTagManager.remove(taskTag);
			
			return taskTagRemoved;
		},
		undrawTaskTag: function(schedule, taskTag){
			var elementDrawer = new se.Interface.ElementDrawer();
			
			var taskTagRemoved = this.removeTaskTag(schedule, taskTag);
			
			for(var i = 0; i < taskTagRemoved.tasks.length; ++i){
				elementDrawer.undrawTask(schedule, taskTagRemoved, taskTagRemoved.tasks[i]);
			}
						
			elementDrawer.undrawTaskTag(schedule, taskTagRemoved);
		},
		updateTaskTag: function(schedule, taskTag, taskTagUpdatedData){
			var taskTagManager = new se.Managers.TaskTagManager();
			var tagTypeManager = new se.Managers.TagTypeManager();
			
			var tagType = tagTypeManager.update(taskTag.tagType.id, taskTagUpdatedData.tagType.type, taskTagUpdatedData.tagType.color); 
			
			var taskTagObj = taskTagManager.update(taskTag, taskTagUpdatedData.name, tagType);
			
			return taskTagObj;
		},
		redrawTaskTag: function(schedule, taskTag ,taskTagUpdatedData){
			var elementDrawer = new se.Interface.ElementDrawer();
			
			var taskTagUpdated = this.updateTaskTag(schedule, taskTag, taskTagUpdatedData);
			elementDrawer.redrawTaskTag(schedule, taskTagUpdated);
			
			return taskTagUpdated;
		},
		updateTask: function(schedule, taskTag, task, taskUpdatedData){
			var taskManager = new se.Managers.TaskManager();
			
			var taskUpdated = taskManager.update(task, taskUpdatedData);
			
			return taskUpdated;
		},
		redrawTask: function(schedule, taskTag, task, taskUpdatedData){
			var elementDrawer = new se.Interface.ElementDrawer();
			
			var taskUpdated = this.updateTask(schedule, taskTag, task, taskUpdatedData);
			elementDrawer.redrawTaskTag(schedule, taskTag, taskUpdated);
			
			return taskUpdated;
		},
		removeTask: function(schedule, taskTag, task){
			var taskManager = new se.Managers.TaskManager();
			var taskTagManager = new se.Managers.TaskTagManager();
			
			var taskRemoved = taskManager.remove(task);
			taskTagManager.removeTask(taskTag, task);
			
			return taskRemoved;
		},
		undrawTask:  function(schedule, taskTag, task){
			var elementDrawer = new se.Interface.ElementDrawer();
			
			var taskRemoved = this.removeTask(schedule, taskTag, task);
			elementDrawer.undrawTask(schedule, taskTag, task);
		},
		updateAdditionalTag: function(schedule, additionalTag, additionalTagUpdatedData){
			var additionalTagManager = new se.Managers.AdditionalTagManager();
			var tagTypeManager = new se.Managers.TagTypeManager();
			
			var tagType = tagTypeManager.update(additionalTag.tagType.id, additionalTagUpdatedData.tagType.type, additionalTagUpdatedData.tagType.color);
			additionalTagUpdatedData.tagType = tagType;	
			var additionalTagUpdated = additionalTagManager.update(additionalTag, additionalTagUpdatedData);
			
			return additionalTagUpdated;
		},
		redrawAdditionalTag: function(schedule, additionalTag, additionalTagUpdatedData){
			var elementDrawer = new se.Interface.ElementDrawer();
			
			var additionalTagUpdated = this.updateAdditionalTag(schedule, additionalTag, additionalTagUpdatedData);
			
			elementDrawer.redrawAdditionalTag(schedule, additionalTagUpdated);
			
			return additionalTagUpdated;
		},
		removeAdditionalTag: function(schedule, additionalTag){
			var scheduleManager = new se.Managers.ScheduleManager();
			var additionalTagManager = new se.Managers.AdditionalTagManager();
			var tagTypeManager = new se.Managers.TagTypeManager();
			var taskManager = new se.Managers.TaskManager();
			
			for(var i = 0; i < schedule.taskTags.length; ++i){
				for(var j = 0; j < schedule.taskTags[i].tasks.length; ++j){
					if(schedule.taskTags[i].tasks[j].additionalTags.indexOf(additionalTag) != -1){
						taskManager.removeAdditionalTag(schedule.taskTags[i].tasks[j], additionalTag);
					}
				}
			}
			
			scheduleManager.removeAdditionalTag(schedule, additionalTag);
			tagTypeManager.remove(additionalTag.tagType);
			var additionalTagRemoved = additionalTagManager.remove(additionalTag);
			
			return additionalTagRemoved;
		},
		undrawAdditionalTag: function(schedule, additionalTag){
			var elementDrawer = new se.Interface.ElementDrawer();
			
			var additionalTagRemoved = this.removeAdditionalTag(schedule, additionalTag);
			
			elementDrawer.undrawAdditionalTag(schedule, additionalTagRemoved);
		}
	});


})(se);
