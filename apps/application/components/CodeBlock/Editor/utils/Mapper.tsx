import { StepBlockInterface } from "..";
import IDEeditor from "../IDEditor";
import LanguageConfig from "../Language";
import PostgresConfig from "../postgres";
import RestConfig from "../Rest";

export const ApiTypeMapper = () => {
  return {
    python: <LanguageConfig />,
    javascript: <LanguageConfig />,
    graphql: <LanguageConfig />,
    postgres: <PostgresConfig />,
    rest: <RestConfig />,
    default: <LanguageConfig />,
  };
};
