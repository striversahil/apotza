import TextInput from "./Renderer/textInput";

export const MapComp = (value: any) => {
  return {
    text: <TextInput {...value} />,
    textColorSize: "textColorSize",
    textSize: "textSize",
    list: "list",
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
