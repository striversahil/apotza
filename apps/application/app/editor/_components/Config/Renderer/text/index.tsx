import React, { useCallback, useRef } from "react";
import { Input } from "@repo/ui/input";
import _ from "lodash";
import useDebouncedUpdate from "../utils/debouce";
import { Textarea } from "@repo/ui/textarea";
import Text from "../../base/text";

type Props = {
  location: Array<string>;
  initialvalue: string;
};

// I will get Full Config of the Component Here

export const TextInput: React.FC<Props> = ({
  location,
  initialvalue,
}: Props) => {
  const [value, setValue] = React.useState<string>(initialvalue);

  useDebouncedUpdate(location, value);
  const ref = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="float-end flex">
      <Text value={value} onChange={handleChange} />
    </div>
  );
};

export default TextInput;
