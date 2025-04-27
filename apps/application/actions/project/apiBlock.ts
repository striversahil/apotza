import { useCurrentTab } from "../../app/editor/_hooks/useCurrentTab";
import { useMutationData } from "@/hooks/useMutation";

import api from "..";
const source = "/codeblock";

const TabBlockAction = {
  add: () => {
    const { mutate, data, isPending } = useMutationData(
      ["CodeBlockAction.add"],
      async (payload: any) => {
        const response = await api.post(`${source}/`, payload);
        return response;
      },
      [["ProjectAction.getProject"]],
      () => {},
      () => {}
      // (previousData: any, variables: any) => {
      //   return {
      //     ...previousData,
      //     payload: [...previousData.payload, variables.payload],
      //   };
      // }
    );

    return { mutate, data, isPending };
  },

  delete: () => {
    const { mutate, isPending } = useMutationData(
      ["CodeBlockAction.delete"],
      async (payload: any) => {
        const response = await api.delete(`${source}/${payload.metadata.id}`);
        return response.data;
      },
      [["ProjectAction.getProject"]],
      () => {},
      () => {}
      // (previousData: any, variables: any) => {
      //   return {
      //     ...previousData,
      //     payload: [...previousData.payload].filter(
      //       (item: any) => item._id !== variables.id
      //     ),
      //   };
      // }
    );

    return { mutate, isPending };
  },

  update: () => {
    const { currentTab } = useCurrentTab();
    const { mutate } = useMutationData(
      ["CodeBlockAction.nameChange"],
      async (payload: any) => {
        const response = await api.patch(`${source}/${payload.id}`, payload);
        return response;
      },
      [
        [`ProjectAction.getOneCodeBlock-${currentTab}` as string],
        ["ProjectAction.getProject"],
      ],
      () => {},
      () => {}
    );
    return { mutate };
  },
};

export default TabBlockAction;
