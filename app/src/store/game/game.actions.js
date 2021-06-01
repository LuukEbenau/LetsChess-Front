import { GAME } from '../action-types'
import { createAction } from '@reduxjs/toolkit'

export const startWsConnection = createAction(GAME.START_WS_CONNECTION, (userId) => {
  return {
    payload: {userId:userId},
  }
})



export const takeMove = createAction(GAME.TAKE_MOVE, (from,to) => {
  return {
    payload: {from,to},
  }
})

export const gameFound = createAction(GAME.GAME_FOUND, ({matchId, opponent, playingWhite}) => {
  return {
    payload: {matchId,opponent, playingWhite},
  }
})
