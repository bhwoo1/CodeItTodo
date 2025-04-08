"use client";

import { Item } from "@/app/Type";
import Image from "next/image";
import React from "react";

function ItemImage({ item, imageSrc, onImageChange }: { item: Item, imageSrc: string|null, onImageChange: (image: string) => void }) {

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
        const imageUrl = URL.createObjectURL(file);
        onImageChange(imageUrl);
    }
  };

  return (
    <div>
      <div className="w-11/12 h-[300px] mx-4 lg:mx-0 my-4 bg-slate-100 rounded-4xl border-dashed border-4 border-slate-300 lg:w-[400px] lg:h-[400px] flex justify-center items-center relative">
        {item.imageUrl || imageSrc ? (
          <>
            <Image
              src={imageSrc || item.imageUrl}
              alt="Image"
              fill
              className="object-cover rounded-4xl"
            />
            <button className="absolute bottom-4 right-4 cursor-pointer hover:scale-110 duration-100 transition">
              <label htmlFor="image">
                <Image
                  src={"/Type=Edit.png"}
                  alt="edit"
                  width={50}
                  height={50}
                />
              </label>
            </button>
          </>
        ) : (
          <>
            <Image src={"/ic/img.png"} alt="Image" width={100} height={100} />
            <button className="absolute bottom-4 right-4 cursor-pointer hover:scale-110 duration-100 transition">
              <label htmlFor="image">
                <Image
                  src={"/Type=Plus.png"}
                  alt="upload"
                  width={50}
                  height={50}
                />
              </label>
            </button>
          </>
        )}
      </div>
      <input type="file" accept="image/*" id="image" className="hidden" onChange={handleImageUpload}/>
    </div>
  );
}

export default ItemImage;
