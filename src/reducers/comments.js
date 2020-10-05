import { SET_COMMENTS } from "../actions/constants";
export default function comments(state = [], action) {
  switch (action.type) {
    case "ADD_COMMENT":
      return state.concat([action.item]);
    case SET_COMMENTS:
      return action.comments;
    default:
      return state;
  }
}
