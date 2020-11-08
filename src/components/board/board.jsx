import React, { Component } from 'react'
import Tile from '../tile'
import styles from './board.module.scss'
import KeyboardEventHandler from 'react-keyboard-event-handler';
import {Row, Container} from 'react-bootstrap'
import TILE_TYPE from '../../game/tileType';

// import { SnakeGame } from '../../game/game';

class Board extends Component {
	constructor(props) {
		super(props)
		this.state = { 
			tiles: [],
			boardWidth: 600,
			boardHeight: 600,
			rows: this.props.rows,
			cols: this.props.cols
		}
		this.tileSize = this.state.boardWidth / this.props.cols

		// this.game.onGameStarted.subscribe(() => console.log('game started'))
		// this.game.onGameEnded.subscribe((e) => {
		// 	this.setState({gameStarted:false})
		// 	console.log('game ended',e)
		// })
		// this.game.onBoardUpdated.subscribe(e => this.onGameTick(e))
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
			let x = tile[1]
			let y = tile[0]

			let row = [].concat(tiles[y])

			row[x] = <Tile key={x+'-'+y} height={this.tileSize} width={this.tileSize} ></Tile>
			tiles[y] = row
		}

		this.setState({tiles:tiles})
	}

	generateBoard(){
		let tiles = []
		for(let y = 0; y < this.state.rows; y++){
			let row = []
			for(let x = 0; x < this.state.cols; x++){		
				let tileContent = 0
			  tileContent |= (((y%2) + (x%2)) === 1? TILE_TYPE.BLACK_TILE: TILE_TYPE.WHITE_TILE)

			  if(y === 0){
					if(x === 0 || x === this.state.cols-1) tileContent |= TILE_TYPE.CASTLE
					if(x === 1 || x === this.state.cols-2) tileContent |= TILE_TYPE.ROOK
					if(x === 2 || x === this.state.cols-3) tileContent |= TILE_TYPE.BISHOP
					if(x === 3) tileContent |= TILE_TYPE.QUEEN
					if(x === 4) tileContent |= TILE_TYPE.KING
					
					tileContent |= (TILE_TYPE.PLAYER_WHITE)
				}
				else if(y === 1){
					tileContent |= (TILE_TYPE.PAWN|TILE_TYPE.PLAYER_WHITE)
				}
				else if(y === this.state.rows-1){
					if(x === 0 || x === this.state.cols-1) tileContent |= TILE_TYPE.CASTLE
					if(x === 1 || x === this.state.cols-2) tileContent |= TILE_TYPE.ROOK
					if(x === 2 || x === this.state.cols-3) tileContent |= TILE_TYPE.BISHOP
					if(x === 3) tileContent |= TILE_TYPE.QUEEN
					if(x === 4) tileContent |= TILE_TYPE.KING

					tileContent |= (TILE_TYPE.PLAYER_BLACK)
				}
				else if(y === this.state.rows-2){
					tileContent |= (TILE_TYPE.PAWN|TILE_TYPE.PLAYER_BLACK)
				}

			
				let location = ['a','b','c','d','e','f','g','h'][x]+(this.state.rows-y)
				let tile = <Tile key={x+'-'+y} height={this.tileSize} width={this.tileSize} content={tileContent} location={location} ></Tile>
				row.push(tile)
			}
			tiles.push(row)
		}
		this.setState({tiles: tiles})
	}

	componentDidMount(){	
		this.generateBoard()
	}
}
 
export default Board