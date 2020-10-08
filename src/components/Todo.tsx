import React from "react";
import { TodoItem } from "../App";

interface TodoProps {
  todoItems: TodoItem[];
  startWork: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => void;
  addTodo: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Todo: React.FC<TodoProps> = ({
  todoItems,
  startWork: startTodo,
  addTodo,
}) => {
  return (
    <div>
      <h3>Todo</h3>
      {todoItems.map((item, index) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              border: "1px solid green",
              flexDirection: "column",
              padding: "5px",
              textAlign: "center",
              marginBottom: "5px"
            }}
            key={item.title + index}
          >
            <h4 style={{ marginBottom: 5 }}>{item.title}</h4>
            <button onClick={(e) => startTodo(e, index)}>Start</button>
          </div>
        );
      })}
      <button style={{ width: "100%" }} onClick={addTodo}>
        New Task
      </button>
    </div>
  );
};
