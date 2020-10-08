import React, { useEffect, useState } from "react";
import { InProgressItem } from "../App";

interface InProgressItemProps {
  item: InProgressItem;
  index: number;
  inProgressItems: InProgressItem[];
  endWork: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => void;
}

export const InProgressItemCmp: React.FC<InProgressItemProps> = ({ item, endWork, index, inProgressItems }) => {
  const [forceUpdate, setForceUpdate] = useState([]);

  useEffect(() => {
    const timeUpdate = setInterval(() => {
      item.time.setSeconds(item.time.getSeconds() + 1);
      setForceUpdate([...forceUpdate]);
      localStorage.setItem("inProgressItems", JSON.stringify(inProgressItems));
    }, 1000);
    return () => {
      clearInterval(timeUpdate);
    };
  }, [item.time, forceUpdate, inProgressItems]);

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
    >
      <h4 style={{ marginBottom: 5 }}>{item.title}</h4>
      <h4 style={{ marginBottom: 5 }}>{item.time.toLocaleTimeString()}</h4>
      <button onClick={(e) => endWork(e, index)}>End</button>
    </div>
  );
};
