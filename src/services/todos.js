import { API } from "aws-amplify";

export async function fetchTodos() {
  const res = await API.get("todos", "/todos");
  return res;
}

export async function addTodo(name, description, username) {
  if (!name || !description) return;
  const todo = { name, description, username };
  const config = {
    body: todo,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const resp = await API.post("todos", "/todos", config);
  return resp;
}

export async function removeTodo(id) {
  await API.del("todos", `/todos/${id}`);
}
