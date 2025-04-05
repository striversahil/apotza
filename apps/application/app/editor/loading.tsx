import { Loader } from "lucide-react";
import React from "react";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="w-full h-screen bg-white flex justify-center items-center">
      <Loader className="animate-spin" />
    </div>
  );
};

export default Loading;
