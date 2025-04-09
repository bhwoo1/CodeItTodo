"use client";

import { Item } from "@/app/Type";
import Image from "next/image";
import React from "react";
import Swal from "sweetalert2";

function ItemImage({
  item,
  imageSrc,
  onImageChange,
}: {
  item: Item;
  imageSrc: string | null;
  onImageChange: (image: string) => void;
}) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // 파일 이름 영어만 허용
    const fileName = file.name;
    const englishNameRegex = /^[A-Za-z0-9_.-]+$/;
    if (!englishNameRegex.test(fileName)) {
      Swal.fire({
        title: "Warning!",
        text: '파일 이름은 영어, 숫자, "-", "_", "."만 사용할 수 있습니다.',
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    // 이미지 사이즈 제한
    const maxSize = 5 * 1024 * 1024;
    const fileSize = file.size;
    if (fileSize > maxSize) {
      Swal.fire({
        title: "Warning!",
        text: "5MB 이하의 이미지를 업로드해주세요!",
        icon: "warning",
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    onImageChange(imageUrl); // 업로드한 이미지 URL로 변경
  }; // 이미지 업로드

  return (
    <div className="w-11/12 h-[300px] lg:w-1/3 lg:h-[400px]">
      <div className="h-full lg:mx-0 bg-slate-100 rounded-4xl border-dashed border-4 border-slate-300  flex justify-center items-center relative">
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
      <input
        type="file"
        accept="image/*"
        id="image"
        className="hidden"
        onChange={handleImageUpload}
      />
    </div>
  );
}

export default ItemImage;
