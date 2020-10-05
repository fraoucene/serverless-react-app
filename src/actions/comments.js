import { FETCH_COMMENTS, SET_COMMENTS } from "./constants";

export const fetchComments = () => ({
  type: FETCH_COMMENTS,
});

export const setComments = () => ({
  type: SET_COMMENTS,
});
