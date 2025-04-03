import Image from "next/image";
import React from "react";

type Props = {};

const Brand_Image = (props: Props) => {
  return (
    <div className="hidden lg:flex absolute left-[180px] rounded-3xl">
      <div className="w-fit h-fit">
        <Image
          src="/brand/hero-dashboard.avif"
          alt="brand_pic"
          width={1700}
          height={800}
          className=""
        />
      </div>
      <div className="absolute  inset-0 bg-gradient-to-r from-slate-950 to-transparent  rounded-3xl"></div>
    </div>
  );
};

export default Brand_Image;
