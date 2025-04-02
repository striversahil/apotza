import { useClickOutside } from "@mantine/hooks";
import React from "react";
import { Input } from "../../../../components/ui/input";

type Props = {
  children: React.ReactNode;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  isDragging: boolean;
};

const PopOver = ({ setOpened, ...props }: Props) => {
  const ref = useClickOutside(() => setOpened(false));

  return (
    <div
      className="fixed w-[300px]  h-[300px] z-50 "
      ref={ref}
      // onMouseLeave={() => {
      //   if (!props.isDragging) setOpened(false);
      // }}
    >
      <div className="bg-gray-800 w-full h-full rounded-md shadow-lg shadow-black/50">
        <div className="flex flex-col items-center justify-center p-2">
          <h1 className="text-white text-2xl font-bold">Components</h1>
          <span className="text-gray-400 text-xs text-center py-2">
            Drag and drop components to the canvas .
          </span>
          <Input
            className=" text-white bg-white/20 rounded-lg w-full "
            placeholder="Search ..."
          ></Input>
        </div>
        <div className=" pt-4 ">
          <div className="relative grid grid-cols-2 gap-5 mx-2">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopOver;
