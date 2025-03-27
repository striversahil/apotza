import React from "react";
import { Input } from "../../../../../../components/ui/input";

type Props = {
  location: Array<string>;
  value: string;
};

// I will get Full Config of the Component Here

const TextInput = ({ location, value }: Props) => {
  return (
    <Input
      defaultValue={value}
      value={value}
      onChange={(e) => console.log(e.target.value)}
    />
  );
};

export default TextInput;
