import { FETCH_TODOS, SET_TODOS, ADD_TODO, REMOVE_TODO } from "./constants";

export const fetchTodos = () => ({
  type: FETCH_TODOS,
});

export const setTodos = (todos) => ({
  type: SET_TODOS,
  todos,
});

export const addTodo = (name, description, username) => ({
  type: ADD_TODO,
  name,
  description,
  username,
});

export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  id,
});
