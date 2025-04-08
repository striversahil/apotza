import _ from "lodash";
import React, { useCallback, useEffect, useRef } from "react";
import {
  useComponent,
  useUpdatedComponent,
} from "../../../../contexts/component";

const useDebouncedUpdate = (
  route: Array<string>,
  value: any,
  debounce: number = 100
) => {
  const { UpdatedComponent, setUpdatedComponent = () => {} } =
    useUpdatedComponent() || {};

  useEffect(() => {
    const timer = setTimeout(() => {
      const newValue = _.set(
        _.cloneDeep(UpdatedComponent),
        route.join("."),
        value
      );
      setUpdatedComponent(newValue);
      // if (initialValue !== value) {
      //   // console.log(route.join("."), value, newValue);
      // }
    }, debounce);
    return () => clearTimeout(timer);
  }, [value]);
};

export default useDebouncedUpdate;
