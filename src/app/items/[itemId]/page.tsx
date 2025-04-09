import ItemPage from "@/app/components/items/ItemPage";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ itemId: string }>;
}) {
  const { itemId } = await params;
  return (
    <div className="flex justify-center">
      <div className="w-full my-4 lg:w-2/3 h-full flex flex-col items-center jutify-center">
        <ItemPage itemId={Number(itemId)} />
      </div>
    </div>
  );
}
