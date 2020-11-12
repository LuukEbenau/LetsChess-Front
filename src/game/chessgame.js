import {TILE_TYPE} from './tileType'
import { EventHandler } from './eventHandler'
import { chessNameToCoord, coordToChessName } from './chessHelper'
export class ChessGame{
	board = []
	onMoveTaken = new EventHandler()
	onBoardUpdated = new EventHandler()
	settings= {
		size:8,
		whiteBottom:false
	}
	/** List of all pieces of the dark player */
	darkPieces = []
	/** List of all pieces of the light player */
	lightPieces = []

	constructor(){
		this.board = this._generateBoard()
	}

	start(){
	}

	move({from,to}){
		console.debug("move", from, to)
		let fromCoord = chessNameToCoord(from)
		let toCoord = chessNameToCoord(to)

		let fromPiece = this.board[fromCoord[1]][fromCoord[0]] & TILE_TYPE.PIECE_PLAYER

		let possibleMoves = this._getPossibleMoves({piece:fromPiece, location:fromCoord})

		if(possibleMoves.filter(m=>m[0] == toCoord[0] && m[1] == toCoord[1]).length === 0){
			console.debug(`This move from ${from} to ${to} is not possible!`)
		}
		else{
			/** remove piece piece from tile */
			this.board[fromCoord[1]][fromCoord[0]] &= ~TILE_TYPE.PIECE_PLAYER

			this.board[toCoord[1]][toCoord[0]] &= ~TILE_TYPE.PIECE_PLAYER
			this.board[toCoord[1]][toCoord[0]] |= fromPiece
			this.onBoardUpdated.trigger({updatedTiles:[fromCoord,toCoord]})
		}

		this.onMoveTaken.trigger({from:from, to:to})
	}

	_calculateAllPossibleMovesForPlayer(player = TILE_TYPE.PLAYER_WHITE){
		let pieces = (player & TILE_TYPE.PLAYER_WHITE) > 0 ? this.lightPieces : this.darkPieces
		let moves = []
		for(let piece of pieces){
			let tileContent = this.board[piece[1]][piece[0]]
			moves.push(...this._getPossibleMoves({piece:tileContent, location:piece}))
		}

		return moves
	}

	//#region private methods
	_generateBoard(){
		let bottomPlayer = (this.settings.whiteBottom)? TILE_TYPE.PLAYER_WHITE: TILE_TYPE.PLAYER_BLACK
		let topPlayer = (!this.settings.whiteBottom)? TILE_TYPE.PLAYER_WHITE: TILE_TYPE.PLAYER_BLACK

		let tiles = []

		this.lightPieces = []
		this.darkPieces = []
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

					if((topPlayer & TILE_TYPE.PLAYER_WHITE) > 0){
						this.lightPieces.push([x,y])
					}
				}
				else if(y === 1){
					tileContent |= (TILE_TYPE.PAWN|topPlayer)
					if((topPlayer & TILE_TYPE.PLAYER_WHITE) > 0){
						this.lightPieces.push([x,y])
					}
				}
				else if(y === this.settings.size-1){
					if(x === 0 || x === this.settings.size-1) tileContent |= TILE_TYPE.CASTLE
					if(x === 1 || x === this.settings.size-2) tileContent |= TILE_TYPE.ROOK
					if(x === 2 || x === this.settings.size-3) tileContent |= TILE_TYPE.BISHOP
					if(x === 3) tileContent |= TILE_TYPE.QUEEN
					if(x === 4) tileContent |= TILE_TYPE.KING

					tileContent |= (bottomPlayer)

					if((topPlayer & TILE_TYPE.PLAYER_WHITE) > 0){
						this.darkPieces.push([x,y])
					}
				}
				else if(y === this.settings.size-2){
					tileContent |= (TILE_TYPE.PAWN|bottomPlayer)

					if((topPlayer & TILE_TYPE.PLAYER_WHITE) > 0){
						this.darkPieces.push([x,y])
					}
				}

