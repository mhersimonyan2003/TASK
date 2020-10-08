import React from "react";
import { InProgressItem } from "../App";
import { InProgressItemCmp } from "./InProgressItemCmp";

interface ProgressProps {
  inProgressItems: InProgressItem[];
  endWork: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => void;
}

export const Progress: React.FC<ProgressProps> = ({
  inProgressItems,
  endWork,
}) => {
  return (
    <div>
      <h3>In Progress</h3>
      {inProgressItems.map((item, index) => {
        return (
          <InProgressItemCmp inProgressItems={inProgressItems} key={item.time.toString() + item.title + index} endWork={endWork} item={item} index={index} />
        );
      })}
    </div>
  );
};
