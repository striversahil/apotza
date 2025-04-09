import React, { useCallback, useEffect } from "react";

export const useWidthDrag = (ref: React.RefObject<HTMLDivElement>) => {
  let wid = null;
  let hgt = null;
  if (ref.current) {
    const { width, height }: any = ref.current.getBoundingClientRect();
    wid = width;
    hgt = height;
  }
  useEffect(() => {
    console.log(wid, hgt);
  }, [wid, hgt]);

  return {};
};
