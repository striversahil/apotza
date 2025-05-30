import { useCurrentTab } from "../../contexts/codeblock";
import { useMutationData } from "@/hooks/useMutation";
import { toast } from "sonner";
import api from "..";

const source = "/stepblock";

// const currentTab = localStorage.getItem("currentTab") as string;

const StepsBlockAction = {
  add: (currentTab: string) => {
    const { mutate } = useMutationData(
      ["StepsBlockAction.addstep"],
      async (payload: any) => {
        const response = await api.post(`${source}/`, payload);
        return response.data;
      },
      [
        [`GetProject.getOneCodeBlock-${currentTab}` as string],
        [`GetProject.getContextCodeBlock-${currentTab}` as string],
      ],
      () => {},
      () => {}
      // (previousData: any, variables: any) => {
      //   return {
      //     ...previousData,
      //     payload: [...previousData.payload].map((item: any) => {
      //       if (item._id === variables._id) {
      //         return {
      //           ...item,
      //           steps: [
      //             ...item.steps,
      //             { name: "Loading... " + item.steps.length + 1 },
      //           ],
      //         };
      //       }
      //       return item;
      //     }),
      //   };
      // }
    );
    return { mutate };
  },

  codeRunner: (id: string, codeBlockId: string) => {
    return useMutationData(
      ["StepsBlockAction.codeRunner"],
      async (payload: any) => {
        const response = await api.post(`${source}/run`, payload);
        return response.data;
      },
      [
        [`GetProject.getOneStep-${id}` as string],
        [`GetProject.getContextCodeBlock-${codeBlockId}` as string],
      ],
      () => {},
      () => {}
    );
  },

  update: (id: string) => {
    const { mutate } = useMutationData(
      ["StepsBlockAction.update"],
      async (payload: any) => {
        const response = await api.patch(`${source}/${id}`, payload);
        return response.data;
      },
      [[`GetProject.getOneStep-${id}` as string]],
      (previousData: any, variables: any) => {
        return {
          ...previousData,
          payload: {
            ...previousData.payload,
            config: variables.config ?? previousData.payload.config,
          },
        };
      },
      () => {}
    );
    return { mutate };
  },

  // update: (id: string) => {
  //   const { mutate } = useMutationData(
  //     ["StepsBlockAction.update"],
  //     async (payload: any) => {
  //       const response = await api.patch(`${source}/${id}`, payload);
  //       return response.data;
  //     },
  //     [[`GetProject.getOneStep-${id}` as string]],
  //   );
  //   return { mutate };
  // },

  duplicate: (currentTab: string) => {
    const { mutate } = useMutationData(
      ["StepsBlockAction.duplicateStep"],
      async (payload: any) => {
        const response = await api.post(`${source}/duplicate`, payload);
        return response.data;
      },
      [[`GetProject.getAllSteps-${currentTab}` as string]],
      undefined,
      // (previousData: any, variables: any) => {
      //   return {
      //     ...previousData,
      //     payload: {
      //       ...previousData.payload,
      //       steps: [
      //         ...previousData.payload.steps.slice(0, variables.step + 1),
      //         { name: "Loading... " },
      //         ...previousData.payload.steps.slice(variables.step + 1),
      //       ],
      //     },
      //   };
      // },
      () => toast("Success", { description: "Successfully duplicated step" })
    );
    return { mutate };
  },

  delete: (currentTab: string) => {
    const { mutate } = useMutationData(
      ["StepsBlockAction.deleStep"],
      async (payload: any) => {
        const response = await api.delete(`${source}/${payload.id}`);
        return response.data;
      },
      [
        [`GetProject.getOneCodeBlock-${currentTab}` as string],
        [`GetProject.getContextCodeBlock-${currentTab}` as string],
      ],
      () => {},
      () => {}
    );
    return { mutate };
  },
};

export default StepsBlockAction;
