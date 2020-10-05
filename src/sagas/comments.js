import { all, takeLatest } from "redux-saga/effects";

function* handleFetchComments(action) {
  yield console.log("handleFetchComments ", action);
}

export default function* rootSaga() {
  yield all([takeLatest("FETCH_COMMENTS", handleFetchComments)]);
}
