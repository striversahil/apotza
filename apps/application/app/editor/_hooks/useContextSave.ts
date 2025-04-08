import React, { useEffect } from "react";
import {
  useComponent,
  usePrevComponent,
  useUpdatedComponent,
} from "../../../contexts/component";
import _ from "lodash";

/**
 * A custom hook that manages the state of a component in a context-aware manner.
 * It provides functionality to synchronize the state with context values and update the context
 * when necessary. This hook is particularly useful for managing component states in a shared context.
 *
 * @param initialValue - The initial value of the component state.
 * @returns An object containing:
 * - `currentValue`: The current state value of the component.
 * - `setState`: A function to update the context and component state when triggered.
 *
 * @remarks
 * - The hook uses multiple context hooks (`useComponent`, `useUpdatedComponent`, `usePrevComponent`)
 *   to manage and synchronize the component state.
 * - The `useEffect` hook ensures that the `currentValue` is updated whenever the `component` or
 *   `initialValue` changes.
 * - The `setState` function handles state updates and ensures that the previous component state
 *   is stored if the current state differs from the real component state.
 *
 * @example
 * ```tsx
 * const { currentValue, setState } = useContextSave(initialComponent);
 *
 * return (
 *   <button onClick={setState}>
 *     Save Component
 *   </button>
 * );
 * ```
 */
export const useContextSave = (initialValue: any) => {
  const [currentValue, setCurrentValue] = React.useState(initialValue);

  const { setComponent = () => {}, Component: realComponent } =
    useComponent() || {};

  const { UpdatedComponent: component, setUpdatedComponent = () => {} } =
    useUpdatedComponent() || {};
  // Setting the Component State from the Context

  const { setPrevComponent = () => {} } = usePrevComponent() || {};

  // useEffect hook to update the currentValue state whenever the component or initialValue changes
  useEffect(() => {
    if (component?.id === initialValue?.id) {
      setCurrentValue(component);
    } else if (component?.id !== initialValue?.id) {
      setCurrentValue(initialValue);
    }
  }, [component, initialValue]);

  const setState = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (JSON.stringify(component) !== JSON.stringify(initialValue)) {
      console.log("Component Clicked");
      if (!_.isEqual(component, realComponent)) {
        setPrevComponent(component);
      }
      setComponent(initialValue);
      setUpdatedComponent(initialValue);
    }
  };

  return {
    currentValue,
    component,
    setState,
  };
};
