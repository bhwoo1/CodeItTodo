import AddBar from "./components/main/AddBar";
import TodoList from "./components/main/TodoList";

export default function Home() {
  return (
    <div className="flex justify-center">
      <div className="w-full lg:w-2/3 h-full flex flex-col items-center jutify-center">
        <AddBar />
        <TodoList />
      </div>
    </div>
  );
}
