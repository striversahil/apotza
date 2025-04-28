import IDEeditor from "./IDEditor";

export const ApiTypeMapper = ({ ...values }) => {
  return {
    python: <IDEeditor {...values} value={null} />,

    javascript: <IDEeditor {...values} value={null} />,

    graphql: <IDEeditor {...values} value={null} />,

    postgres: <IDEeditor {...values} value={null} />,
  };
};
