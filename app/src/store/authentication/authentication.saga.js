import { takeEvery, call, put } from 'redux-saga/effects'
import { userinfoRetrieved, retrieveUserinfo } from './authentication.actions'

import { API_ENDPOINT } from '../../applicationSettings'

export default function* watcherSaga() {
  yield takeEvery(retrieveUserinfo.type, userinfoWorkerSaga)
}

function* userinfoWorkerSaga(action) {
  try {
    console.log('retrieving userinfo')
    const payload = yield call(retrieveUserInfoRequest, action.payload)
    yield put(userinfoRetrieved(payload))
  } catch (e) {
    console.debug("some/error",e)
  }
}

function retrieveUserInfoRequest(request) {
  var headers = new Headers()
  headers.append('Authorization', 'Bearer ' + request.accessToken)

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers,
  }

  return fetch(`${API_ENDPOINT}/auth/userinfo`, requestOptions)
    .then(r => {
      return r.json()
    })
    .catch(error =>
      console.error(
        'An error occured while contacting the userinfo endpoint',
        error
      )
    )
}