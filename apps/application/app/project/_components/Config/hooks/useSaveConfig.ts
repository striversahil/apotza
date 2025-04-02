import { useClickOutside } from "@/hooks/useClickOutside";
import {
  useComponent,
  usePrevComponent,
  useUpdatedComponent,
} from "../../../../../contexts/component";
import ComponentAction from "@/actions/project/component";
import { use, useCallback, useEffect } from "react";
import _ from "lodash";

type Props = {};

export const useSaveConfig = () => {
  const { Component } = useComponent() || {};
  const { UpdatedComponent } = useUpdatedComponent() || {};
  const { prevComponent = {}, setPrevComponent = () => {} } =
    usePrevComponent() || {};

  const configTypes = [
    "id",
    "appearance",
    "content",
    "layout",
    "interaction",
    "eventHandler",
  ];

  const { mutate } =
    ComponentAction.update(prevComponent?.section || Component?.section) || {};

  const saveConfig = useCallback(() => {
    if (prevComponent) {
      mutate(_.pick(prevComponent, configTypes));
      setPrevComponent(null);
      return;
    }
    if (!_.isEqual(UpdatedComponent, Component)) {
      mutate(_.pick(UpdatedComponent, configTypes));
    }
    //     console.log("save config");
  }, [UpdatedComponent]);

  useEffect(() => {
    const timer = setTimeout(() => {
      saveConfig();
    }, 3500);
    return () => clearTimeout(timer);
  }, [UpdatedComponent]);

  useEffect(() => {
    saveConfig();
  }, [prevComponent]);
};
