import { useClickOutside } from "@mantine/hooks";
import React from "react";

type Props = {
  children: React.ReactNode;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

const PopOver = ({ setOpened, ...props }: Props) => {
  const ref = useClickOutside(() => setOpened(false));
  return (
    <div className="fixed w-[300px]  h-[300px] z-50" ref={ref}>
      {props.children}
    </div>
  );
};

export default PopOver;
