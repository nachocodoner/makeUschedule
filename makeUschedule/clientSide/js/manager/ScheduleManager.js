(function(se){
	var schedules = [];
	var idManager = new se.Managers.IdentificationManager();
	se.Managers.ScheduleManager = new Class({
		initialize: function(){
		},
		add: function(name, daysOfWeek, since, to, each){
			var idSchedule = idManager.generateId();
			var schedule = new se.Entities.Schedule(idSchedule);
			
			schedules.push(schedule);
			
			this.setName(schedule, name);
			this.setDaysOfWeek(schedule, daysOfWeek);
			this.setTimes(schedule, since, to, each);
			
			return schedule;
		},
		setName: function(schedule ,name){
			/* Comprobaciones si se necesitan */
			schedule.name = name;
		},
		setDaysOfWeek: function(schedule, daysOfWeek){
			schedule.daysOfWeek = daysOfWeek;
		},
		setSince: function(schedule, since){
			schedule.since = se.Util.timeToMinutes(since);
		},
		setTo: function(schedule, to){
			schedule.to = se.Util.timeToMinutes(to);
		},
		setEach: function(schedule, each){
			schedule.each = se.Util.timeToMinutes(each);
		},
		setTimes: function(schedule, since, to, each){
			this.setSince(schedule, since);
			this.setTo(schedule, to);
			this.setEach(schedule, each);
		},
		addTaskTag: function(schedule, taskTag){
			schedule.taskTags.push(taskTag);
		},
		addAdditionalTag: function(schedule, additionalTag){
			schedule.additionalTags.push(additionalTag);
		},
		/*removeTaskTag: function(schedule, idTaskTag){
			var end = false;
			for(var i = 0; i < schedule.taskTags.length && !end; ++i){
				if(schedule.taskTags[i].id == idTaskTag){
					schedule.taskTags.splice(i,1);
					end = true;
				}
			}
		},*/
		removeAdditionalTag: function(schedule, additionalTag){
			return schedule.additionalTags.splice(schedule.additionalTags.indexOf(additionalTag), 1)[0];
		},
		getAdditionalTag: function(schedule, idOffline){
			for(var i = 0; i < schedule.additionalTags.length; ++i){
				if(schedule.additionalTags[i].id == idOffline) return schedule.additionalTags[i];
			}
			
			return null;
		},
		removeTaskTag: function(schedule, taskTag){
			for(var i = 0; i < schedule.taskTags.length; ++i){
				if(schedule.taskTags[i].id == taskTag.id){
					return schedule.taskTags.splice(i,1)[0];
				}
			}
			return null;
		}
	});
})(se);
