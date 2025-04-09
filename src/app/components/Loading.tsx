import React from "react";
import { ClipLoader } from "react-spinners";

function Loading() {
  return (
    <ClipLoader
      color={"#7C3AED"}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}

export default Loading;
