import { MazeCell } from "@/model/api/maze/maze";
import { useState } from "react";
import Button from "./Button";

interface MazeProps {
  data: MazeCell[][];
}

export default function Maze({ data }: MazeProps) {
  const [start, setStart] = useState(false);
  const getBlockColor = (style: MazeCell) => {
    console.log("style", style);
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
        {data.map((col, index) => (
          <div className="flex">
            {col.map(row => (
              <div className={`w-5 h-5 ${getBlockColor(row)}`}></div>
            ))}
          </div>
        ))}
      </div>
      <Button className="md:w-[768px]" text={start ? "Start" : "Reset"} />
    </div>
  );
}
