"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import ItemTitle from "./ItemTitle";
import ItemImage from "./ItemImage";
import ItemMemo from "./ItemMemo";
import Button from "./Button";
import { useRouter } from "next/navigation";

const tenantId = "bhwoo";
const fetchTodo = async (itemId: number) => {
  const res = await fetch(
    `https://assignment-todolist-api.vercel.app/api/${tenantId}/items/${itemId}`,
    {
      method: "GET",
    }
  );

  const data = await res.json();
  return data;
};

function ItemPage({ itemId }: { itemId: number }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["todo"],
    queryFn: () => fetchTodo(itemId),
  });
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [newMemo, setNewMemo] = useState<string | null>(data?.memo);
  const router = useRouter();
  const queryClient = useQueryClient();

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;

  const handleItemUpdate = async () => {
    const body: { memo?: string | null; imageUrl?: string } = {};

    if (newMemo !== undefined && newMemo !== null) {
      body.memo = newMemo;
    }

    if (uploadImage !== null) {
      body.imageUrl = uploadImage;
    }

    const res = await fetch(
      `https://assignment-todolist-api.vercel.app/api/${tenantId}/items/${data.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (res.ok) {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
      setNewMemo("");
      router.push("/");
    }
  };

  const handleItemDelete = async () => {
    const res = await fetch(
      `https://assignment-todolist-api.vercel.app/api/${tenantId}/items/${itemId}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) router.push("/");
  };

  return (
    <div className="flex flex-col gap-4">
      <ItemTitle item={data} />
      <div className="flex flex-col lg:flex-row gap-1 lg:gap-14">
        <ItemImage
          item={data}
          imageSrc={uploadImage}
          onImageChange={setUploadImage}
        />
        <ItemMemo item={data} newMemo={newMemo} onMemoUpdate={setNewMemo} />
      </div>
      <div className="flex flex-row gap-4 lg:gap-12 lg:justify-end lg:mr-24 justify-center">
        <button className="cursor-pointer" onClick={handleItemUpdate}>
          {data.memo && data.imageUrl ? (
            <Button title="/Type=Edit, Size=Large, State=Active.png" />
          ) : (
            <Button title="/Type=Edit, Size=Large, State=Default.png" />
          )}
        </button>
        <button className="cursor-pointer" onClick={handleItemDelete}>
          <Button title="/Type=Delete, Size=Large, State=Default.png" />
        </button>
      </div>
    </div>
  );
}

export default ItemPage;
