import { StepBlockInterface } from "..";
import IDEeditor from "../IDEditor";
import LanguageConfig from "../Language";
import PostgresConfig from "../postgres";
import RestConfig from "../Rest";

export const ApiTypeMapper = (type: string) => {
  switch (type) {
    case "python":
      return <LanguageConfig />;
    case "javascript":
      return <LanguageConfig />;
    case "graphql":
    // return <IDEeditor />;
    case "postgres":
      return <PostgresConfig />;
    case "rest":
      return <RestConfig />;
    default:
      return null;
  }
};
