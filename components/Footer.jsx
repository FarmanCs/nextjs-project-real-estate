import Link from "next/link";
import logo from "@/assets/images/logo.png";
import Image from "next/image";

function Footer() {
  const currentDate = new Date().getFullYear();
  return (
    <footer className="mt-24 bg-gray-200 py-4">
      <div className="container mx-auto flex flex-col items-center justify-between px-4 md:flex-row">
        <div className="mb-4 md:mb-0">
          <Image src={logo} alt="Logo" className="h-8 w-auto" />
        </div>
        <div className="mb-4 flex flex-wrap justify-center md:mb-0 md:justify-start">
          <ul className="flex space-x-4">
            <li>
              <Link href="/properties">Properties</Link>
            </li>
            <li>
              <Link href="/terms">Terms of Service</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mt-2 text-sm text-gray-500 md:mt-0">
            &copy; {currentDate} PropertyPulse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
