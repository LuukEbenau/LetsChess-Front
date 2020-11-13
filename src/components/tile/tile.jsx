import React, { Component } from 'react'
import styles from './tile.module.scss'
import TILE_TYPE from '../../game/tileType'
import { coordToChessName } from '../../game'
export default class Tile extends Component {
	render() {
		let tileClass = []
		let c = this.props.content
		if((c & TILE_TYPE.BLACK_TILE) > 0) tileClass.push(styles.blackTile)
		else if((c & TILE_TYPE.WHITE_TILE) > 0) tileClass.push(styles.whiteTile)

		let contentClass = [styles.content]
		if((c & TILE_TYPE.PLAYER_WHITE) > 0) contentClass.push(styles.whitePlayer)
		else if((c & TILE_TYPE.PLAYER_BLACK) > 0) contentClass.push(styles.blackPlayer)

		if((c & TILE_TYPE.PAWN) > 0) contentClass.push(styles.pawn)
		else if((c & TILE_TYPE.ROOK) > 0) contentClass.push(styles.rook)
		else if((c & TILE_TYPE.CASTLE) > 0) contentClass.push(styles.castle)
		else if((c & TILE_TYPE.BISHOP) > 0) contentClass.push(styles.bishop)
		else if((c & TILE_TYPE.KING) > 0) contentClass.push(styles.king)
		else if((c & TILE_TYPE.QUEEN) > 0) contentClass.push(styles.queen)

		if((c & TILE_TYPE.HIGHLIGHT) > 0) {
			tileClass.push(styles.highlight)
		}

		let dragstart = (e)=>{
			e.dataTransfer.setData("piece", this.props.location)
			if(this.props.onRequestHighlight) this.props.onRequestHighlight({location: this.props.location, piece:c})
		}
		let dragend = ()=>{
			if(this.props.onStopHighlight) this.props.onStopHighlight()
		}


		let allowDrop = (e) => {
			e.preventDefault()
		}
		let drop = (e) => {
			e.preventDefault()
			var data = e.dataTransfer.getData("piece")
			let moveAttempt = {from:data, to:this.props.location}

			if(this.props.onMove) this.props.onMove(moveAttempt)
		}

		return (
			<div style={{width:this.props.width, height:this.props.height}} className={styles.tile}> 
					{/* <div className={styles.verticalCenter}>
						<p >{this.props.location}</p>
					</div> */}
					<div style={{width:"100%", height:"100%"}} onDrop={drop} onDragOver={allowDrop} className={tileClass.join(' ')}>
						<div draggable={(c&TILE_TYPE.PIECE_PLAYER) > 0} onDragStart={dragstart} onDragEnd={dragend} className={contentClass.join(' ')}></div>
					</div>
			</div>
		)
	}
}
