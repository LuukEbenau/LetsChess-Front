export function coordToChessName(x,y){
	return String.fromCharCode(97+x)+(8-y)
}
export function chessNameToCoord(name){
	return [name.charCodeAt(0)-97, 8-parseInt(name[1])]
}