"use client";
import ClipLoader from "react-spinners/ClipLoader";
import FadeLoader from "react-spinners/FadeLoader";
const cssStyle = {
  display: "block",
  margin: "100px auto",
};
function Loading() {
  return (
    <FadeLoader color="#0e3f1f" cssOverride={cssStyle} size={40} width={1.5} />
    // <ClipLoader
    //   color="#3b82f6"
    //   cssOverride={cssStyle}
    //   size={150}
    //   aria-label="Loading Spinner"
    // />
  );
}

export default Loading;
