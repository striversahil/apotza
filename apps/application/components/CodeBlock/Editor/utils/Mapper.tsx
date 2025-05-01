import { StepBlockInterface } from "..";
import IDEeditor from "../IDEditor";
import LanguageConfig from "../Language";

export const ApiTypeMapper = (type: string) => {
  switch (type) {
    case "python":
      return <LanguageConfig />;
    case "javascript":
      return <LanguageConfig />;
    case "graphql":
      return <IDEeditor />;
    case "postgres":
      return <IDEeditor />;
    case "rest":
      return <IDEeditor />;
    default:
      return null;
  }
};
