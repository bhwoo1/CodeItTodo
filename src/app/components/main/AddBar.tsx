"use client";

import { useQueryClient } from "@tanstack/react-query";
import React, { FormEvent, useState } from "react";

function AddBar() {
  const [todo, setTodo] = useState("");
  const queryClient = useQueryClient();

  const handleTodoAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (todo === "") {
      return;
    }
    const tenantId = "bhwoo";
    const res = await fetch(
      `https://assignment-todolist-api.vercel.app/api/${tenantId}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "name" : todo
        }),
      }
    );

    if (res.ok) {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setTodo("");
    }
  };

  return (
    <form className="flex flex-row gap-12 my-8 mr-0">
      <input
        type="text"
        placeholder="할 일을 입력해주세요"
        className="w-2/3 lg:w-1/2 h-12 px-4 ml-12 lg:ml-96 bg-slate-300 border-2 border-slate-800 rounded-full outline-none shadow-[4px_4px_#0F172A]"
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="h-12 cursor-pointer" onClick={handleTodoAdd}>
        <div className="shadow-[4px_4px_#0F172A] rounded-full border-2 w-[50px] mr-12 lg:mr-96 md:w-[200px] bg-slate-200 h-12 flex text-center items-center justify-center">
          <span className="block sm:hidden text-2xl font-bold">+</span>
          <span className="hidden sm:block">+ 추가하기</span>
        </div>
      </button>
    </form>
  );
}

export default AddBar;
