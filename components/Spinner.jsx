"use client";
import FadeLoader from "react-spinners/FadeLoader";

const cssStyle = {
  display: "block",
  margin: "100px auto",
};

export default function Spinner() {
  console.log("Loading page...");
  return (
    <FadeLoader
      color="#283bc7"
      cssOverride={cssStyle}
      width={1.5}
      speedMultiplier={2}
      radius={0.5}
    />
  );
}
