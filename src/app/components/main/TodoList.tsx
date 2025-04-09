"use client";

import { Item } from "@/app/Type";
import Image from "next/image";
import React from "react";
import TodoBlock from "./TodoBlock";
import Loading from "../Loading";

function TodoList({todos, isLoading, isError}: {todos: Item[], isLoading: boolean, isError: boolean}) {

  if (isLoading) return <Loading />;
  if (isError) return <div>에러 발생</div>;

  const completedItems = todos.filter((item: Item) => item.isCompleted);
  const incompletedItems = todos.filter((item: Item) => !item.isCompleted);


  return (
    <div className="w-full justify-center flex flex-col lg:flex-row lg:justify-between mx-24 gap-24">
      <div className="flex flex-col mx-16 lg:mx-0 lg:w-1/2">
        <Image src={"/img/todo.png"} alt="todo" width={100} height={100} />
        <div>
          {incompletedItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center text-slate-400 gap-4">
              <div className="p-12">
                <Image
                  src={"/img/todo_large.png"}
                  alt="completed"
                  width={200}
                  height={200}
                />
                <p>할 일이 없어요.</p>
                <p>TODO를 새롭게 추가해주세요!</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 mt-8">
              {incompletedItems.map((item: Item) => (
                <div key={item.id}>
                  <TodoBlock item={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col mx-16 lg:mx-0 lg:w-1/2">
        <Image src={"/img/done.png"} alt="todo" width={100} height={100} />
        <div>
          {completedItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center text-slate-400 gap-4">
              <div className="p-12">
                <Image
                  src={"/img/done_large.png"}
                  alt="completed"
                  width={200}
                  height={200}
                />
                <p>아직 다 한 일이 없어요.</p>
                <p>해야 할 일을 체크해보세요!</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 mt-8">
              {completedItems.map((item: Item) => (
                <div key={item.id}>
                  <TodoBlock item={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
