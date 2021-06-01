import { MATCHMAKING } from '../action-types'
import { createAction } from '@reduxjs/toolkit'

export const findMatch = createAction(MATCHMAKING.FIND_MATCH, () => {
  return {
    payload: {},
  }
})


