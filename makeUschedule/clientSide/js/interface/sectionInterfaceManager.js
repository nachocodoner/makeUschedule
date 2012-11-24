(function(se){
	se.Interface.SectionInterfaceManager = new Class({
		initialize: function(){
		},
		loadFormCreateSchelude: function(){
			var langManager = new se.Managers.MultiLangManager();
			var data = {
				createschedule : langManager._("createschedule"),
				title: langManager._("title"),
				daysofweek: langManager._("daysofweek")			
			};
		
			$('forms').set('html', tmpl("formCreateSchedule", data));
		}
	});
})(se);
