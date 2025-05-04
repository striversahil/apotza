import { ComponentInterface } from "../../contexts/component";
import * as Checkbox from "./Checkbox";
import * as Text from "./Text";

interface MatchComponent {
  Component: React.FC<ComponentInterface>;
  Default: any;
}

interface MatchComponentProps {
  [key: string]: MatchComponent;
}

export const MatchComponent: MatchComponentProps = {
  text: {
    Component: ({ ...props }) => <Text.Component {...props} />,
    Default: Text.Default,
  },
  checkbox: {
    Component: ({ ...props }) => <Checkbox.Component {...props} />,
    Default: Checkbox.Default,
  },
};
