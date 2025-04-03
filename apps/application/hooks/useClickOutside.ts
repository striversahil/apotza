import { useEffect, useRef } from "react";

type UseClickOutside = {
  ref: React.RefObject<HTMLDivElement>;
  handler: () => void;
};

export const useClickOutside = ({ ref, handler }: UseClickOutside) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref]);
};
