import React from "react";

type Props = {
  config: any;
};

const LanguageConfig = (props: Props) => {
  return <div>LanguageConfig{props.config.code}</div>;
};

export default LanguageConfig;
