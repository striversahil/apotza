import { useComponent } from "../../../../../../contexts/component";
import _ from "lodash";

/**
 * Updates the value of a nested object
 *
 * @param Route - Array of keys to navigate to
 * @param value - Value to update
 * @returns
 */

const updateValue = (Route: Array<string>, value: any) => {
  const { UpdatedComponent = {}, setUpdatedComponent } = useComponent() || {};

  const newValue = _.set(_.cloneDeep(UpdatedComponent), Route.join("."), value);
  if (typeof setUpdatedComponent === "function") setUpdatedComponent(newValue);
};

export default updateValue;
//   const NestedForLoop = (
//     location: Array<string>,
//     value: any,
//     nestedComponent: any
//   ) => {
//     for (const key of location) {
//       if (typeof nestedComponent[key] === "object") {
//         NestedForLoop(
//           location.filter((loc) => loc != key),
//           value,
//           nestedComponent[key]
//         );
//       } else {
//         return {
//           ...nestedComponent,
//           [key]: value,
//         };
//       }
//       return nestedComponent;
//     }
//   };

//   const newValue = NestedForLoop(Route, value, UpdatedComponent);

//   setUpdatedComponent(newValue);
// };
