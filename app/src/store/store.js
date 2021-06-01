import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { authMiddleware } from './authentication/authentication.middleware'
import createSagaMiddleware from 'redux-saga'

import authReducer from './authentication/authentication.reducer'
import authSaga from './authentication/authentication.saga'

import gameReducer from './game/game.reducer'
import gameSaga from './game/game.saga'

import { matchmakingMiddleware }  from './matchmaking/matchmaking.middleware'
import matchmakingSaga from './matchmaking/matchmaking.saga'
import { gameMiddleware } from './game/game.middleware'

const initialiseSagaMiddleware = createSagaMiddleware()

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const combinedReducers = combineReducers({
  auth: authReducer,
  game: gameReducer
})

const store = createStore(
  combinedReducers,
  storeEnhancers(
    applyMiddleware(
      authMiddleware,
      matchmakingMiddleware,
      gameMiddleware,
      initialiseSagaMiddleware
    )
  )
)

initialiseSagaMiddleware.run(authSaga)
initialiseSagaMiddleware.run(matchmakingSaga)
initialiseSagaMiddleware.run(gameSaga)

export default store
