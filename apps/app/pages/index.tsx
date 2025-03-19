import { useNavigate } from "react-router";
import React from "react";

type Props = {};

const page = (props: Props) => {
  const redirect = useNavigate();
  redirect("/dashboard");
  return <div>page</div>;
};

export default page;
