"use client";

import { Item } from "@/app/Type";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function ItemTitle({ item }: { item: Item }) {
  const [imageSrc, setImageSrc] = useState("/ic/Property 1=Default.png");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (item.isCompleted) {
      setImageSrc("/ic/Property 1=Frame 2610233.png");
    } else {
      setImageSrc("/ic/Property 1=Default.png");
    }
  }, [item.isCompleted]);

  const handleComplete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const tenantId = "bhwoo";


    const res = await fetch(
      `https://assignment-todolist-api.vercel.app/api/${tenantId}/items/${item.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isCompleted: !item.isCompleted,
        }),
      }
    );

    if (res.ok) {
      queryClient.invalidateQueries({ queryKey: ["todo", item.id] });
    }
  };

  return (
    <div
      className={`${
        item.isCompleted ? "bg-violet-100" : "bg-slate-100"
      } mx-4 lg:mx-0 w-11/12 h-[50px] border-2 rounded-xl flex items-center px-24 gap-12 text-center justify-center`}
    >
      <button
        className="cursor-pointer hover:scale-110 transition duration-100"
        onClick={handleComplete}
      >
        <Image src={imageSrc} alt="completeIc" width={30} height={30} />
      </button>
      <p className="underline">{item.name}</p>
    </div>
  );
}

export default ItemTitle;
