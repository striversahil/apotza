import _ from "lodash";
import React, { useCallback, useEffect, useRef } from "react";
import { useComponent } from "../../../../../../contexts/component";

const useDebouncedUpdate = (
  route: Array<string>,
  value: any,
  debounce: number = 1000
) => {
  const { UpdatedComponent = {}, setUpdatedComponent } = useComponent() || {};

  useEffect(() => {
    const timer = setTimeout(() => {
      const newValue = _.set(
        _.cloneDeep(UpdatedComponent),
        route.join("."),
        value
      );
      if (typeof setUpdatedComponent === "function") {
        setUpdatedComponent(newValue);
        console.log(route.join("."), value, newValue);
        // console.log(UpdatedComponent);
      }
    }, debounce);
    return () => clearTimeout(timer);
  }, [value]);
};

export default useDebouncedUpdate;
