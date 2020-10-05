import { all } from "redux-saga/effects";
import todos from "./todos";
import comments from "./comments";

export default function* rootSaga() {
  yield all([todos(), comments()]);
}
