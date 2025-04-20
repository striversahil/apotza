import { Input } from "@repo/ui/input";
import { Textarea } from "@repo/ui/textarea";
import React from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  area?: boolean;
};

const Text_Base = ({ value, onChange, area }: Props) => {
  return (
    <div className="text-white">
      {area && (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-slate-950 outline-none"
          typeof="text"
        />
      )}
      {!area && (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-slate-950 outline-none"
          typeof="text"
        />
      )}
    </div>
  );
};

export default Text_Base;
