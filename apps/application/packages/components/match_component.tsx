import Checkbox from "./Checkbox";
import TextComponent from "./Text";

interface MatchComponent {
  [key: string]: React.JSX.Element;
}

export const MatchComponent: MatchComponent = {
  text: <TextComponent />,
  checkbox: <Checkbox />,
};
