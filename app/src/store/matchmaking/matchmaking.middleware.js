import {
  findMatch
} from './matchmaking.actions'

export function matchmakingMiddleware({ dispatch, getState }) {
  return function (next) {
    return function (action) {
      if(action.type === findMatch.type){
        action.payload.userId = getState().auth.userInfo.sub
        action.payload.idToken = getState().auth.idToken
        console.log(action.payload)
      }
      
      return next(action)
    }
  }
}
