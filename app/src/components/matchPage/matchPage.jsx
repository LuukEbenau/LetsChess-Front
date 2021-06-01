import React, { Component } from 'react'

import {Row, Container} from 'react-bootstrap'
import styles from './matchPage.module.scss'
import Board from '../board'
import ChatWindow from '../chatWindow'
import { connect } from 'react-redux'
import { gameFound, takeMove } from '../../store/game/game.actions'
import { ChessGame } from '../../game'
import TILE_TYPE from '../../game/tileType'
class Page extends Component {
	constructor(props) {
		super(props)
		this.game = new ChessGame()
	}
	componentDidMount(){
		this.game.start({playingWhite:this.props.playingWhite})

		this.game.onMoveTaken.subscribe(this.onTakenMove, this)
		this.props.wsClient.onMoveTaken = ({matchId, userId, from, to}) => {
			if(userId === this.props.userId){
				console.log('move from backend confirmed :-)',from,to)
			}
			else if(userId === this.props.opponentUserId){
				console.log('opponent moved',from,to)
				this.game.syncMove({from, to})
			}
    }
	}

	onTakenMove({from,to,player}, sender){
		if(player === TILE_TYPE.PLAYER_WHITE && sender.props.playingWhite
			|| player === TILE_TYPE.PLAYER_BLACK && !sender.props.playingWhite){
			console.log('lets take move from',from,to,sender)
			sender.props.takeMove(from,to)
		}
	}

	componentWillUnmount(){
		console.debug("unmounting")
		this.props.wsClient.onMoveTaken = null
		this.game.onMoveTaken.unsubscribe(this.onTakenMove)
	}

	render() { 
		return ( 
      <div className="container-fluid">
				<div className="row">
					<div className="col-9">
						<div className="card">
							<div className="card-body">
								<Board cols={8} rows={8} game={this.game}></Board>
							</div>	
						</div>
					
					</div>
					<div className="col-3">
						<div className="card">
							<div className="card-body">
								historybar
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<div className="card">
							<ChatWindow></ChatWindow>
						</div>
					</div>
				</div>
      </div>
		 )
	}
}
 
const mapStateToProps = state => {
  return {
		wsClient: state.game.wsClient,
		userId: state.auth.userId,
		opponentUserId: state.game.opponent,
		playingWhite: state.game.playingWhite
  }
}

function mapDispatchToProps(dispatch) {
  return {
    takeMove: (from,to) => dispatch(takeMove(from,to))
  }
} 
const ConnectedPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Page)

export default ConnectedPage