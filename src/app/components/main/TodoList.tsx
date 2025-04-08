"use client";

import { Item } from "@/app/Type";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import TodoBlock from "./TodoBlock";

const fetchTodos = async () => {
  const tenantId = "bhwoo";
  const res = await fetch(
    `https://assignment-todolist-api.vercel.app/api/${tenantId}/items`,
    {
      method: "GET",
    }
  );

  const data = await res.json();
  return data;
};

const useTodoDatas = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
};

function TodoList() {
  const { data, isLoading, isError } = useTodoDatas();

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;

  const completedItems = data.filter((item: Item) => item.isCompleted);
  const incompletedItems = data.filter((item: Item) => !item.isCompleted);


  return (
    <div className="lg:mx-96 mx-12 flex flex-col gap-12 lg:flex-row lg:gap-24">
      <div className="flex flex-col min-w-1/2">
        <Image src={"/img/todo.png"} alt="todo" width={100} height={100} />
        <div>
          {incompletedItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center text-slate-400 gap-4">
              <div className="p-12 md:p-24">
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
      <div className="flex flex-col min-w-1/2">
        <Image src={"/img/done.png"} alt="todo" width={100} height={100} />
        <div>
          {completedItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center text-slate-400 gap-4">
              <div className="p-12 md:p-24">
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
