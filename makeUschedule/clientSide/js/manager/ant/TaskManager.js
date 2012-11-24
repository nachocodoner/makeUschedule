var TaskManager = new Class({
	initialize: function(){
		this.tasks = new Array();
		this.idManager = new IdentificationManager();
	},
	load: function(idLocal){
		return this.tasks[idLocal];
	},
	add: function(schedule){
		var task = new Task(schedule);
		var idLocal = this.idManager.generateId();
		
		task.idLocal = idLocal;
		this.tasks.push(task);
		
		//this.tasks[idLocal] = task;
		
		//return idLocal;
		
		return task;
	},
	setName: function(idTask ,name){
		/* Comprobaciones si se necesitan */
		this.tasks[idTask].setName(name);
	},
	setDayOfWeek: function(idTask, dayOfWeek){
		this.tasks[idTask].setDayOfWeek(dayOfWeek);
	},
	setSince: function(idTask, since){
		this.tasks[idTask].setSince(since);
	},
	setEnd: function(idTask, end){
		this.tasks[idTask].setEnd(end);
	},
	setOwnTag: function(idTask, idOwnTag){
		this.tasks[idTask].addOwnTag(idOwnTag);
	},
	addAdditionalTag: function(idTask, idAdditionalTag){
		this.tasks[idTask].addAdditionalTag(idAdditionalTag);
	},
	removeAdditionalTag: function(idTask, idAdditionalTag){
		this.tasks[idTask].removeAdditionalTag(idAdditionalTag);
	},
	modify: function(idLocal, taskModified){
		this.tasks[idLocal] = taskModified;
	},
	remove: function(idLocal){
		this.tasks.splice(idLocal,1);
		this.idManager.removeId(idLocal);
	}
});
