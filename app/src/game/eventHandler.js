export class EventHandler{
	listeners = []
	subscribe(handler, sender){
		this.listeners.push({handler,sender})
	}
	unsubscribe(handler){
		let index = this.listeners.indexOf(this.listeners.filter(f=>f.handler === handler))
		if(index !== -1){
			this.listeners.splice(index,1)
		}
	}
	trigger(data){
		for(let listener of this.listeners){
			listener.handler(data, listener.sender)
		}
	}
	clear(){
		this.listeners = []
	}
}