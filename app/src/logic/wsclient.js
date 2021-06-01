import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import {API_ENDPOINT} from '../applicationSettings'

export class MatchWSClient{
	connection = null
	userId = null
	constructor(){
	}
	onMatchFound = ({matchId,userId,opponent, playingWhite})=>{}
	onMoveTaken = ({matchId, userId, from, to}) => {}

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
			this.connection.on("MatchFound", (mess)=> {
				const {matchId,userId,opponent, playingWhite} = mess
				if(this.userId === userId){
					console.log('match found for this player',matchId,userId)
					if(this.onMatchFound) this.onMatchFound(mess)
				}
			})
			this.connection.on("MoveTaken", (mess)=> {
				console.log("received:",mess)
				const {matchId, userId, from, to} = mess;
				//if(this.userId !== userId){
					console.log('move for', matchId, userId)
					if(this.onMoveTaken) this.onMoveTaken(mess)
				//}
			})
		})
		return promise
	}
}

export default MatchWSClient