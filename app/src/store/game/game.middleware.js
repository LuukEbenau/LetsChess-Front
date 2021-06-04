import {  takeMove } from "./game.actions"

export function gameMiddleware({ dispatch, getState }) {
  return function (next) {
    return function (action) {
      if(action.type === takeMove.type){
        action.payload.matchId = getState().game.matchId
        action.payload.userId = getState().auth.userId
        action.payload.accessToken = getState().auth.accessToken
        
        console.log(action.type,action.payload)
      }
      
      return next(action)
    }
  }
}
