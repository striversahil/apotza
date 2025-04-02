import {
  Boolean,
  TextColorSize,
  TextSize,
  TextInput,
  Layout,
  Pixel,
  Color,
  Icon,
} from "../Renderer/index";

interface MapComp {
  location: Array<string>;
  initialvalue: any;
}

export const MapComp = ({ ...values }: MapComp) => {
  return {
    text: <TextInput {...values} />,
    textColorSize: <TextColorSize {...values} />,
    textSize: <TextSize {...values} />,
    boolean: <Boolean {...values} />,
    layout: <Layout {...values} />,
    // list: () => "list",
    icon: <Icon {...values} />,
    color: <Color {...values} />,
    // width: "width",
    // height: "height",
    // horizontalAlign: "horizontalAlign",
    // verticalAlign: "verticalAlign",
    px: <Pixel {...values} />,
  };
};

// export const Mapper = (value: any) => {
//   const Comp = MapComp(value);

//   return <div><Comp /></div>
// }
