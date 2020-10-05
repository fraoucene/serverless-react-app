import { SET_TODOS } from "../actions/constants";

export default function todos(state = [], action) {
  switch (action.type) {
    case SET_TODOS:
      return action.todos;
    default:
      return state;
  }
}
