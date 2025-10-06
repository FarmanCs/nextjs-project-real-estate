"use client";
import ClipLoader from "react-spinners/ClipLoader";
import RingLoader from "react-spinners/RingLoader";
import MoonLoader from "react-spinners/MoonLoader";
import FadeLoader from "react-spinners/FadeLoader";
// import { FadeLoader } from "react-spinners";

const cssStyle = {
  display: "block",
  margin: "100px auto",
};

// export default function Loading() {
//   return (
//     <div className="flex h-screen items-center justify-center bg-white">
//       <RingLoader color="#3b82f6" size={110} speedMultiplier={1.2} />
//     </div>
//   );
// }
export default function Loading() {
  console.log("Loading page...");
  return (
    <FadeLoader
      color="#283bc7"
      cssOverride={cssStyle}
      width={1.5}
      speedMultiplier={2}
      radius={0.5}
    />
    // <ClipLoader
    //   color="#3b82f6"
    //   cssOverride={cssStyle}
    //   size={50}
    //   aria-label="Loading Spinner"
    // />
    // <MoonLoader
    //   color="#3b82f6"
    //   cssOverride={cssStyle}
    //   size={100}
    //   speedMultiplier={0.91}
    //   aria-label="Loading Spinner"
    // />
  );
}
