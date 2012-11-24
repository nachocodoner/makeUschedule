(function(se){
	se.Managers.IdentificationManager = new Class({
		initialize: function(){
			this.lastId = -1;
			this.id2Use = new BinaryHeap(function(x){return x;});			
		},
		generateId: function(){
			if(this.id2Use.size() == 0){
				this.lastId++;
				return this.lastId;
			} else return this.id2Use.pop();
		},
		removedId: function(idRemoved){
			this.id2Use.push(idRemoved);
		}
	});
})(se);
