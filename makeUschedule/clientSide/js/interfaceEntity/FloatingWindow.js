(function(se){
	se.InterfaceEntities.FloatingWindow = new Class({
		initialize: function(idFloatingWindow){
			this.id = idFloatingWindow;
				
			this.element = {};
			
			this.element.window = new Element('div', {
				id: "floatingwindow"+idFloatingWindow,
				class: 'floatingWindow'
			});
			
			this.element.window.setStyles({
				display:'none'
			});
			
			this.element.head = new Element('div', {
				class: 'headFloatingWindow'
			});
			
			this.element.body = new Element('div', {
				class: 'bodyFloatingWindow'
			});
			
			this.element.head.inject(this.element.window, 'top');
			this.element.body.inject(this.element.window, 'bottom');
			
			this.element.close = new Element('div', {
				class: 'closeButton'
			});
			
			var floatingWindow = this;			
			this.element.close.addEvent('click', function(){
				var floatingWindowManager = new se.InterfaceManagers.FloatingWindowManager();
				floatingWindowManager.hide(floatingWindow);
			});
			this.element.close.inject(this.element.head);
		}
	});
	
	se.InterfaceEntities.WorkareaFloatingWindow = new Class({
		Extends: se.InterfaceEntities.FloatingWindow,
		initialize: function(idFloatingWindow, workarea){
			this.parent(idFloatingWindow);
			
			this.workarea = workarea;
			
			this.element.backgroundFloatingWindow = $$('#'+workarea.id+' .backgroundFloatingWindow')[0];
			if(this.element.backgroundFloatingWindow == 'undefined' || this.element.backgroundFloatingWindow == null) {
				this.element.backgroundFloatingWindow = new Element('div',{
					class: 'backgroundFloatingWindow'
				});
				this.element.backgroundFloatingWindow.inject(this.workarea.element, 'top');
			}
			
			this.element.window.inject(this.element.backgroundFloatingWindow ,'top');
		}
	});
	
	se.InterfaceEntities.GeneralFloatingWindow = new Class({
		Extends: se.InterfaceEntities.FloatingWindow,
		initialize: function(idFloatingWindow){
			this.parent(idFloatingWindow);
			
			this.element.backgroundFloatingWindow = $$('body > .backgroundFloatingWindow')[0];
			if(this.element.backgroundFloatingWindow == 'undefined' || this.element.backgroundFloatingWindow == null) {
				this.element.backgroundFloatingWindow = new Element('div',{
					class: 'backgroundFloatingWindow'
				});
				this.element.backgroundFloatingWindow.inject(document.body, 'top');
			}
			
			this.element.window.inject(this.backgroundFloatingWindow ,'top');
		}
	});
})(se);
