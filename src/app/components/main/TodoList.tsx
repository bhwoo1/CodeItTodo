"use client"

import Image from "next/image";
import React from "react";

function TodoList() {
  return (
    <div className="lg:mx-96 mx-12 flex flex-col lg:flex-row justify-between">
      <div className="flex flex-col">
        <Image src={"/img/todo.png"} alt="todo" width={100} height={100} />
        <div>

        </div>
      </div>
      <div className="flex flex-col">
        <Image src={"/img/done.png"} alt="todo" width={100} height={100} />
      </div>
    </div>
  );
}

export default TodoList;
