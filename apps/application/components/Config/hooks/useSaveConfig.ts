import { useClickOutside } from "@/hooks/useClickOutside";
import {
  useComponent,
  usePrevComponent,
  useUpdatedComponent,
} from "../../../contexts/component";
import ComponentAction from "@/actions/project/component";
import { useCallback, useEffect } from "react";
import _ from "lodash";
import SectionAction from "@/actions/project/section";
import PageAction from "@/actions/project/page";

type Props = {};

export const useSaveConfig = () => {
  // All State's of Component for Conditional Save
  const { Component = {} } = useComponent() || ({} as any);
  const { UpdatedComponent } = useUpdatedComponent() || {};
  const { prevComponent = {}, setPrevComponent = () => {} } =
    usePrevComponent() || ({} as any);

  // Only we wan't specific types to go to server for Change not whole Component state
  const configTypes = ["id", "configuration", "eventHandler"];

  const { mutate: prevMutateComponent } =
    ComponentAction.update(prevComponent?.section) || {};
  const { mutate: mutateComponent } =
    ComponentAction.update(Component?.section) || {};

  const { mutate: prevMutateSection } = SectionAction.update() || {};

  const { mutate: mutateSection } = SectionAction.update() || {};

  const { mutate: prevMutatePage } = PageAction.update() || {};

  const { mutate: mutatePage } = PageAction.update() || {};

  // Used Callback to have Control over function execution
  const savePrevConfig = useCallback(() => {
    if (prevComponent) {
      // Todo : Send Updated Config on Component Change
      // prevMutate(_.pick(prevComponent, configTypes));
    }
  }, [prevComponent]);

  // Used Callback to have Control over function execution
  const saveConfig = useCallback(() => {
    if (!_.isEqual(UpdatedComponent, Component)) {
      switch (Component?.type) {
        case "section":
          mutateSection(_.pick(UpdatedComponent, configTypes));
        case "page":
          mutatePage(_.pick(UpdatedComponent, configTypes));
        case "component":
          mutateComponent(_.pick(UpdatedComponent, configTypes));
        default:
          break;
      }
      setPrevComponent(null);
      return;
    }
    //     console.log("save config");
  }, [UpdatedComponent]);

  // Only Rerenders when Updated Component is Changed
  useEffect(() => {
    const timer = setTimeout(() => {
      saveConfig();
    }, 800); // Used debounce in saving config by the user Updating Config
    return () => clearTimeout(timer);
  }, [UpdatedComponent]);

  // Only Rerenders when User toggled to another Component then immediate save Previous Config State
  useEffect(() => {
    savePrevConfig();
  }, [prevComponent]);
};
