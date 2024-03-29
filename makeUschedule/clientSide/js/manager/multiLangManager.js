(function(se){
	var lang = [];
	se.Managers.MultiLangManager = new Class({
		initialize: function(){
		},
		loadSpanish: function(){
			lang["createschedule"] = "crear horario";
			lang["title"] = "título";
		
			lang["daysofweek"] = "días de la semana";
			lang["dayofweek"] = "día de la semana";			
			lang["monday"] = "lunes";
			lang["tuesday"] = "martes";
			lang["wednesday"] = "miércoles";
			lang["thursday"] = "jueves";
			lang["friday"] = "viernes";
			lang["saturday"] = "sábado";
			lang["sunday"] = "domingo";
		
			lang["since"] = "desde";
			lang["to"] = "hasta";
		
			lang["each"] = "cada";
		
			lang["hours"] = "horas";
			lang["minutes"] = "minutos";
		
			lang["create"] = "crear";
			lang["delete"] = "borrar";
			
			lang["tasktagname"] = "nombre";
			lang["orexisting"] = "o existente"
			lang["additionaltags"] = "etiquetas adicionales";
			lang["dayofweek"] = "día de la semana";
			lang["tagtype"] = "tipo de etiqueta";
			lang["backgroundtagtype"] = "fondo";
			lang["bordertagtype"] = "borde";
			lang["texttagtype"] = "texto";
			lang["tasktagcolor"] = "color";
			
			lang["newtasktag"] = "nueva etiqueta para la tarea";
			
			lang["addtasktitle"] = "añadir nueva tarea";
			lang["deletetasktagtitle"] = "eliminar etiqueta de tarea";
			lang["deleteadditionaltagtitle"] = "eliminar etiqueta adicional";
			lang["addtask"] = "añadir nueva etiqueta de tarea";
			lang["addadditionaltag"] = "añadir nueva etiqueta adicional";
		},
		_ : function(key){
			return lang[key];
		}
	});
})(se);
