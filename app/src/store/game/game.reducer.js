import { createReducer } from '@reduxjs/toolkit'

import WSClient from '../../logic/wsclient'

import {
  startWsConnection
} from './game.actions'
const initialState = {
  wsClient: new WSClient()
}

const reducer = createReducer(initialState, {
  [startWsConnection]: (state, action) => {
    const {userId} = action.payload
    state.wsClient.connect(userId)
  },
})

export default reducer
