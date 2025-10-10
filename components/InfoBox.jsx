import Link from "next/link";

function InfoBox({
  heading,
  children,
  btnInfo,
  bgColor = "bg-gray-100",
  txtColor = "text-gray-800",
}) {
  return (
    <div className={`rounded-lg ${bgColor} p-6 shadow-md`}>
      <h2 className={`${txtColor} text-2xl font-bold`}>{heading}</h2>
      <p className={`${txtColor}mt-2 mb-4`}>{children}</p>
      <Link
        href={btnInfo.link}
        className={`inline-block rounded-lg ${btnInfo.bgColor} px-4 py-2 text-white hover:bg-gray-700`}
      >
        {btnInfo.text}
      </Link>
    </div>
  );
}

export default InfoBox;
