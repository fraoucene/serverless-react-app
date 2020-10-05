import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "antd";
import { Card, Button, Input } from "antd";
import "antd/dist/antd.css";
import { Layout, Spin } from "antd";
import { Auth } from "aws-amplify";
import { fetchTodos, addTodo, removeTodo } from "../actions/todos";
import { connect } from "react-redux";

const { Content } = Layout;

const HomePage = ({ fetchTodos, todos, addTodo, removeTodo }) => {
  const [currnetUsername, setCurrnetUsername] = useState("");
  const initialFormState = { name: "", description: "" };
  const [formState, setFormState] = useState(initialFormState);

  useEffect(() => {
    fetchCurrnetUsername();
    fetchTodos();
  }, [fetchTodos]);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function fetchCurrnetUsername() {
    try {
      const res = await Auth.currentUserInfo();
      setCurrnetUsername(res.username);
    } catch (err) {
      console.log(err);
      console.log("error fetching current username");
    }
  }

  return (
    <div>
      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content">
          <PageHeader
            className="site-page-header"
            title={`Welcome ${currnetUsername}`}
            subTitle="To-do list powered by AWS serverless architecture (api geteway, dynamoDB, lambda function)"
            style={styles.header}
          />
        </div>
        <div>
          <Input
            onChange={(event) => setInput("name", event.target.value)}
            value={formState.name}
            placeholder="Name"
            style={styles.input}
          />
          <Input
            onChange={(event) => setInput("description", event.target.value)}
            value={formState.description}
            placeholder="Description"
            style={styles.input}
          />
          <Button
            onClick={() =>
              addTodo(formState.name, formState.name, currnetUsername)
            }
            type="primary"
            style={styles.submit}
          >
            Add
          </Button>
        </div>
        {todos && todos.Items && todos.Items.length ? (
          <div>
            {todos.Items.map((todo, index) => (
              <Card
                key={todo.todoId ? todo.todoId.S : index}
                title={todo.name.S ? todo.name.S : todo.name}
                style={{ width: 300 }}
              >
                <p>
                  {todo.description.S ? todo.description.S : todo.description}
                </p>
                {todo.todoId && todo.username.S === currnetUsername && (
                  <Button
                    type="primary"
                    onClick={() => removeTodo(todo.todoId.S)}
                  >
                    Done
                  </Button>
                )}
                <Button>
                  {todo.todoId && (
                    <Link className="button" to={`/edit/${todo.todoId.S}`}>
                      More
                    </Link>
                  )}
                </Button>
              </Card>
            ))}
          </div>
        ) : (
          <Spin />
        )}
      </Content>
    </div>
  );
};

const styles = {
  input: {
    margin: "10px 0",
  },
  submit: {
    margin: "10px 0",
    marginBottom: "20px",
  },
  header: {
    paddingLeft: "0px",
  },
};

const mapStateToProps = (s) => ({
  todos: s.todos,
});

export default connect(mapStateToProps, {
  fetchTodos,
  addTodo,
  removeTodo,
})(HomePage);
