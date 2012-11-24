(function(se){
	var floatingWindows = [];
	var backgroundFloatingWindow;
	var idManager = new se.Managers.IdentificationManager();
	se.InterfaceManagers.FloatingWindowManager = new Class({
		initialize: function(){
		},
		remove: function(floatingWindow){
			idManager.removedId(floatingWindow.id);
			floatingWindow.element.window.dispose();
		},
		show: function(floatingWindow){
			floatingWindow.element.window.setStyles({
				display: 'block'
			});
			floatingWindow.element.backgroundFloatingWindow.setStyles({
				display: 'block'
			});
			floatingWindow.element.window.setStyles({
				'margin-top': -floatingWindow.element.window.getSize().y/2,
				'margin-left': -floatingWindow.element.window.getSize().x/2
			});
		},
		hide: function(floatingWindow){
			floatingWindow.element.window.setStyles({
				display: 'none'
			});
			floatingWindow.element.backgroundFloatingWindow.setStyles({
				display: 'none'
			});
			
			floatingWindow.element.body.getElements('form')[0].reset();
			
		}
	});
	
	se.InterfaceManagers.WorkareaFloatingWindowManager = new Class({
		Extends: se.InterfaceManagers.FloatingWindowManager,
		initialize: function(){
			this.parent();
		},
		add: function(workarea){
			var idFloatingWindow = idManager.generateId();
			var floatingWindow = new se.InterfaceEntities.WorkareaFloatingWindow(idFloatingWindow, workarea);
			
			floatingWindows.push(floatingWindow);
			
			return floatingWindow;
		},
		setContent: function(floatingWindow, content){
			floatingWindow.element.body.set('html', content);
		},
		loadAddTaskTagFormWindow: function(floatingWindow){
			var langManager = new se.Managers.MultiLangManager();
			
			var data = {
				string: {
					addtask: langManager._("addtask"),
					tasktagname: langManager._("tasktagname"),
					tasktagcolor: langManager._("tasktagcolor"),
					tagtype: langManager._("tagtype"),
					backgroundtagtype: langManager._("backgroundtagtype"),
					bordertagtype: langManager._("bordertagtype"),
					texttagtype: langManager._("texttagtype"),
					create: langManager._("create")
				},
				add: true
			};
			
			this.setContent(floatingWindow, tmpl("formTaskTag", data));
			
			new jscolor.color(floatingWindow.element.body.getElements('.color')[0], {}); // Color picker activation
			
			var addTaskButton = floatingWindow.element.body.getElements('.submitButton')[0];
						
			var floatingWindowManager = this;
			addTaskButton.addEvent('click', function(){
				var workareaManager = new se.InterfaceManagers.WorkareaManager();
				var form = this.getParent('form').serialize();
				var taskTag = {
					name: form.nameTaskTag,
					tagType: {
						type: se.Util.numberToTagType(form.tagType[0]),
						color: '#'+form.colorTaskTag
					},
					tasks: []
				};
				
				var interfaceManager = new se.Interface.InterfaceManager();
				var taskTagObj = interfaceManager.drawTaskTag(floatingWindow.workarea.schedule, taskTag);
				workareaManager.addTaskTagToTaskMenu(floatingWindow.workarea, taskTagObj);
				
				
				floatingWindowManager.hide(floatingWindow);
			});
			
		},
		loadUpdateTaskTagFormWindow: function(floatingWindow, taskTag){
			var langManager = new se.Managers.MultiLangManager();
			
			var data = {
				string: {
					addtask: langManager._("addtask"),
					tasktagname: langManager._("tasktagname"),
					tasktagcolor: langManager._("tasktagcolor"),
					tagtype: langManager._("tagtype"),
					backgroundtagtype: langManager._("backgroundtagtype"),
					bordertagtype: langManager._("bordertagtype"),
					texttagtype: langManager._("texttagtype"),
					create: langManager._("create")
				},
				add: false,
				taskTag: taskTag
			};
			
			this.setContent(floatingWindow, tmpl("formTaskTag", data));
			
			new jscolor.color(floatingWindow.element.body.getElements('.color')[0], {}); // Color picker activation
			
			var updateTaskButton = floatingWindow.element.body.getElements('.submitButton')[0];
						
			var floatingWindowManager = this;
			updateTaskButton.addEvent('click', function(){
				var workareaManager = new se.InterfaceManagers.WorkareaManager();
				var form = this.getParent('form').serialize();
				var taskTagData = {
					name: form.nameTaskTag,
					tagType: {
						type: se.Util.numberToTagType(form.tagType[0]),
						color: '#'+form.colorTaskTag
					},
					tasks: []
				};
				
				var interfaceManager = new se.Interface.InterfaceManager();
				var taskTagObj = interfaceManager.redrawTaskTag(floatingWindow.workarea.schedule, taskTag , taskTagData);
				workareaManager.updateTaskTagToTaskMenu(floatingWindow.workarea, taskTagObj);
				
				floatingWindowManager.hide(floatingWindow);
			});
			
		},
		loadAddAdditionalTagFormWindow: function(floatingWindow){
			var langManager = new se.Managers.MultiLangManager();
			
			var data = {
				string: {
					addadditionaltag: langManager._("addadditionaltag"),
					tasktagname: langManager._("tasktagname"),
					tasktagcolor: langManager._("tasktagcolor"),
					tagtype: langManager._("tagtype"),
					backgroundtagtype: langManager._("backgroundtagtype"),
					bordertagtype: langManager._("bordertagtype"),
					texttagtype: langManager._("texttagtype"),
					create: langManager._("create")
				},
				add:true
			};
			
			this.setContent(floatingWindow, tmpl("formAdditionalTag", data));
			
			new jscolor.color(document.getElementById('colorAddAdditionalTagForm'), {}); // Color picker activation
			
			var addAdditionalTagButton = floatingWindow.element.body.getElements('.submitButton')[0];
			
			var floatingWindowManager = this;
			addAdditionalTagButton.addEvent('click', function(){
				var workareaManager = new se.InterfaceManagers.WorkareaManager();
				var form = this.getParent('form').serialize();
				
				var additionalTag = {
					name: form.nameAdditionalTag,
					tagType: {
						type: se.Util.numberToTagType(form.tagType[0]),
						color: '#'+form.colorAdditionalTag
					}
				};
				
				var interfaceManager = new se.Interface.InterfaceManager();
				var additionalTagObj = interfaceManager.addAdditionalTag(floatingWindow.workarea.schedule, additionalTag);
				workareaManager.addAdditionalTagToAdditionalTagMenu(floatingWindow.workarea, additionalTagObj);
				
				floatingWindowManager.hide(floatingWindow);
			});

		},
		loadUpdateAdditionalTagFormWindow: function(floatingWindow, additionalTag){
			var langManager = new se.Managers.MultiLangManager();
			
			var data = {
				string: {
					addadditionaltag: langManager._("addadditionaltag"),
					tasktagname: langManager._("tasktagname"),
					tasktagcolor: langManager._("tasktagcolor"),
					tagtype: langManager._("tagtype"),
					backgroundtagtype: langManager._("backgroundtagtype"),
					bordertagtype: langManager._("bordertagtype"),
					texttagtype: langManager._("texttagtype"),
					create: langManager._("create")
				},
				add:false,
				additionalTag: additionalTag
			};
			
			this.setContent(floatingWindow, tmpl("formAdditionalTag", data));
			
			new jscolor.color(document.getElementById('colorAddAdditionalTagForm'), {}); // Color picker activation
			
			var updateAdditionalTagButton = floatingWindow.element.body.getElements('.submitButton')[0];
			
			var floatingWindowManager = this;
			updateAdditionalTagButton.addEvent('click', function(){
				var workareaManager = new se.InterfaceManagers.WorkareaManager();
				var form = this.getParent('form').serialize();
				
				var additionalTagUpdatedData = {
					name: form.nameAdditionalTag,
					tagType: {
						type: se.Util.numberToTagType(form.tagType[0]),
						color: '#'+form.colorAdditionalTag
					}
				};
				
				var interfaceManager = new se.Interface.InterfaceManager();
				var additionalTagUpdated = interfaceManager.redrawAdditionalTag(floatingWindow.workarea.schedule, additionalTag, additionalTagUpdatedData);
				
				this.getParent('li');
				workareaManager.updateAdditionalTagToAdditionalTagMenu(floatingWindow.workarea, additionalTagUpdated);
				
				floatingWindowManager.hide(floatingWindow);
			});

		},
		loadAddTaskFormWindow: function(floatingWindow, taskTag){
			var langManager = new se.Managers.MultiLangManager();
			
			var data = {
				string: {
					tasktagname: langManager._("tasktagname"),
					tasktagcolor: langManager._("tasktagcolor"),
					tagtype: langManager._("tagtype"),
					backgroundtagtype: langManager._("backgroundtagtype"),
					bordertagtype: langManager._("bordertagtype"),
					texttagtype: langManager._("texttagtype"),
					since: langManager._("since"),
					to: langManager._("to"),
					create: langManager._("create"),
					additionaltags: langManager._("additionaltags"),
					dayofweek: langManager._("dayofweek"),
					monday: langManager._("monday"),
					tuesday: langManager._("tuesday"),
					wednesday: langManager._("wednesday"),
					thursday: langManager._("thursday"),
					friday: langManager._("friday"),
					saturday: langManager._("saturday"),
					sunday: langManager._("sunday")
				},
				taskTag: taskTag,
				additionalTags: floatingWindow.workarea.schedule.additionalTags,
				add: true
			};
			
			this.setContent(floatingWindow, tmpl("formTask", data));
			
			var addTaskButton = floatingWindow.element.body.getElements('.submitButton')[0];
						
			var floatingWindowManager = this;
			addTaskButton.addEvent('click', function(){
				var workareaManager = new se.InterfaceManagers.WorkareaManager();
				var scheduleManager = new se.Managers.ScheduleManager();
				
				var form = this.getParent('form').serialize();
				
				var additionalTags = [];
				var additionalTagsSchedule = floatingWindow.workarea.schedule.additionalTags;
				for(var i = 0; i < additionalTagsSchedule.length; ++i){
					var additionalTagCheckbox = form['additionalTag'+additionalTagsSchedule[i].id];
					if(additionalTagCheckbox >= 0)
					additionalTags.push(scheduleManager.getAdditionalTag(floatingWindow.workarea.schedule, additionalTagCheckbox));
				}
				
				var task = {
					dayOfWeek: se.Util.nameDayOfWeekToDayOfWeek(form.nameDayOfWeekTask[0]),
					since: {hours: form.hoursSinceTask.toInt(), minutes:form.minutesSinceTask.toInt()},
					to: {hours: form.hoursToTask.toInt(), minutes:form.minutesToTask.toInt()},
					additionalTags: additionalTags
				};
								
				var interfaceManager = new se.Interface.InterfaceManager();
				interfaceManager.drawTask(floatingWindow.workarea.schedule, taskTag, task);
				
				floatingWindowManager.hide(floatingWindow);
			});
		},
		loadUpdateTaskFormWindow: function(floatingWindow, taskTag, task){
			var langManager = new se.Managers.MultiLangManager();
			var taskCopy = Object.clone(task);
			var data = {
				string: {
					tasktagname: langManager._("tasktagname"),
					tasktagcolor: langManager._("tasktagcolor"),
					tagtype: langManager._("tagtype"),
					backgroundtagtype: langManager._("backgroundtagtype"),
					bordertagtype: langManager._("bordertagtype"),
					texttagtype: langManager._("texttagtype"),
					since: langManager._("since"),
					to: langManager._("to"),
					create: langManager._("create"),
					additionaltags: langManager._("additionaltags"),
					dayofweek: langManager._("dayofweek"),
					monday: langManager._("monday"),
					tuesday: langManager._("tuesday"),
					wednesday: langManager._("wednesday"),
					thursday: langManager._("thursday"),
					friday: langManager._("friday"),
					saturday: langManager._("saturday"),
					sunday: langManager._("sunday"),
					deleteS: langManager._("delete")
				},
				taskTag: taskTag,
				additionalTags: floatingWindow.workarea.schedule.additionalTags,
				add: false,
				task: taskCopy
			};
			
			data.task.since = se.Util.minutesToTime(task.since);
			data.task.to = se.Util.minutesToTime(task.to);
			
			data.task.since.hours = se.Util.numberToTimeString(data.task.since.hours);
			data.task.since.minutes = se.Util.numberToTimeString(data.task.since.minutes);
			
			data.task.to.hours = se.Util.numberToTimeString(data.task.to.hours);
			data.task.to.minutes = se.Util.numberToTimeString(data.task.to.minutes);
			
			data.task.additionalTags = task.additionalTags;
			
			this.setContent(floatingWindow, tmpl("formTask", data));
			
			var addTaskButton = floatingWindow.element.body.getElements('.submitButton')[0];
						
			var floatingWindowManager = this;
			
			addTaskButton.addEvent('click', function(){
				var workareaManager = new se.InterfaceManagers.WorkareaManager();
				var scheduleManager = new se.Managers.ScheduleManager();
				
				var form = this.getParent('form').serialize();
				
				var additionalTags = [];
				var additionalTagsSchedule = floatingWindow.workarea.schedule.additionalTags;
				for(var i = 0; i < additionalTagsSchedule.length; ++i){
					var additionalTagCheckbox = form['additionalTag'+additionalTagsSchedule[i].id];
					if(additionalTagCheckbox >= 0)
					additionalTags.push(scheduleManager.getAdditionalTag(floatingWindow.workarea.schedule, additionalTagCheckbox));
				}
				
				var taskData = {
					dayOfWeek: se.Util.nameDayOfWeekToDayOfWeek(form.nameDayOfWeekTask[0]),
					since: {hours: form.hoursSinceTask.toInt(), minutes:form.minutesSinceTask.toInt()},
					to: {hours: form.hoursToTask.toInt(), minutes:form.minutesToTask.toInt()},
					additionalTags: additionalTags
				};
								
				var interfaceManager = new se.Interface.InterfaceManager();
				interfaceManager.redrawTask(floatingWindow.workarea.schedule, taskTag, task, taskData);
				
				floatingWindowManager.hide(floatingWindow);
			});
			
			var deleteTaskButton = floatingWindow.element.body.getElements('.deleteButton')[0];
			
			deleteTaskButton.addEvent('click', function(){
				var interfaceManager = new se.Interface.InterfaceManager();
				interfaceManager.undrawTask(floatingWindow.workarea.schedule, taskTag, task);
				
				floatingWindowManager.hide(floatingWindow);
			});
			
		}		
	});
	
	se.InterfaceManagers.GeneralFloatingWindowManager = new Class({
		Extends: se.InterfaceManagers.FloatingWindowManager,
		initialize: function(){
			this.parent();
		},
		add: function(){
			var idFloatingWindow = idManager.generateId();
			var floatingWindow = new se.InterfaceEntities.WorkareaFloatingWindow(idFloatingWindow);
			
			floatingWindows.push(floatingWindow);
			
			return floatingWindow;
		}	
	});
})(se);
