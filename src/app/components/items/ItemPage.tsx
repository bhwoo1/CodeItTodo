"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import ItemTitle from "./ItemTitle";
import ItemImage from "./ItemImage";
import ItemMemo from "./ItemMemo";

const fetchTodo = async (itemId: number) => {
  const tenantId = "bhwoo";
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
  const [newMemo, setNewMemo] = useState(data.memo);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;


  return (
    <div>
      <ItemTitle item={data} />
      <div className="flex flex-col lg:flex-row gap-1 lg:gap-14">
        <ItemImage item={data} imageSrc={uploadImage} onImageChange={setUploadImage} />
        <ItemMemo item={data} newMemo={newMemo} onMemoUpdate={setNewMemo}/>
      </div>
    </div>
  );
}

export default ItemPage;
