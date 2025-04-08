"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Header() {
  const [imageSrc, setImageSrc] = useState("/Size=Large.png");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setImageSrc("/Size=Small.png");
      } else {
        setImageSrc("/Size=Large.png");
      }
    };

    // 초기 로딩 시 실행
    handleResize();

    // 리사이즈 이벤트 등록
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 이벤트 제거
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="h-[80px] flex items-center border-b-1 border-slate-400">
      <div className="relative w-[100px] h-[50px] lg:h-[80px] mx-12 lg:mx-96">
        <Link href={"/"}>
          <Image src={imageSrc} alt="logo" fill className="object-contain" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
