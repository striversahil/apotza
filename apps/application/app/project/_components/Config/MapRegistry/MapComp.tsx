import TextColorSize from "./Renderer/textColorSize";
import TextInput from "./Renderer/textInput";
import TextSize from "./Renderer/textSize";

export const MapComp = (value: any) => {
  return {
    text: () => <TextInput {...value} />,
    textColorSize: () => <TextColorSize {...value} />,
    textSize: () => <TextSize {...value} />,
    list: () => "list",
    boolean: "boolean",
    icon: "icon",
    color: "color",
    width: "width",
    height: "height",
    horizontalAlign: "horizontalAlign",
    verticalAlign: "verticalAlign",
    px: "px",
  };
};
