import {
  loginSuccess, retrieveUserinfo, userinfoRetrieved
} from './authentication.actions'
import {startWsConnection} from '../game/game.actions'

export function authMiddleware({ dispatch, getState }) {
  return function (next) {
    return function (action) {
      console.debug(action.type)

      if(action.type === loginSuccess.type){
        dispatch(retrieveUserinfo(action.payload.access_token))
      }
      if(action.type === userinfoRetrieved.type){
        action.payload = JSON.parse(action.payload)
        const {externalId} = action.payload
       console.log(externalId)
        dispatch(startWsConnection(externalId))
      }
      return next(action)
    }
  }
}
