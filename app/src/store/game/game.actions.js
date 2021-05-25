import { GAME } from '../action-types'
import { createAction } from '@reduxjs/toolkit'

export const startWsConnection = createAction(GAME.START_WS_CONNECTION, (userId) => {
  return {
    payload: {userId:userId},
  }
})