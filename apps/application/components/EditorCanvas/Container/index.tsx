import React from "react";
import { containerCommon as Default } from "@repo/common";

type Props = {
  appearance?: typeof Default.appearance;
  layout?: typeof Default.layout;
};

const Container = (props: Props) => {
  return <div>index</div>;
};

export default Container;
