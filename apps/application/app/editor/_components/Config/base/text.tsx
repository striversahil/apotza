import { Textarea } from "@repo/ui/textarea";
import React from "react";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const Text = ({ value, onChange }: Props) => {
  return (
    <div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e)}
        className=""
        typeof="text"
      />
    </div>
  );
};

export default Text;
