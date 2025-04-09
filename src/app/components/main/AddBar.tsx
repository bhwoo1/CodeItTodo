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
    <form className="w-full flex flex-row justify-between my-8 gap-8 px-8 lg:px-0">
      <input
        type="text"
        placeholder="할 일을 입력해주세요"
        className="w-9/12 h-12 px-4 bg-slate-300 border-2 border-slate-800 rounded-full outline-none shadow-[4px_4px_#0F172A]"
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="w-1/6 md:w-1/4 h-12 cursor-pointer" onClick={handleTodoAdd}>
        <div className="shadow-[4px_4px_#0F172A] rounded-full border-2 w-full bg-slate-200 h-12 flex text-center items-center justify-center">
          <span className="block sm:hidden text-2xl font-bold">+</span>
          <span className="hidden sm:block">+ 추가하기</span>
        </div>
      </button>
    </form>
  );
}

export default AddBar;
