import { all, takeLatest, put } from "redux-saga/effects";
import { fetchTodos, addTodo, removeTodo } from "../services/todos";
import { FETCH_TODOS, ADD_TODO, REMOVE_TODO } from "../actions/constants";
import { setTodos } from "../actions/todos";

function* handleFetchTodos() {
  const todos = yield fetchTodos();
  yield put(setTodos(todos));
}

function* handleAddTodo(action) {
  const { name, description, username } = action;
  yield addTodo(name, description, username);
  yield handleFetchTodos();
}

function* handleRemoveTodo(action) {
  const { id } = action;
  yield removeTodo(id);
  yield handleFetchTodos();
}

export default function* rootSaga() {
  yield all([
    takeLatest(FETCH_TODOS, handleFetchTodos),
    takeLatest(ADD_TODO, handleAddTodo),
    takeLatest(REMOVE_TODO, handleRemoveTodo),
  ]);
}
