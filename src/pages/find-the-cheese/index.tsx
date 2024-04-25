import Maze from "@/component/Maze";
import { FindTheCheeseProps } from "@/interface/findTheCheese";
import { fetchGetMaze } from "@/services/index";

export async function getServerSideProps() {
  const response = await fetchGetMaze();
  const data = await response.data;

  return {
    props: {
      maze: data,
    },
  };
}

export default function FindTheCheese({ maze }: FindTheCheeseProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="container p-4">
        {maze.map(item => (
          <Maze data={item} />
        ))}
      </div>
    </div>
  );
}
