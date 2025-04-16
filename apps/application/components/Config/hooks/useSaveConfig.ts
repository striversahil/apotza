import { useClickOutside } from "@/hooks/useClickOutside";
import {
  useComponent,
  usePrevComponent,
  useUpdatedComponent,
} from "../../../contexts/component";
import ComponentAction from "@/actions/project/component";
import { useCallback, useEffect } from "react";
import _ from "lodash";

type Props = {};

export const useSaveConfig = () => {
  // All State's of Component for Conditional Save
  const { Component = {} } = useComponent() || ({} as any);
  const { UpdatedComponent } = useUpdatedComponent() || {};
  const { prevComponent = {}, setPrevComponent = () => {} } =
    usePrevComponent() || ({} as any);

  // Only we wan't specific types to go to server for Change not whole Component state
  const configTypes = [
    "id",
    "appearance",
    "content",
    "layout",
    "interaction",
    "eventHandler",
  ];

  const { mutate: prevMutate } =
    ComponentAction.update(prevComponent?.section) || {};
  const { mutate } = ComponentAction.update(Component?.section) || {};

  // Used Callback to have Control over function execution
  const saveConfig = useCallback(() => {
    if (prevComponent) {
      console.log("save prev config", prevComponent);
      prevMutate(_.pick(prevComponent, configTypes));
      return;
    }
    if (!_.isEqual(UpdatedComponent, Component)) {
      mutate(_.pick(UpdatedComponent, configTypes));
      return;
    }

    //     console.log("save config");
  }, [UpdatedComponent, prevComponent]);

  // Only Rerenders when Updated Component is Changed
  useEffect(() => {
    const timer = setTimeout(() => {
      saveConfig();
    }, 3000); // 5 seconds debounce in saving config by the user Updating Config
    return () => clearTimeout(timer);
  }, [UpdatedComponent]);

  // Only Rerenders when User toggled to another Component then immediate save Previous Config State
  useEffect(() => {
    saveConfig();
  }, [prevComponent]);
};
