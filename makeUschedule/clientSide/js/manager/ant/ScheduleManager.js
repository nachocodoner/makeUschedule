var ScheduleManager = new Class({
	initialize: function(){
		this.schedules = new Array();
		this.idManager = new IdentificationManager();
	},
	add: function(){
		var idLocal = this.idManager.generateId();
		
		var sch = new Schedule();
		this.schedules[idLocal] = sch;
		
		return idLocal;		
	},
	setName: function(idSchedule ,name){
		/* Comprobaciones si se necesitan */
		this.schedules[idSchedule].setName(name);
	},
	setDayOfWeek: function(idTask, dayOfWeek){
		this.schedules[idSchedule].setDayOfWeek(dayOfWeek);
	},
	setSince: function(idTask, since){
		this.schedules[idSchedule].setSince(since);
	},
	setEnd: function(idSchedule, end){
		this.schedules[idSchedule].setEnd(end);
	},
	setEach: function(idSchedule, each){
		this.schedules[idSchedule].setEach(each);
	},
	addTask: function(idSchedule, idTask){
		this.schedules[idSchedule].addTask(idTask);
	},
	removeTask: function(idSchedule, idTask){
		this.schedules[idSchedule].removeTask(idTask);
	}
});
