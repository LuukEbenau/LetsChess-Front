import { createReducer } from '@reduxjs/toolkit'

import {
  loginSuccess,

  userinfoRetrieved,
} from './authentication.actions'
const initialState = {
  accessToken: '',
  isLoggedIn: false,
  tokenExpire: null,

  userId:null,
  username: null,
  profilePicture: null,
}

const reducer = createReducer(initialState, {
  [loginSuccess]: (state, action) => {
    console.log(action.payload.access_token)
    state.accessToken = action.payload.access_token
    state.isLoggedIn = true
    state.tokenExpire = Date.now() + action.payload.expires_in
  },
  [userinfoRetrieved]: (state,action) => {
    state.username = action.payload.name;
    state.profilePicture = action.payload.picture;
    console.log('setting userId as',action.payload.externalId,action.payload)
    state.userId = action.payload.externalId;
  }
})

export default reducer
