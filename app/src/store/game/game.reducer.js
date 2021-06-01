import { createReducer } from '@reduxjs/toolkit'

import WSClient from '../../logic/wsclient'

import {
  gameFound,
  startWsConnection
} from './game.actions'
const initialState = {
  wsClient: new WSClient(),
  matchId: null,
  opponent: null,
  playingWhite: true,
}

const reducer = createReducer(initialState, {
  [startWsConnection]: (state, action) => {
    const {userId} = action.payload
    state.wsClient.connect(userId)
  },
  [gameFound]: (state,action) =>{
    const {matchId,opponent,playingWhite} = action.payload
    state.matchId = matchId
    state.opponent = opponent
    state.playingWhite = playingWhite
  }
})

export default reducer
