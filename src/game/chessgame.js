import {TILE_TYPE} from './tileType'
export class ChessGame{
	board = []
	settings= {
		size:8
	}
	constructor(){
		this.board = this._generateBoard({whiteBottom:true})
	}

	start(){
	}

	//#region private methods
	_generateBoard({whiteBottom}){
		let bottomPlayer = (whiteBottom)? TILE_TYPE.PLAYER_WHITE: TILE_TYPE.PLAYER_BLACK
		let topPlayer = (!whiteBottom)? TILE_TYPE.PLAYER_WHITE: TILE_TYPE.PLAYER_BLACK

		let tiles = []
		for(let y = 0; y < this.settings.size; y++){
			let row = []
			for(let x = 0; x < this.settings.size; x++){		
				let tileContent = 0
			  tileContent |= (((y%2) + (x%2)) === 1? TILE_TYPE.BLACK_TILE: TILE_TYPE.WHITE_TILE)

			  if(y === 0){
					if(x === 0 || x === this.settings.size-1) tileContent |= TILE_TYPE.CASTLE
					if(x === 1 || x === this.settings.size-2) tileContent |= TILE_TYPE.ROOK
					if(x === 2 || x === this.settings.size-3) tileContent |= TILE_TYPE.BISHOP
					if(x === 3) tileContent |= TILE_TYPE.QUEEN
					if(x === 4) tileContent |= TILE_TYPE.KING
					
					tileContent |= topPlayer
				}
				else if(y === 1){
					tileContent |= (TILE_TYPE.PAWN|topPlayer)
				}
				else if(y === this.settings.size-1){
					if(x === 0 || x === this.settings.size-1) tileContent |= TILE_TYPE.CASTLE
					if(x === 1 || x === this.settings.size-2) tileContent |= TILE_TYPE.ROOK
					if(x === 2 || x === this.settings.size-3) tileContent |= TILE_TYPE.BISHOP
					if(x === 3) tileContent |= TILE_TYPE.QUEEN
					if(x === 4) tileContent |= TILE_TYPE.KING

					tileContent |= (bottomPlayer)
				}
				else if(y === this.settings.size-2){
					tileContent |= (TILE_TYPE.PAWN|bottomPlayer)
				}

				// console.debug(`${x}:${y} -> ${tileContent}`)
				row.push(tileContent)
			}
			tiles.push(row)
		}
		return tiles
	}

	//#endregion
}
export default ChessGame