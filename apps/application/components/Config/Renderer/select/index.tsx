import React from "react";
import Select_Base from "../../base/select";
import useDebouncedUpdate from "../utils/debouce";

type Props = {
  location: Array<string>;
  initialvalue: string;
  width: boolean;
};

export const widthSelectProp = ["pixel", "Fluid", "Fit Content ", "Fit Parent"];

export const Select = ({ location, initialvalue, width }: Props) => {
  const [value, setValue] = React.useState<string>(initialvalue);

  useDebouncedUpdate(location, value);

  return (
    <div className="float-end">
      {width && (
        <Select_Base list={widthSelectProp} value={value} onChange={setValue} />
      )}
    </div>
  );
};
