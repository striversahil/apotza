import * as Checkbox from "./src/Checkbox";
import * as Text from "./src/Text";

type Props = {
  content?: any;
  appearance?: any;
  layout?: any;
  interaction?: any;
};

interface MatchComponent {
  Component: React.FC<Props>;
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
