import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { authMiddleware } from './authentication/authentication.middleware'
import createSagaMiddleware from 'redux-saga'

import authReducer from './authentication/authentication.reducer'
import authSaga from './authentication/authentication.saga'

const initialiseSagaMiddleware = createSagaMiddleware()

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const combinedReducers = combineReducers({
  auth: authReducer,
})

const store = createStore(
  combinedReducers,
  storeEnhancers(
    applyMiddleware(
      authMiddleware,
      initialiseSagaMiddleware
    )
  )
)

initialiseSagaMiddleware.run(authSaga)

export default store
