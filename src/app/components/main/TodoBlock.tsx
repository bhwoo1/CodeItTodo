"use client"

import { Item } from "@/app/Type";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function TodoBlock({ item }: { item: Item }) {
  const [imageSrc, setImageSrc] = useState("/ic/Property 1=Default.png");
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    if (item.isCompleted) {
      setImageSrc("/ic/Property 1=Frame 2610233.png");
    } else {
      setImageSrc("/ic/Property 1=Default.png");
    }
  }, [item.isCompleted]);

  const handleRedirect = () => {
    router.push(`/items/${item.id}`);
  }

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
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    }
  };

  return (
    <div
      onClick={handleRedirect}
      className={`flex flex-row ${
        item.isCompleted ? "bg-violet-100" : "bg-slate-100"
      } border-2 rounded-full h-[50px] items-center p-4 gap-12 cursor-pointer`}
    >
      <button
        className="cursor-pointer hover:scale-110 transition duration-100"
        onClick={handleComplete}
      >
        <Image src={imageSrc} alt="completeIc" width={30} height={30} />
      </button>
      <p className={`${item.isCompleted && "line-through"}`}>{item.name}</p>
    </div>
  );
}

export default TodoBlock;
