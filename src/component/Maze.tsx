import { MazeCell } from "@/model/api/maze/maze";
import { useState } from "react";
import Button from "./Button";

interface MazeProps {
  data: MazeCell[][];
}

const Mouse = ({ className }: { className?: string }) => (
  <div className={`$w-5 h-5 bg-mouse ${className}`}></div>
);
const Cheese = ({ className }: { className?: string }) => (
  <div className={`w-5 h-5 bg-cheese ${className}`}></div>
);

const getDfsResult = (maze: MazeCell[][]) => {
  let start = "";
  maze.forEach((col: MazeCell[], colIndex: number) =>
    col.forEach((row, rowIndex) => {
      if (row === "start") {
        start = `${colIndex}${rowIndex}`;
      }
    })
  );
  return start;
};

export default function Maze({ data }: MazeProps) {
  const [start, setStart] = useState(false);
  const getBlockColor = (style: MazeCell) => {
    switch (style) {
      case "path":
        return "bg-path";
      case "wall":
        return "bg-wall";
      default:
        return "bg-path";
    }
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="mb-2">
        {data.map((col, colIndex) => (
          <div className="flex" key={colIndex}>
            {col.map((row, rowIndex) => {
              if (row === "end") {
                return <Cheese key={rowIndex} />;
              }
              return (
                <div
                  className={`w-5 h-5 ${getBlockColor(row)}`}
                  data-id={`${colIndex}${rowIndex}`}
                  key={rowIndex}
                ></div>
              );
            })}
          </div>
        ))}
        <Mouse className="absolute" />
      </div>
      <Button
        className="md:w-[768px]"
        text={start ? "Reset" : "Start"}
        onClick={() => setStart(!start)}
      />
    </div>
  );
}
