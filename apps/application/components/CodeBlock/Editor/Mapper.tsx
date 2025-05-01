import { StepBlockInterface } from ".";
import IDEeditor from "./IDEditor";
import LanguageConfig from "./Language";

export const ApiTypeMapper = ({ ...values }: StepBlockInterface) => {
  return {
    python: <LanguageConfig {...values} />,

    javascript: <LanguageConfig {...values} />,

    graphql: <IDEeditor {...values} value={values} />,

    postgres: <IDEeditor {...values} value={values} />,

    rest: <IDEeditor {...values} value={values} />,
  };
};
