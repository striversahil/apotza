import React from "react";

interface Arraytype {
  title: string;
  desc: string;
}

type Props = {
  selection: Array<Arraytype>;
};

const SelectorW_H = (props: Props) => {
  return <div>SelectorW_H</div>;
};

export default SelectorW_H;
