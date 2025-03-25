import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";

type Props = {
  value: any;
};

const ConfigRoute = (props: Props) => {
  // console.log("from config route", props.value);
  // const value = JSON.stringify(props.value);
  return (
    <div className="text-sm space-y-2 ">
      ConfigRoute <br />
      {props.value.id} <br /> {props.value.id}
    </div>
  );
};

export default ConfigRoute;
