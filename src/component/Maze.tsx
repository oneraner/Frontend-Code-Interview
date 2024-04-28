import { MazeCell } from "@/model/api/maze/maze";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";

interface MazeProps {
  data: MazeCell[][];
}

const Mouse = () => <div className="w-5 h-5 bg-mouse"></div>;
const Cheese = ({ className }: { className?: string }) => (
  <div data-id="cheese" className={`w-5 h-5 bg-cheese ${className}`}></div>
);

const getStartEnd = (maze: MazeCell[][]) => {
  let start = "";
  let end = "";

  maze.forEach((col: MazeCell[], colIndex: number) =>
    col.forEach((row, rowIndex) => {
      if (row === "start") {
        start = `${colIndex},${rowIndex}`;
      }
      if (row === "end") {
        end = `${colIndex},${rowIndex}`;
      }
    })
  );
  return { start, end };
};

export default function Maze({ data }: MazeProps) {
  const [start, setStart] = useState(false);
  const [mouse, setMouse] = useState("0,0");
  const [cheese, setCheese] = useState("0,0");
  const [paths, setPaths] = useState<string[]>([]);
  const [goUpdatePath, setGoUpdatePath] = useState(false);

  const result = useRef<string[][]>([]);
  const timerRef = useRef<NodeJS.Timeout>();

  const STEP_TIME = 100;

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

  useEffect(() => {
    if (!data) return;
    const { start, end } = getStartEnd(data);
    setMouse(start);
    setCheese(end);
  }, [data]);

  useEffect(() => {
    if (!start) return;
    getDfsResult(data);
  }, [start]);

  useEffect(() => {
    if (!goUpdatePath) return;
    let index = 0;
    timerRef.current = setInterval(() => {
      if (index < result.current.length) {
        const currentPath = result.current[index];
        const mousePosition = currentPath[currentPath.length - 1] || "0,0";
        setPaths(currentPath);
        setMouse(mousePosition);
        if (currentPath[currentPath.length - 1] === cheese) return;
        index++;
      } else {
        clearInterval(timerRef.current);
        setGoUpdatePath(false);
      }
    }, STEP_TIME);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [goUpdatePath]);

  const getDfsResult = (maze: MazeCell[][]) => {
    const startRow = maze.findIndex(row => row.includes("start"));
    const startCol = maze[startRow].indexOf("start");
    const endRow = maze.findIndex(row => row.includes("end"));
    const endCol = maze[endRow].indexOf("end");

    const visited = new Set<string>();

    const dfs = (x: number, y: number, path: string[]) => {
      if (!start) return;
      if (x === endRow && y === endCol) {
        result.current.push([...path, `${x},${y}`]);
        setGoUpdatePath(true);
        return;
      }

      const currentPosition = `${x},${y}`;
      visited.add(currentPosition);
      result.current.push([...visited]);

      const directions = [
        [0, -1],
        [0, 1],
        [-1, 0],
        [1, 0],
      ];

      let found = false;
      for (const direction of directions) {
        const newX = x + direction[0];
        const newY = y + direction[1];
        const newPosition = `${newX},${newY}`;
        if (
          newX >= 0 &&
          newX < maze.length &&
          newY >= 0 &&
          newY < maze[0].length &&
          maze[newX][newY] !== "wall" &&
          !visited.has(newPosition)
        ) {
          dfs(newX, newY, [...path, currentPosition]);
          if (
            result.current[result.current.length - 1].slice(-1)[0] ===
            `${endRow},${endCol}`
          ) {
            found = true;
            break;
          }
        }
      }

      if (!found) {
        result.current.push([...path]);
        setGoUpdatePath(true);
      }

      visited.delete(currentPosition);
      result.current.push([...visited]);
    };

    dfs(startRow, startCol, [`${startRow},${startCol}`]);
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setStart(false);
    setMouse(getStartEnd(data).start);
    setPaths([]);
    setGoUpdatePath(false);
    result.current = [];
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="mb-2">
        {data.map((col, colIndex) => (
          <div className="flex" key={colIndex}>
            {col.map((row, rowIndex) => {
              const isPath = !!paths.find(
                path => path === `${colIndex.toString()},${rowIndex.toString()}`
              );
              if (mouse === `${colIndex},${rowIndex}`) {
                return <Mouse key={rowIndex} />;
              }
              if (cheese === `${colIndex},${rowIndex}`) {
                return <Cheese key={rowIndex} />;
              }
              return (
                <div
                  className={`w-5 h-5 ${isPath ? "bg-highLight" : getBlockColor(row)}`}
                  data-id={`${colIndex}-${rowIndex}`}
                  key={rowIndex}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
      <Button
        className="md:w-[768px]"
        text={start ? "Reset" : "Start"}
        onClick={start ? handleReset : () => setStart(true)}
      />
    </div>
  );
}
