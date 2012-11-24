var se = {};
se.Managers = {};
se.Entities = {};
se.Interface = {};
se.InterfaceEntities = {};
se.InterfaceManagers = {};
se.Util = {};

window.addEvent('domready', function(){
	var multiLangManager = new se.Managers.MultiLangManager();
	multiLangManager.loadSpanish();
	
	var interfaceManager = new se.Interface.InterfaceManager();
	
	var schedule = {
		title : "Mi horario",
		daysOfWeek :  [1,1,1,1,1,1,1],
		since : {hours: 8, minutes: 00},
		to : {hours: 21, minutes: 00},
		each :  {hours: 1, minutes: 0},
		taskTags : [{ 
				name: "APP", 
				tagType: {type: 'background', color: '#FA8072'},
				tasks: [
					{
						dayOfWeek: 'fri',
						since: {hours: 15, minutes:0},
						to: {hours: 16, minutes:30},
						additionalTags: []
					},
					{
						dayOfWeek: 'mon',
						since: {hours: 15, minutes:0},
						to: {hours: 16, minutes:30},
						additionalTags: []			
					}
				]
		},
		{ 
			name: "PDL", 
			tagType: {type: 'background', color: '#FFA500'},
			tasks: [{
				dayOfWeek: 'wed',
				since: {hours: 11, minutes:0},
				to: {hours: 13, minutes:00},
				additionalTags: [
					{
						name: "Teoria",
						tagType: {type: 'border', color: '#7FFF00'}
					},
					{
						name: "INGINF",
						tagType: {type: 'text', color: '#7FFF00'}
					}
				]
			}]
		}
		]
	};
	
	/*var schedule = {
		title : "Mi horario",
		daysOfWeek :  [1,1,1,1,1,1,1],
		since : {hours: 8, minutes: 00},
		to : {hours: 21, minutes: 00},
		each :  {hours: 1, minutes: 0},
		taskTags : []
	};*/
	
	interfaceManager.drawSchedule(schedule);
});
