import React, { useEffect, useState } from "react";
import "./App.css";
import { Done } from "./components/Done";
import { Progress } from "./components/Progress";
import { Todo } from "./components/Todo";
import { SALARY_PER_HOUR } from "./constants";

export interface TodoItem {
  title: string;
}

export interface InProgressItem {
  title: string;
  time: Date;
}

export interface DoneItem {
  title: string;
  cost: number;
}

const App: React.FC = () => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [inProgressItems, setInProgressItems] = useState<InProgressItem[]>([]);
  const [doneItems, setDoneItems] = useState<DoneItem[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("todoItems")) {
      localStorage.setItem("todoItems", JSON.stringify([]));
    } else {
      setTodoItems(JSON.parse(localStorage.getItem("todoItems") || "{}"));
    }
    if (!localStorage.getItem("inProgressItems")) {
      localStorage.setItem("inProgressItems", JSON.stringify([]));
    } else {
      setInProgressItems(
        JSON.parse(
          localStorage.getItem("inProgressItems") || "[]"
        ).map((item: { title: string; time: string }) => ({
          ...item,
          time: new Date(item.time),
        }))
      );
    }
    if (!localStorage.getItem("doneItems")) {
      localStorage.setItem("doneItems", JSON.stringify([]));
    } else {
      setDoneItems(JSON.parse(localStorage.getItem("doneItems") || "{}"));
    }
  }, []);

  function addTodo(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    let title;
    do {
      title = prompt("What is the task title?", "");
    } while (!title);
    setTodoItems([...todoItems, { title }]);
    localStorage.setItem(
      "todoItems",
      JSON.stringify([...todoItems, { title }])
    );
  }

  function startWork(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) {
    setInProgressItems([
      ...inProgressItems,
      { ...todoItems[index], time: new Date(0, 0) },
    ]);
    setTodoItems([...todoItems.slice(0, index), ...todoItems.slice(index + 1)]);
    localStorage.setItem(
      "inProgressItems",
      JSON.stringify([
        ...inProgressItems,
        { ...todoItems[index], time: new Date(0, 0) },
      ])
    );
    localStorage.setItem(
      "todoItems",
      JSON.stringify([
        ...todoItems.slice(0, index),
        ...todoItems.slice(index + 1),
      ])
    );
  }

  function endWork(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) {
    setDoneItems([
      ...doneItems,
      {
        title: inProgressItems[index].title,
        cost:
          Math.round(
            (inProgressItems[index].time.getSeconds() / 60 / 60) *
              SALARY_PER_HOUR *
              100
          ) / 100,
      },
    ]);
    setInProgressItems([
      ...inProgressItems.slice(0, index),
      ...inProgressItems.slice(index + 1),
    ]);
    localStorage.setItem(
      "doneItems",
      JSON.stringify([
        ...doneItems,
        {
          title: inProgressItems[index].title,
          cost:
            Math.round(
              (inProgressItems[index].time.getSeconds() / 60 / 60) *
                SALARY_PER_HOUR *
                100
            ) / 100,
        },
      ])
    );
    localStorage.setItem(
      "inProgressItems",
      JSON.stringify([
        ...inProgressItems.slice(0, index),
        ...inProgressItems.slice(index + 1),
      ])
    );
  }

  return (
    <div
      style={{
        width: 400,
        margin: "100px auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gridColumnGap: 10,
        textAlign: "center",
      }}
    >
      <Todo todoItems={todoItems} startWork={startWork} addTodo={addTodo} />
      <Progress inProgressItems={inProgressItems} endWork={endWork} />
      <Done doneItems={doneItems} />
    </div>
  );
};

export default App;
