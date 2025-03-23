import * as Checkbox from "./Checkbox";
import * as Text from "./Text";

interface MatchComponent {
  Component: React.FC;
  Default: any;
}

interface MatchComponentProps {
  [key: string]: MatchComponent;
}

export const MatchComponent: MatchComponentProps = {
  text: {
    Component: Text.Component,
    Default: Text.Default,
  },
  checkbox: {
    Component: Checkbox.Component,
    Default: Checkbox.Default,
  },
};
