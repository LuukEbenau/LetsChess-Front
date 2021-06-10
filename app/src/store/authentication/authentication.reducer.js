import { createReducer } from '@reduxjs/toolkit'

import {
  loginSuccess,

  userinfoRetrieved,
} from './authentication.actions'
const initialState = {
  idToken: '',
  isLoggedIn: false,
  tokenExpire: null,

  userInfo: {
    family_name: null,
    given_name: null,
    locale: null,
    name: null,
    nonce: null,
    picture: null,
    sub: null
  }
}

const reducer = createReducer(initialState, {
  [loginSuccess]: (state, action) => {
    const {idToken, userInfo, expiresIn} = action.payload

    state.idToken = idToken
    state.tokenExpire = Date.now() + expiresIn

    state.userInfo = userInfo

    state.isLoggedIn = true
    
  },
})

export default reducer
