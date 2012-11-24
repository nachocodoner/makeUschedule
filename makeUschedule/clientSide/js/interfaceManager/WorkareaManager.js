(function(se){
	var workareas = [];
	var idManager;
	se.InterfaceManagers.WorkareaManager = new Class({
		initialize: function(){
			idManager = new se.Managers.IdentificationManager();
		},
		add: function(schedule){
			var idWorkarea = idManager.generateId();
			var workarea = new se.InterfaceEntities.Workarea(idWorkarea, schedule);
			
			workareas.push(workarea);
			
			return workarea;
		},
		loadMenu: function(workarea){
			var langManager = new se.Managers.MultiLangManager();
			var ulMenu = new Element('ul', {});
			var addTaskLi = new Element('li', {});
			
			var addTaskA = new Element('a', {
				html: langManager._("addtask"),
				href: '#'
			});
			
			var addAdditionalTagLi = new Element('li', {});
			var addAdditionalTagA = new Element('a', {
				html: langManager._("addadditionaltag"),
				href: '#'
			});
			
			ulMenu.inject(workarea.menu);
			addTaskLi.inject(ulMenu);
			addAdditionalTagLi.inject(ulMenu);
			addAdditionalTagA.inject(addAdditionalTagLi);
			addTaskA.inject(addTaskLi);
			
			var FloatingWindowManager = new se.InterfaceManagers.WorkareaFloatingWindowManager();
			
			var addTaskFloatingWindow = FloatingWindowManager.add(workarea);			
			FloatingWindowManager.loadAddTaskTagFormWindow(addTaskFloatingWindow);
			
			addTaskA.addEvent('click', function(){
				FloatingWindowManager.show(addTaskFloatingWindow);
			});

			var addAdditionalTagFloatingWindow = FloatingWindowManager.add(workarea);
			FloatingWindowManager.loadAddAdditionalTagFormWindow(addAdditionalTagFloatingWindow);
			
			addAdditionalTagA.addEvent('click', function(){
				FloatingWindowManager.show(addAdditionalTagFloatingWindow);
			});
		},
		loadTasksMenu: function(workarea){
			var schedule = workarea.schedule;
			for(var i = 0; i < schedule.taskTags.length; ++i){	
				this.addTaskTagToTaskMenu(workarea, schedule.taskTags[i]);
			}
		},
		addTaskTagToTaskMenu: function(workarea, taskTag){
			var langManager = new se.Managers.MultiLangManager();
			var taskLi = new Element('li', {
				'id': 'taskTagButton'+taskTag.id
			});
				
			var updateTaskButton = new Element('div', {
				class: 'elementButton',
				'title': taskTag.name
			});
			
			var divButtons = new Element('div', {
				class: 'divButtons'
			});
			
			var addTaskButton = new Element('div', {
				class: 'addElementButton',
				'title': langManager._('addtasktitle')
			});
			
			var deleteTaskButton = new Element('div', {
				class: 'deleteElementButton',
				'title': langManager._('deletetasktagtitle')
			});
			
			addTaskButton.inject(divButtons);
			deleteTaskButton.inject(divButtons);
			divButtons.inject(taskLi);
			
			taskLi.inject(workarea.taskMenuUl);
			updateTaskButton.inject(taskLi,'top');
			updateTaskButton.setStyles({
				'background-color': taskTag.tagType.color
			});
			
			var FloatingWindowManager = new se.InterfaceManagers.WorkareaFloatingWindowManager();
			
			var addTaskFloatingWindow = FloatingWindowManager.add(workarea);	
			addTaskButton.addEvent('click', function(){
				FloatingWindowManager.loadAddTaskFormWindow(addTaskFloatingWindow, taskTag);
				FloatingWindowManager.show(addTaskFloatingWindow);
			});
			
			var updateTaskFloatingWindow = FloatingWindowManager.add(workarea);
			FloatingWindowManager.loadUpdateTaskTagFormWindow(updateTaskFloatingWindow, taskTag);
			updateTaskButton.addEvent('click', function(){
				FloatingWindowManager.show(updateTaskFloatingWindow);
			});
			
			deleteTaskButton.addEvent('click', function(){
				var interfaceManager = new se.Interface.InterfaceManager();
				
				interfaceManager.undrawTaskTag(workarea.schedule, taskTag);
				
				this.getParent('li').dispose();
				FloatingWindowManager.remove(addTaskFloatingWindow);
				FloatingWindowManager.remove(updateTaskFloatingWindow);
			});
		},
		loadAdditionalTagMenu: function(workarea){
			var schedule = workarea.schedule;
			for(var i = 0; i < schedule.additionalTags.length; ++i){	
				this.addAdditionalTagToAdditionalTagMenu(workarea, schedule.additionalTags[i]);
			}
		},
		addAdditionalTagToAdditionalTagMenu: function(workarea, additionalTag){
			var langManager = new se.Managers.MultiLangManager();
			var additionalTagLi = new Element('li', {
				'id': 'additionalTagButton'+additionalTag.id
			});
				
			var updateAdditionalTagButton = new Element('div', {
				class: 'elementButton',
				'title': additionalTag.name
			});
			
			var divButtons = new Element('div', {
				class: 'divButtons'
			});
			
			var deleteAdditionalTagButton = new Element('div', {
				class: 'deleteElementButton',
				'title': langManager._('deleteadditionaltagtitle')
			});
			
			deleteAdditionalTagButton.inject(divButtons);
			divButtons.inject(additionalTagLi);
			
			additionalTagLi.inject(workarea.additionalTagMenuUl);
			updateAdditionalTagButton.inject(additionalTagLi,'top');
			updateAdditionalTagButton.setStyles({
				'background-color': additionalTag.tagType.color
			});
			
			var FloatingWindowManager = new se.InterfaceManagers.WorkareaFloatingWindowManager();
			
			
			var updateAdditionalTagFloatingWindow = FloatingWindowManager.add(workarea);
			FloatingWindowManager.loadUpdateAdditionalTagFormWindow(updateAdditionalTagFloatingWindow, additionalTag);
			updateAdditionalTagButton.addEvent('click', function(){
				FloatingWindowManager.show(updateAdditionalTagFloatingWindow);
			});
			
			deleteAdditionalTagButton.addEvent('click', function(){
				var interfaceManager = new se.Interface.InterfaceManager();
				
				interfaceManager.undrawAdditionalTag(workarea.schedule, additionalTag);
				
				this.getParent('li').dispose();
				FloatingWindowManager.remove(updateAdditionalTagFloatingWindow);
			});
		},
		updateTaskTagToTaskMenu: function(workarea, taskTag){
			var taskTagElement = workarea.tasksMenu.getElementById('taskTagButton'+taskTag.id);
			
			taskTagElement.dispose();
			
			this.addTaskTagToTaskMenu(workarea, taskTag);
		},
		updateAdditionalTagToAdditionalTagMenu: function(workarea, additionalTag){
			var additionalTagElement = workarea.additionalTagMenu.getElementById('additionalTagButton'+additionalTag.id);
			
			additionalTagElement.dispose();
			
			this.addAdditionalTagToAdditionalTagMenu(workarea, additionalTag);
		}, 
		setDisplay: function(workarea, displayHtml){
			workarea.menu.set('html', displayHtml);
		},
		show: function(workarea){		
			workarea.element.setStyles({
				display: 'block'
			});	
		},
		hide: function(workarea){
			workarea.element.setStyles({
				display: 'none'
			});
		}
	});
})(se);
