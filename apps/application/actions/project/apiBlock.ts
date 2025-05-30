import { useCurrentTab } from "../../contexts/codeblock";
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
      [["GetProject.getProject"]],
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

  run: (currentTab: string) => {
    return useMutationData(
      ["CodeBlockAction.run"],
      async (payload: any) => {
        const response = await api.post(`${source}/${currentTab}/run`, payload);
        return response;
      },
      [
        [`GetProject.getOneCodeBlock-${currentTab}` as string],
        ["GetProject.getProject"],
      ],
      () => {},
      () => {}
    );
  },

  delete: () => {
    const { mutate, isPending } = useMutationData(
      ["CodeBlockAction.delete"],
      async (payload: any) => {
        const response = await api.delete(`${source}/${payload.metadata.id}`);
        return response.data;
      },
      [["GetProject.getProject"]],
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

  update: (currentTab: string) => {
    const { mutate } = useMutationData(
      ["CodeBlockAction.nameChange"],
      async (payload: any) => {
        const response = await api.patch(`${source}/${payload.id}`, payload);
        return response;
      },
      [
        [`GetProject.getOneCodeBlock-${currentTab}` as string],
        ["GetProject.getProject"],
      ],
      () => {},
      () => {}
    );
    return { mutate };
  },
};

export default TabBlockAction;
