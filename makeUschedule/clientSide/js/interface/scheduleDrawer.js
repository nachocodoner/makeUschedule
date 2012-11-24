(function(se){
	var gridDisplayWidth;
	var gridDisplayHeight;
	var dayOfWeekLiWidth;
	var timeLiHeight;
	var borderLiDayOfWeekWidth;
	var borderLiTimeWidth;
	
	var nameDaysOfWeek;
	
	se.Interface.ScheduleDrawer = new Class({
		initialize: function(){
			
		},
		drawSchedule: function(workarea, schedule){
			var scheduleElement = new Element('div',{
				'id': 'schedule'+schedule.id,
				'class': 'schedule'
			});
			var weekDaysTasks = new Element('div',{
				'class': 'weekDaysTasks'
			});
			var tasksDisplay = new Element('div',{
				'class': 'tasksDisplay'
			});
			var gridDisplay = new Element('canvas',{
				'class': 'scheduleDisplay'
			});
			
			weekDaysTasks.inject(scheduleElement);
			tasksDisplay.inject(weekDaysTasks);
			gridDisplay.inject(tasksDisplay);
			
			scheduleElement.inject(workarea.display);
			
			this.modifyScheduleDaysOfWeek(schedule);
			this.modifyScheduleTimes(schedule);
			this.reloadGridSchedule(schedule);
			
			var objDaysOfWeek = $$("#schedule"+schedule.id+" #weekDaysTasks #daysOfWeek")[0];
			var objTimes = $$("#schedule"+schedule.id+" #hours")[0];
			
			$("schedule"+schedule.id).setStyle('width', objDaysOfWeek.getSize().x + objTimes.getSize().x);
		},
		reloadGridSchedule: function(schedule){
			var scheduleDiv = $("schedule"+schedule.id);
			var gridDisplay = scheduleDiv.getElements('.scheduleDisplay')[0];
			
			var objDaysOfWeek = $$("#schedule"+schedule.id+" .weekDaysTasks .daysOfWeek")[0];
			var objTimes = $$("#schedule"+schedule.id+" .hours")[0];
			
			gridDisplayWidth = objDaysOfWeek.getSize().x;
			gridDisplayHeight = objTimes.getSize().y-objTimes.getStyle('padding-top').toInt();
			gridDisplay.set('width', gridDisplayWidth);
			gridDisplay.set('height', gridDisplayHeight);
			
			var ctx = gridDisplay.getContext('2d');
			ctx.strokeStyle = '#EEE';
			
			var timeRows = (schedule.to - schedule.since)/schedule.each;
						 
			var timeLi = objTimes.getElements('li')[0];
			borderLiTimeWidth = timeLi.getStyle('border-width').toInt();
			timeLiHeight = timeLi.getSize().y;
			
			for(var i = 0, y = timeLiHeight; i <= timeRows; i++, y+=timeLiHeight){
			 ctx.beginPath();
			 ctx.moveTo(0, y+0.5-borderLiTimeWidth);
			 ctx.lineTo(gridDisplayWidth, y+0.5-borderLiTimeWidth);
			 ctx.stroke();
			}
			
			var dayOfWeekLi = objDaysOfWeek.getElements('li')[0];
			borderLiDayOfWeekWidth = dayOfWeekLi.getStyle('border-width').toInt();
			dayOfWeekLiWidth = dayOfWeekLi.getSize().x;
			
			
			for(var i = 0, x = dayOfWeekLiWidth; i <= timeRows; i++, x+=dayOfWeekLiWidth){
			 ctx.beginPath();
			 ctx.moveTo(x+0.5-borderLiDayOfWeekWidth, 0);
			 ctx.lineTo(x+0.5-borderLiDayOfWeekWidth, gridDisplayHeight-borderLiDayOfWeekWidth);
			 ctx.stroke();
			}
		},
		modifyScheduleDaysOfWeek: function(schedule){
			var langManager = new se.Managers.MultiLangManager();
			nameDaysOfWeek = [langManager._("monday"), langManager._("tuesday"), langManager._("wednesday"), langManager._("thursday"), langManager._("friday"), langManager._("saturday"), langManager._("sunday")];
			schedule.nameDaysOfWeek = se.Util.booleansToDaysOfWeek(schedule.daysOfWeek, nameDaysOfWeek);
			
			var data = {
				schedule: {
					daysOfWeek : schedule.nameDaysOfWeek
				}
			};
			
			var objSchedule = $$("#schedule"+schedule.id+" .weekDaysTasks")[0];
			
			var htmlTemplate =  tmpl("scheduleDaysOfWeekTemplate", data);
			htmlTemplate = htmlTemplate + objSchedule.get('html');
			
			objSchedule.set('html', htmlTemplate);			
		},
		modifyScheduleTimes: function(schedule){
			var times = se.Util.getArrayTimes(schedule.since, schedule.to, schedule.each);
			
			var data = {
				schedule: {
					times : times
				}
			};
			
			var scheduleDiv = $("schedule"+schedule.id);
			
			var htmlTemplate =  tmpl("scheduleHoursTemplate", data);
			htmlTemplate = htmlTemplate + scheduleDiv.get('html');
			
			scheduleDiv.set('html', htmlTemplate);
		},
		drawTaskTag: function(schedule, taskTag){
			var scheduleElement = $("schedule"+schedule.id);
			for(var i = 0; i < taskTag.tasks.length; ++i){
				this.drawTask(schedule, taskTag.tasks[i]);
				
				var nameSpan = new Element('span',{
					'html': taskTag.name
				});
				var taskElement = scheduleElement.getElementById("task"+taskTag.tasks[i].id);
				
				nameSpan.inject(taskElement, 'bottom');
				
				this.applyTagType(schedule, taskTag.tasks[i], taskTag.tagType);
				
				for(var j = 0; j < taskTag.tasks[i].additionalTags.length; ++j){
					this.drawAdditionalTag(schedule, taskTag.tasks[i], taskTag.tasks[i].additionalTags[j]);
				}
			}
			
		},
		drawTask: function(schedule, task){
			var taskDiv = new Element('div',{
				'id': "task"+task.id	
	    	});
	    	taskDiv.set('class', 'task');
	    	
	    	var multTopSince = (task.since - schedule.since)/schedule.each;
	    	var multTopTo = (task.to - schedule.since)/schedule.each;
	    	var multLeft = schedule.nameDaysOfWeek.indexOf(nameDaysOfWeek[task.dayOfWeek]);
	    	
	    	var topTask = multTopSince*timeLiHeight;
	    	var leftTask = dayOfWeekLiWidth*multLeft;
	    	var widthTask = dayOfWeekLiWidth-borderLiDayOfWeekWidth;
	    	var heightTask = (multTopTo*timeLiHeight)-topTask-borderLiTimeWidth;
	    	
	    	taskDiv.setStyles({
	    		top: topTask,
	    		left: leftTask,
	    		width: widthTask,
	    		height: heightTask
	    	});
	    	
	    	var scheduleTasksDisplay = $("schedule"+schedule.id).getElementById('tasksDisplay');
	    	taskDiv.inject(scheduleTasksDisplay, 'bottom');
		},
		addAdditionalTag: function(schedule, task, additionalTag){
			this.applyTagType(schedule ,task, additionalTag.tagType);
		},
		applyTagType: function(schedule, task, tagType){
			var scheduleElement = $("schedule"+schedule.id);
			var taskElement = scheduleElement.getElementById("task"+task.id);
			switch(tagType.type){
	    		case 0:
	    			taskElement.setStyles({
	    				'background-color': tagType.color
	    			});
	    			break;
	    		case 1:
	    			taskElement.getElements('span')[0].setStyles({
	    				'color': tagType.color
	    			});
	    			break;
	    		case 2:
	    			taskElement.addClass('taskBorder');
	    			taskElement.setStyles({
	    				'border-color': tagType.color
	    			});
	    			var borderWidth = taskElement.getStyle('border-width').toInt();
	    			taskElement.setStyles({
	    				width: -1*borderWidth*2+element.getStyle('width').toInt(),
	    				height: -1*borderWidth*2+element.getStyle('height').toInt()
	    			});	
	    			break;
	    	}
		},
		deleteTask: function(schedule, idTask){
	
		},
		modifyTaskName: function(task, name){
	
		},
		modifyTaskDayOfWeek: function(task, dayOfWeek){
		
		},
		modifyTaskSince: function(task, since){
		
		},
		modifyTaskTo: function(task, to){
		
		}
	});


})(se);
