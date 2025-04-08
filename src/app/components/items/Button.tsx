import Image from "next/image";
import React from "react";

function Button({title}: {title: string}) {
  return (
    <Image src={title} alt="button" width={160} height={100} />
  );
}

export default Button;
