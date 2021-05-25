import { takeEvery, call, put } from 'redux-saga/effects'
import { findMatch } from './matchmaking.actions'

import { API_ENDPOINT } from '../../applicationSettings'

export default function* watcherSaga() {
  yield takeEvery(findMatch.type, findMatchWorkerSage)
}

function* findMatchWorkerSage(action) {
  try {
    console.debug('sending findmatch request')
    yield call(findMatchRequest, action.payload)
  } catch (e) {
    console.debug("some/error",e)
  }
}

function findMatchRequest(request) {
  var headers = new Headers()
  headers.append('Authorization', 'Bearer ' + request.accessToken)

  var requestOptions = {
    method: 'POST',
    redirect: 'follow',
    headers,
  }

  return fetch(`${API_ENDPOINT}/api/matchmaking/findmatch?userId=${request.userId}`, requestOptions)
    .then(r => {
      console.debug('request completed succesfully',r)
    })
    .catch(error =>
      console.error(
        'An error occured while contacting the userinfo endpoint',
        error
      )
    )
}