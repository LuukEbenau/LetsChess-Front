import {
  loginSuccess, retrieveUserinfo
} from './authentication.actions'

export function authMiddleware({ dispatch, getState }) {
  return function (next) {
    return function (action) {
      console.debug(action.type)
      if(action.type === loginSuccess.type){
        dispatch(retrieveUserinfo(action.payload.access_token))
      }

      return next(action)
    }
  }
}
