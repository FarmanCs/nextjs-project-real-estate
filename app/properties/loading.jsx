"use client";
import FadeLoader from "react-spinners/FadeLoader";
const cssStyle = {
  display: "block",
  margin: "100px auto",
};
function Loading() {
  return (
    <FadeLoader color="#0e3f1f" cssOverride={cssStyle} size={40} width={1.5} />
  );
}

export default Loading;
