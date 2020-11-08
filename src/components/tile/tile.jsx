import React, { Component } from 'react'
import styles from './tile.module.scss'
import TILE_TYPE from '../../game/tileType'
export default class Tile extends Component {
	render() {
		let tileClass = []
		let c = this.props.content
		if((c & TILE_TYPE.BLACK_TILE) > 0) tileClass = styles.blackTile
		else if((c & TILE_TYPE.WHITE_TILE) > 0) tileClass = styles.whiteTile

		let contentClass = [styles.content]
		if((c & TILE_TYPE.PLAYER_WHITE) > 0) contentClass.push(styles.whitePlayer)
		else if((c & TILE_TYPE.PLAYER_BLACK) > 0) contentClass.push(styles.blackPlayer)

		if((c & TILE_TYPE.PAWN) > 0) contentClass.push(styles.pawn)
		else if((c & TILE_TYPE.ROOK) > 0) contentClass.push(styles.rook)
		else if((c & TILE_TYPE.CASTLE) > 0) contentClass.push(styles.castle)
		else if((c & TILE_TYPE.BISHOP) > 0) contentClass.push(styles.bishop)
		else if((c & TILE_TYPE.KING) > 0) contentClass.push(styles.king)
		else if((c & TILE_TYPE.QUEEN) > 0) contentClass.push(styles.queen)

		let dragstart = (e)=>{
			console.log(e.target.id)
			e.dataTransfer.setData("text", "hoi");
		}
		let allowDrop = (e) => {
			e.preventDefault()
		}
		let drop = (e) => {
			e.preventDefault()
			var data = e.dataTransfer.getData("text")
			console.log('dropped',data)
		}
		return (
			<div style={{width:this.props.width, height:this.props.height}} onDrop={drop} onDragOver={allowDrop} className={[styles.tile, tileClass].join(' ')}>
					<div className={styles.verticalCenter}>
						<p>{this.props.location}</p>
					</div>
				<div draggable={true} onDragStart={dragstart} className={contentClass.join(' ')}></div>
			</div>
		)
	}
}
