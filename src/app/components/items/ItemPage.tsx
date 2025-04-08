"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import ItemTitle from "./ItemTitle";

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

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;

  return (
    <div>
      <ItemTitle item={data} />
      {data.memo}
    </div>
  );
}

export default ItemPage;
