import React from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const Logo = (props: Props) => {
  return (
    <Link href="/" className="">
      <div className="relative flex items-center space-x-2">
        <image href="/apotzalogo.jpg" width={50} height={24} />
        <h1 className="text-2xl font-bold">Apotza</h1>
        <div className="relative -top-2  bg-blue-700 rounded-md animate-pulse">
          <span className="text-sm p-1 text-gray-400 ">Alpha</span>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
