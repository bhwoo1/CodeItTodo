"use client"

import React from 'react'
import AddBar from './AddBar'
import TodoList from './TodoList'
import { useQuery } from '@tanstack/react-query';

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

function TodoPage() {
    const { data, isLoading, isError } = useTodoDatas();

  return (
    <div className="flex justify-center">
      <div className="w-full lg:w-2/3 h-full flex flex-col items-center jutify-center">
        <AddBar todos={data}/>
        <TodoList todos={data} isLoading={isLoading} isError={isError} />
      </div>
    </div>
  )
}

export default TodoPage