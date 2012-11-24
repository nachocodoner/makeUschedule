(function(se){
	se.InterfaceEntities.Workarea = new Class({
		initialize: function(idWorkarea, schedule){
			this.floatingWindows = [];
			this.id = 'workarea'+idWorkarea;
			this.schedule = schedule;
			
			this.element = new Element('div',{
				id: this.id
			});

			this.menu = new Element('div', {
				'class': 'menu'
			});
			
			var elementsMenu =  new Element('div', {
				'class': 'menu'
			});
			
			this.tasksMenu = new Element('div', {
				'class': 'tasksMenu'
			});
			
			this.additionalTagMenu = new Element('div', {
				'class': 'additionalTagMenu'
			});
			
			this.additionalTagMenuUl = new Element('ul',{});
			this.taskMenuUl = new Element('ul',{});
			
			this.taskMenuUl.inject(this.tasksMenu);
			this.additionalTagMenuUl.inject(this.additionalTagMenu);

			this.display = new Element('div', {
				'class': 'display'
			});
			
			this.menu.inject(this.element);
			this.tasksMenu.inject(elementsMenu);
			this.additionalTagMenu.inject(elementsMenu);
			elementsMenu.inject(this.element);
			this.display.inject(this.element);
			
			this.element.inject(document.body, 'top');
		}
	});
})(se);
