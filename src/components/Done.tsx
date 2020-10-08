import React from "react";
import { DoneItem } from "../App";

interface DoneProps {
  doneItems: DoneItem[];
}

export const Done: React.FC<DoneProps> = ({ doneItems }) => {
  return (
    <div>
      <h3>Done</h3>
      {doneItems.map((item, index) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              border: "1px solid green",
              flexDirection: "column",
              padding: "5px",
              textAlign: "center",
              marginBottom: "5px",
            }}
            key={item.title + item.cost + index}
          >
            <h4 style={{ marginBottom: 5 }}>{item.title}</h4>
            <h4 style={{ marginBottom: 5 }}>{item.cost}$</h4>
          </div>
        );
      })}
    </div>
  );
};
