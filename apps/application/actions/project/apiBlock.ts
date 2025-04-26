import { useCurrentTab } from "../../app/editor/_hooks/useCurrentTab";
import { useMutationData } from "@/hooks/useMutation";
import axios from "axios";

axios.defaults.withCredentials = true; // Global axios config to enable cookies
const source = (process.env.NEXT_PUBLIC_BASE_URL as string) + "/codeblock";

const TabBlockAction = {
  add: () => {
    const { mutate, data, isPending } = useMutationData(
      ["CodeBlockAction.add"],
      async (payload: any) => {
        const response = await axios.post(`${source}/`, payload);
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
        const response = await axios.delete(`${source}/${payload.metadata.id}`);
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
        const response = await axios.patch(`${source}/${payload.id}`, payload);
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
