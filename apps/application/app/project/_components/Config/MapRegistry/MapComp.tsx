import TextColorSize from "./Renderer/textColorSize";
import TextInput from "./Renderer/textInput";
import TextSize from "./Renderer/textSize";

interface MapComp {
  location: Array<string>;
  initialvalue: any;
}

export const MapComp = ({ ...values }: MapComp) => {
  return {
    text: <TextInput {...values} />,
    textColorSize: <TextColorSize {...values} />,
    textSize: <TextSize {...values} />,
    // list: () => "list",
    // boolean: "boolean",
    // icon: "icon",
    // color: "color",
    // width: "width",
    // height: "height",
    // horizontalAlign: "horizontalAlign",
    // verticalAlign: "verticalAlign",
    // px: "px",
  };
};

// export const Mapper = (value: any) => {
//   const Comp = MapComp(value);

//   return <div><Comp /></div>
// }
