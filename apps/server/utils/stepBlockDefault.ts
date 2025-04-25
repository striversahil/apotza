import stepblock from "../common/defaultStepblock.json";
const stepBlockDefault = (type: string) => {
  switch (type) {
    case "python":
      return stepblock.python;
    case "javascript":
      return stepblock.javascript;
    case "graphql":
      return stepblock.graphql;
    case "postgres":
      return stepblock.postgres;
    //   case "mysql":
    //     return stepblock.mysql
    default:
      return null;
  }
};

export default stepBlockDefault;
