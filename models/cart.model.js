	module.exports=function Cart(oldCart){
	this.items=oldCart.items || {};
	this.totalQty=oldCart.totalQty || 0;
	
	this.add=function(item,id){
		var storedItem=this.items[id];
		if(!storedItem){
			storedItem=this.items[id]={item:item,qty:0}
		}
		storedItem.qty++;
		this.totalQty++;
	};
	
}