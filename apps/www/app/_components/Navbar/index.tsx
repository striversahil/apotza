import React from "react";
import Logo from "./Logo";
import Navigations from "./Navigations";
import Logins from "./Logins";
type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="fixed w-full top-2 scale-90 md:scale-100 z-50 flex justify-center">
      <div className="flex justify-around space-x-5 border-[2px] w-full lg:w-4/5 xl:w-2/3 bg-gradient-to-r from-white/5 to-white/20 rounded-full px-10 py-2 text-center hover:translate-y-2 duration-500 backdrop-blur-lg">
        <Logo />
        <Navigations />
        <Logins />
      </div>
    </div>
  );
};

export default Navbar;
