(function(se){
	se.Entities.TypeTag = new Class({
		initialize: function(id, type){
			this.id = id;
			this.type = type;
		}
	});

	se.Entities.BackgroundTypeTag = new Class({
		Extends: se.Entities.TypeTag,
		initialize: function(id){
			this.parent(id, 0); // Tipo Fondo 0
		}
	});
	
	se.Entities.TextTypeTag = new Class({
		Extends: se.Entities.TypeTag,
		initialize: function(id){
			this.parent(id, 1); // Tipo Texto 1
		}
	});
	
	se.Entities.BorderTypeTag = new Class({
		Extends: se.Entities.TypeTag,
		initialize: function(id){
			this.parent(id, 2); // Tipo Borde 2
		}
	});	

})(se);
