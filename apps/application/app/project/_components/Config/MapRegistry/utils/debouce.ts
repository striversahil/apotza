import _ from "lodash";
import React, { useCallback, useRef } from "react";
import updateValue from "./updateValue";

const useDebouncedUpdate = (
  route: Array<string>,
  value: any,
  debounce: number = 500
) => {
  const debouncedUpdate = useRef(
    _.debounce((r: Array<string>, v: any) => updateValue(r, v), debounce)
  ).current;

  const update = useCallback(() => {
    debouncedUpdate(route, value);
  }, [route, value]);

  return update;
};

export default useDebouncedUpdate;
