var MultiLangManager = new Class({
	initialize: function(){
		this.lang = new Array();
	},
	loadSpanish: function(){
		var lang = [];
		
		lang["createschedule"] = "crear horario";
		lang["title"] = "título";
		
		lang["daysofweek"] = "días de la semana";		
		lang["monday"] = "lunes";
		lang["tuesday"] = "martes";
		lang["wednesday"] = "miércoles";
		lang["thursday"] = "jueves";
		lang["friday"] = "viernes";
		lang["saturday"] = "sábado";
		lang["sunday"] = "domingo";
		
		lang["until"] = "desde";
		lang["to"] = "hasta";
		
		lang["each"] = "cada";
		
		lang["hours"] = "horas";
		lang["minutes"] = "minutos";
		
		lang["create"] = "crear";
		lang["delete"] = "borrar";
		
		this.lang = lang;
	},
	_ : function(key){
		return this.lang[key];
	}
});
