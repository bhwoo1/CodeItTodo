"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import ItemTitle from "./ItemTitle";
import ItemImage from "./ItemImage";
import ItemMemo from "./ItemMemo";
import Button from "./Button";
import { useRouter } from "next/navigation";
import Loading from "../Loading";

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
}; // api 요청




function ItemPage({ itemId }: { itemId: number }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["todo", itemId],
    queryFn: () => fetchTodo(itemId),
  }); // todo 관리
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [newMemo, setNewMemo] = useState<string | null>(null);
  const [newName, setNewName] = useState<string | null>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  // data가 없을 시 메인으로 이동
  useEffect(() => {
    if (!data) {
      router.push("/");
    }
  }, [data, router]);



  if (isLoading) return <Loading />;
  if (isError) return <div>에러 발생</div>;
  if(!data) return null;

  const handleItemUpdate = async () => {
    const body: { name?: string | null; memo?: string | null; imageUrl?: string } = {};

    if (newName !== undefined && newName !== null) {
      body.name = newName;
    }

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
      queryClient.invalidateQueries({ queryKey: ["todo", itemId] });
      setNewMemo("");
      router.push("/");
    }
  }; // api 요청(TODO 수정)

  const handleItemDelete = async () => {
    const res = await fetch(
      `https://assignment-todolist-api.vercel.app/api/${tenantId}/items/${itemId}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) router.push("/");
  }; // api 요청(TODO 삭제)

  return (
    <div className="w-full flex flex-col gap-4">
      <ItemTitle item={data} title={newName} onTitleChange={setNewName}/>
      <div className="flex flex-col lg:flex-row justify-center items-center lg:justify-between gap-4 lg:gap-12">
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
