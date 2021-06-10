import {
  loginSuccess
} from './authentication.actions'
import {startWsConnection} from '../game/game.actions'

import jwt_decode from "jwt-decode"

export function authMiddleware({ dispatch, getState }) {
  return function (next) {
    return function (action) {
      console.debug(action.type)

      if(action.type === loginSuccess.type){
        var decoded = jwt_decode(action.payload.idToken)
        action.payload = {
          ...action.payload,
          userInfo: decoded
        }
        dispatch(startWsConnection(decoded.sub))
      }
      return next(action)
    }
  }
}
