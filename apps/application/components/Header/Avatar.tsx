import Image from "next/image";
import React from "react";

type Props = {};

const Avatar_Header = (props: Props) => {
  return (
    <div className="flex w-10 h-10 border-2 rounded-full cursor-pointer border-orange-500 overflow-clip">
      <Image
        src="/avatar.png"
        width={40}
        height={40}
        className=""
        alt="Image"
      />
    </div>
  );
};

export default Avatar_Header;
