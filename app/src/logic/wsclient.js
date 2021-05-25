import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import {API_ENDPOINT} from '../applicationSettings'

export class MatchWSClient{
	connection = null
	userId = null
	constructor(){
	}
	onMatchFound = (matchId)=>{}

	connect(userId){
		this.userId = userId;
		const newConnection = new HubConnectionBuilder()
		.withUrl(`${API_ENDPOINT}/hub?userId=${userId}`)
		.configureLogging(LogLevel.Trace)
		.withAutomaticReconnect()
		.build();

		this.connection = newConnection
		newConnection.onclose(e=>{
			console.log('connection closed')
		})

		let promise = this.connection.start()
		promise.then(e => {
			this.connection.on("MatchFound", (matchId, userId)=> {
				if(this.userId === userId){
					console.log('match found for this player',matchId,userId)
					if(this.onMatchFound) this.onMatchFound(matchId)
				}
			})
		})
		return promise
	}
}

export default MatchWSClient