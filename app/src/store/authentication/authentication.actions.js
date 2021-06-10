import { AUTH } from '../action-types'
import { createAction } from '@reduxjs/toolkit'

/* OAUTH */
export const loginSuccess = createAction(AUTH.LOGIN_SUCCESS, (idToken,expiresIn,scope) => {
  return {
    payload: {idToken,scope,expiresIn},
  }
})
