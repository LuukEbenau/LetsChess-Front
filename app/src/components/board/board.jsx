import React, { Component } from 'react'
import Tile from '../tile'
import styles from './board.module.scss'
import KeyboardEventHandler from 'react-keyboard-event-handler';
import {Row, Container} from 'react-bootstrap'
import TILE_TYPE from '../../game/tileType';
import ChessGame, { coordToChessName, chessNameToCoord } from '../../game';

// import { SnakeGame } from '../../game/game';

class Board extends Component {
	constructor(props) {
		super(props)
		this.game = props.game

		this.state = { 
			tiles: [],
			boardWidth: 600,
			boardHeight: 600,
			rows: this.props.rows,
			cols: this.props.cols,
		}

		this.tileSize = this.state.boardWidth / this.props.cols

		// this.game.onGameStarted.subscribe(() => console.log('game started'))
		// this.game.onGameEnded.subscribe((e) => {
		// 	this.setState({gameStarted:false})
		// 	console.log('game ended',e)
		// })
		this.game.onBoardUpdated.subscribe(e => this.onGameTick(e))
	}

	componentDidMount(){	
		this._generateVisualBoard()
	}

	onGameTick({updatedTiles}){
		this.updateBoard(updatedTiles)
	}

	onKeyboardEvent(visualBoard, key){
	 if(key === 'space'){
			// if(!this.state.gameStarted) this.startGame()
		}
	}

	render() { 
		return ( 
			<Container>
				<KeyboardEventHandler handleKeys={['space']} onKeyEvent={(key)=>{this.onKeyboardEvent(this,key)}}></KeyboardEventHandler>
				<Row className="justify-content-md-center">
					<div className="col-8">
						{/* <div style={{backgroundColor:'green'}}>
							<p>Score: {this.game.stats.score} Ticknr: {this.game.stats.ticks}</p>
						</div> */}
						<div className={styles.board} style={{width:this.state.boardWidth, height:this.state.boardHeight, lineHeight:0}}>
							{this.state.tiles}
						</div>
						{/* <div style={{backgroundColor:'red'}}>
							<button className="btn btn-primary" onClick={()=>this.startGame()} disabled={this.state.gameStarted || !this.state.player1}>Start</button>
						</div> */}
					</div>
				</Row>

			</Container>
		 )
	}

	updateBoard(tilesToUpdate){
		let tiles = this.state.tiles
		for(let tile of tilesToUpdate){
			let x = tile[0]
			let y = tile[1]
			
			let row = [].concat(tiles[y])
			
			row[x] = this._generateTile(x,y,this.game.board[y][x])
			tiles[y] = row
		}

		this.setState({tiles:tiles})
	}

	onMoveAttempt(self,e){
		self.game.move({from:e.from,to:e.to})
	}

	highlightedTiles = []
	requestHighlight(self,e){
		let tiles = self.state.tiles
		if(self.game.settings.playingAs === (e.piece & TILE_TYPE.PLAYERS)){
			let tilesToUpdate = self.game.getPossibleMoves({board: self.game.board, piece: e.piece, location: chessNameToCoord(e.location)})
			for(let tile of tilesToUpdate){
				let x = tile[0]
				let y = tile[1]
				let row = [].concat(tiles[y])
				
				let content = self.game.board[y][x] | TILE_TYPE.HIGHLIGHT
				row[x] = self._generateTile(x,y,content)
				tiles[y] = row
			}
			this.highlightedTiles = tilesToUpdate
			self.setState({tiles:tiles})
		}
	}
	stopHighlight(self){
		let tiles = self.state.tiles
		for(let tile of self.highlightedTiles){
			let x = tile[0]
			let y = tile[1]
			let row = [].concat(tiles[y])
			
			let content = self.game.board[y][x] & ~TILE_TYPE.HIGHLIGHT
			row[x] = self._generateTile(x,y,content)
			tiles[y] = row
		}
		this.highlightedTiles = []
		self.setState({tiles:tiles})
	}
	//#region private methods
	_generateTile(x,y,content){
		let location = coordToChessName(x,y)
		return <Tile key={x+'-'+y} height={this.tileSize} width={this.tileSize} content={content} location={location} onMove={(e)=>this.onMoveAttempt(this,e)} onRequestHighlight={(e)=>this.requestHighlight(this,e)} onStopHighlight={()=>{this.stopHighlight(this)}}>

		</Tile>
	}
	_generateVisualBoard(){
		let visualBoard = []
		for(let y = 0; y < this.game.board.length; y++){
			let row = this.game.board[y]
			let visualRow = []
			for(let x = 0; x < row.length; x++){
				let tile = this._generateTile(x,y,row[x])

				visualRow.push(tile)
			}

			visualBoard.push(visualRow)
		}

		this.setState({tiles: visualBoard})
	}

	//#endregion
}
 
export default Board