import { AUTH } from '../action-types'
import { createAction } from '@reduxjs/toolkit'

/* OAUTH */
export const loginSuccess = createAction(AUTH.LOGIN_SUCCESS, (access_token,token_type,expires_in,scope) => {
  return {
    payload: {access_token,scope,expires_in},
  }
})

export const retrieveUserinfo = createAction(AUTH.RETRIEVE_USERINFO,(accessToken) => {
  return {
    payload: {accessToken: accessToken}
  }
})
export const userinfoRetrieved = createAction(
  AUTH.USERINFO_RETRIEVED,
  result => {
    return {
      payload: result,
    }
  }
)
