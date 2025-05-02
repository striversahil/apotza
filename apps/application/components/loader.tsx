import { LucideLoader } from "lucide-react";
import React from "react";

type Props = {};

const CustomSimpleLoader = (props: Props) => {
  return (
    <div className="flex-1 flex items-center justify-center h-full ">
      <h1 className="text-white font-bold capitalize text-center space-y-2">
        <span className="text-2xl font-bold">
          <div className="ml-5 mr-10 animate-pulse">Loading.... </div>
          <div className="flex items-center gap-2">
            <div className="animate-pulse text-blue-500 ">
              Juicy Data for Yaa....
            </div>{" "}
            <div className="animate">📊</div>
          </div>
        </span>{" "}
        <br />
      </h1>
    </div>
  );
};

const SimpleLoader = ({ size = 20 }: { size?: number }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <LucideLoader size={size} className=" animate-spin" />
    </div>
  );
};

export { CustomSimpleLoader, SimpleLoader };