				row.push(tileContent)
			}
			tiles.push(row)
		}

		return tiles
	}

	_coordInsideBoard(coord){
		return (coord[0] >= 0 && coord[0] < 8 && coord[1] >= 0 && coord[1] < 8)
	}

	//#region calculatePossibleMoves
	_getPossibleMoves({piece, location}){
		let moves = []
		if((piece & TILE_TYPE.PAWN) > 0){
			moves.push(...this._getPossiblePawnMoves({board: this.board, piece, location}))
		}
		else if((piece & TILE_TYPE.ROOK)){
			moves.push(...this._getPossibleRookMoves({board: this.board, piece,location}))
		}
		else if((piece & TILE_TYPE.CASTLE)){
			moves.push(...this._getPossibleCastleMoves({board: this.board, piece,location}))
		}
		else if((piece & TILE_TYPE.BISHOP)){
			moves.push(...this._getPossibleBishopMoves({board: this.board, piece,location}))
		}
		else if((piece & TILE_TYPE.QUEEN)){
			moves.push(...this._getPossibleQueenMoves({board: this.board, piece,location}))
		}
		else if((piece & TILE_TYPE.KING)){
			// let enemyMoves = this._calculateAllPossibleMovesForPlayer(TILE_TYPE.PLAYERS & ~piece)
			 moves.push(...this._getPossibleKingMoves({board: this.board, piece, location}))

			// moves = moves.filter(m => !enemyMoves.includes(m))
		}
		return moves
	}

	*_getPossibleKingMoves({board, piece, location}){
		let dirs = [
			[1,1],
			[1,-1],
			[-1,1],
			[-1,-1],
			[0,1],
			[0,-1],
			[1,0],
			[-1,0]
		]
		for(let dir of dirs){
			let move = [location[0]+dir[0], location[1] + dir[1]]
			if(!this._coordInsideBoard(move)) continue
			console.log(move)
			if((board[move[1]][move[0]] & piece & TILE_TYPE.PLAYERS) === 0){
				if(this._verifyKingIsSafeOnNewLocation({board, piece, oldLocation:location, newLocation:move})){
					yield move
				}
			}
		}
	}

	_verifyKingIsSafeOnNewLocation({board, piece, oldLocation, newLocation}){
		board = [ /**clone board */
			[...board[0]],
			[...board[1]],
			[...board[2]],
			[...board[3]],
			[...board[4]],
			[...board[5]],
			[...board[6]],
			[...board[7]],
		]

		/** we van verify this by checking for every unit type if the king can perform this move, because we know its the same the other way around */
		let location = newLocation
		board[oldLocation[1]][oldLocation[0]] &= ~TILE_TYPE.PIECE_PLAYER
		board[newLocation[1]][newLocation[0]] &= ~TILE_TYPE.PIECE_PLAYER
		board[newLocation[1]][newLocation[0]] |= piece

		/** first check for queen moves, since queen can do castle, bishop and queen moves */
		for(let dir of [
			[1,1],
			[1,-1],
			[-1,1],
			[-1,-1],
			[0,1],
			[0,-1],
			[1,0],
			[-1,0]
		]){
			let current = newLocation
			do{
				let next = [current[0]+dir[0], current[1]+dir[1]]
				if(this._coordInsideBoard(next)){
					if((board[next[1]][next[0]] & ( TILE_TYPE.PLAYERS)) > 0){
						/**if piece is enemy piece check if it is a bishop,castle or queen, if so the move is not possible */
						if((board[next[1]][next[0]] & ~piece & TILE_TYPE.PLAYERS) > 0){
							if((board[next[1]][next[0]] & (TILE_TYPE.QUEEN|TILE_TYPE.CASTLE|TILE_TYPE.BISHOP)) > 0)
								return false
						}
						break
					}
				}
				else break
				current = next
			}	while(true)
		}
		/**now we only have the rook, king and pawn to go */

		/** ROOK */
		for(let delta of [
			[2,1],
			[2,-1],
			[-2,1],
			[-2,-1],
			[1,2],
			[1,-2],
			[-1,2],
			[-1,-2]
		]){
			let destination = [location[0]+delta[0],location[1]+delta[1]]
			if(this._coordInsideBoard(destination)){
				/** check if the piece there is not your own */
				if((board[destination[1]][destination[0]] & (~piece & TILE_TYPE.PLAYERS)) > 0){
					if((board[destination[1]][destination[0]] & TILE_TYPE.ROOK) > 0)
						return false
				}
			}
		}
		/** KING */
		let dirs = [
			[1,1],
			[1,-1],
			[-1,1],
			[-1,-1],
			[0,1],
			[0,-1],
			[1,0],
			[-1,0]
		]
		for(let dir of dirs){
			let move = [location[0]+dir[0], location[1] + dir[1]]
			if(!this._coordInsideBoard(move)) continue
			if((board[move[1]][move[0]] & (~piece & TILE_TYPE.PLAYERS)) > 0){
				if((board[move[1]][move[0]] & TILE_TYPE.KING) > 0)
					return false
			}
		}

		/** PAWN */
		let playerWhite = (piece & TILE_TYPE.PLAYER_WHITE)>0
		let playingBottomSide = playerWhite === this.settings.whiteBottom
		let direction = playingBottomSide? -1 : 1

		/**now check for possible attack moves */
		let enemyPlayer = playerWhite? TILE_TYPE.PLAYER_BLACK : TILE_TYPE.PLAYER_WHITE
		/** left attack */
		if(location[0] > 0){
			if((board[location[1]+direction][location[0]-1] & enemyPlayer) > 0){
				if((board[location[1]+direction][location[0]-1] & TILE_TYPE.PAWN) > 0)
					return false
			}
		}
		/** Right attack */
		if(location[0] < this.settings.size){
			if((board[location[1]+direction][location[0]+1] & enemyPlayer) > 0){
				if((board[location[1]+direction][location[0]+1] & TILE_TYPE.PAWN) > 0)
					return false
			}
		}

		return true
	}

	*_getPossibleCastleMoves({board, piece, location}){
		let dirs = [
			[0,1],
			[0,-1],
			[1,0],
			[-1,0]
		]

		for(let dir of dirs){
			let current = location
			do{
				let next = [current[0]+dir[0],current[1]+dir[1]]
				if(this._coordInsideBoard(next)){
					if((board[next[1]][next[0]] & TILE_TYPE.PIECE_PLAYER) === 0){
						yield next
					}
					else if((board[next[1]][next[0]] & ( TILE_TYPE.PLAYERS)) > 0){
						if((board[next[1]][next[0]] & (~piece & TILE_TYPE.PLAYERS)) > 0){
							yield next
						}
						break
					}
				}
				else break
				current = next
			}	while(true)
		}
	}

	*_getPossibleBishopMoves({board, piece, location}){
		let dirs = [
			[1,1],
			[1,-1],
			[-1,1],
			[-1,-1]
		]

		for(let dir of dirs){
			let current = location
			do{
				let next = [current[0]+dir[0],current[1]+dir[1]]
				if(this._coordInsideBoard(next)){
					if((board[next[1]][next[0]] & TILE_TYPE.PIECE_PLAYER) === 0){
						yield next
					}
					else if((board[next[1]][next[0]] & ( TILE_TYPE.PLAYERS)) > 0){
						if((board[next[1]][next[0]] & (~piece & TILE_TYPE.PLAYERS)) > 0){
							yield next
						}
						break
					}
				}
				else break
				current = next
			}	while(true)
		}
	}

	*_getPossibleQueenMoves({board, piece, location}){
		let dirs = [
			[1,1],
			[1,-1],
			[-1,1],
			[-1,-1],
			[0,1],
			[0,-1],
			[1,0],
			[-1,0]
		]

		for(let dir of dirs){
			let current = location
			do{
				let next = [current[0]+dir[0],current[1]+dir[1]]
				if(this._coordInsideBoard(next)){
					if((board[next[1]][next[0]] & TILE_TYPE.PIECE_PLAYER) === 0){
						yield next
					}
					else if((board[next[1]][next[0]] & ( TILE_TYPE.PLAYERS)) > 0){
						if((board[next[1]][next[0]] & (~piece & TILE_TYPE.PLAYERS)) > 0){
							yield next
						}
						break
					}
				}
				else break
				current = next
			}	while(true)
		}
	}

	*_getPossibleRookMoves({board, piece, location}){
		let moveDeltas = [
			[2,1],
			[2,-1],
			[-2,1],
			[-2,-1],
			[1,2],
			[1,-2],
			[-1,2],
			[-1,-2]
		]
		for(let delta of moveDeltas){
			let destination = [location[0]+delta[0],location[1]+delta[1]]
			if(this._coordInsideBoard(destination)){
				/** check if the piece there is not your own */
				if((board[destination[1]][destination[0]] & (piece & TILE_TYPE.PLAYERS)) === 0){
					yield destination
				}
			}
		}
	}
	*_getPossiblePawnMoves({board, piece, location}){
		let playerWhite = (piece & TILE_TYPE.PLAYER_WHITE)>0
		let playingBottomSide = playerWhite === this.settings.whiteBottom
		let direction = playingBottomSide? -1 : 1

		/** 1. check if tile in front is free */
		if((board[location[1] + direction][location[0]] & TILE_TYPE.PIECES) === 0){
			yield [location[0], location[1] + direction]

			/** 1.1. now that we know you can walk 1 step, check if at basestation, and if, doublestep is possible to */
			if((playingBottomSide && 8-location[1] === 2) || (!playingBottomSide && location[1] === 1)){
				let direction2 = playingBottomSide? -2 : 2
				if((board[location[1] + direction2][location[0]] & TILE_TYPE.PIECES) === 0){
					yield [location[0], location[1] + direction2]
				}
			}		
		}
		/**now check for possible attack moves */
		let enemyPlayer = playerWhite? TILE_TYPE.PLAYER_BLACK : TILE_TYPE.PLAYER_WHITE
		/** left attack */
		if(location[0] > 0){
			if((board[location[1]+direction][location[0]-1] & enemyPlayer) > 0){
				yield [location[0]-1, location[1] + direction]
			}
		}
		/** Right attack */
		if(location[0] < this.settings.size){
			if((board[location[1]+direction][location[0]+1] & enemyPlayer) > 0){
				yield [location[0]+1, location[1] + direction]
			}
		}

		/** TODO: rarely used rule that, if you move 3 steps, and the openent moves 2 instantly so it ends up behind, you may take it */
	}
	//#endregion
	//#endregion
}
export default ChessGame