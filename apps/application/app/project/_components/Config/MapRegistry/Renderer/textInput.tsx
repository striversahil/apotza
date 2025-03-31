import React, { useCallback } from "react";
import { Input } from "../../../../../../components/ui/input";
import _ from "lodash";
import useDebouncedUpdate from "../utils/debouce";

type Props = {
  location: Array<string>;
  initialvalue: string;
};

// I will get Full Config of the Component Here

const TextInput: React.FC<Props> = ({ location, initialvalue }: Props) => {
  const [value, setValue] = React.useState<string>(initialvalue);

  useDebouncedUpdate(location, value, initialvalue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex justify-between items-center gap-2">
      <div className="font-bold text-sm">{location[location.length - 1]}:</div>
      <Input
        defaultValue={initialvalue}
        value={value}
        onChange={handleChange}
        className=""
      />
    </div>
  );
};

export default TextInput;
