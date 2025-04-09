import { Boolean, TextInput, Tab, Color, Icon } from "../Renderer/index";

interface MapComp {
  location: Array<string>;
  initialvalue: any;
}

export const MapComp = ({ ...values }: MapComp) => {
  return {
    text: <TextInput {...values} />,
    px: <TextInput pixel {...values} />,
    textColorSize: <TextInput color size {...values} />,
    textColor: <TextInput color {...values} />,
    textSize: <TextInput size {...values} />,
    boolean: <Boolean {...values} />,
    tabLayout: <Tab layout {...values} />,
    tabHorizontalAlign: <Tab horizontal {...values} />,
    tabVerticalAlign: <Tab vertical {...values} />,
    icon: <Icon {...values} />,
    color: <Color {...values} />,
  };
};

// export const Mapper = (value: any) => {
//   const Comp = MapComp(value);

//   return <div><Comp /></div>
// }
