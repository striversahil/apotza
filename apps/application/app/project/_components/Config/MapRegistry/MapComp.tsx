import TextColorSize from "./Renderer/textColorSize";
import TextInput from "./Renderer/textInput";
import TextSize from "./Renderer/textSize";

interface MapComp {
  location: Array<string>;
  initialvalue: any;
}

export const MapComp = {
  text: ({ location, initialvalue }: MapComp) => (
    <TextInput location={location} initialvalue={initialvalue} />
  ),
  textColorSize: ({ location, initialvalue }: MapComp) => (
    <TextColorSize location={location} initialvalue={initialvalue} />
  ),
  textSize: ({ location, initialvalue }: MapComp) => (
    <TextSize location={location} initialvalue={initialvalue} />
  ),
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

// export const Mapper = (value: any) => {
//   const Comp = MapComp(value);

//   return <div><Comp /></div>
// }
