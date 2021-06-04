import { takeEvery, call } from 'redux-saga/effects'
import { takeMove } from './game.actions'

import { API_ENDPOINT } from '../../applicationSettings'

export default function* watcherSaga() {
  yield takeEvery(takeMove.type, takeMoveWorkerSaga)
}

function* takeMoveWorkerSaga(action) {
  try {
    console.debug('sending takeMove request')
    yield call(takeMoveRequest, action.payload)
  } catch (e) {
    console.debug("some/error",e)
  }
}

async function takeMoveRequest(request) {
  var headers = new Headers()
  headers.append('Authorization', 'Bearer ' + request.accessToken)
  headers.append("Accept", 'application/json')
  headers.append("Content-Type", 'application/json')
  
  var requestOptions = {
    method: 'POST',
    redirect: 'follow',
    body: JSON.stringify({
      userId: request.userId,
      matchId: request.matchId,
      from: request.from,
      to: request.to
    }),
    headers,
  }

  return fetch(`${API_ENDPOINT}/game/takeMove`, requestOptions)
    .then(r => {
      console.debug('request completed succesfully',r)
    })
    .catch(error =>
      console.error(
        'An error occured while contacting the takemove endpoint',
        error
      )
    )
}