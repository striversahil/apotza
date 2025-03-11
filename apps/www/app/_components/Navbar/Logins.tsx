import Link from "next/link";
import React from "react";

type Props = {};

const Logins = (props: Props) => {
  return (
    <div className="hidden scale-90 lg:scale-100 md:flex items-center  rounded-lg">
      <div className="flex items-center h-4/5 space-x-2 rounded-lg p-1 cursor-pointer">
        <Link
          href={"/login"}
          className="text-lg font-bold whitespace-nowrap  hover:bg-slate-500/30 px-4 size-full rounded-md shadow-inner text-white "
        >
          Login
        </Link>
        <Link
          href={"/signup"}
          className="relative size-full whitespace-nowrap bg-gradient-to-tr from-blue-500 to-purple-500 via-violet-800 hover:bg-blue-500 rounded-md font-semibold text-lg px-4 shadow-inner shadow-white/50"
        >
          {/* <div className="absolute shadow-2xl animate-pulse inset-1 pointer-events-none rounded-md bg-green-500"></div> */}
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Logins;
