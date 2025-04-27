import { useCurrentTab } from "../../app/editor/_hooks/useCurrentTab";
import { useMutationData } from "@/hooks/useMutation";
import { toast } from "sonner";
import api from "..";

const source = "/stepblock";

// const currentTab = localStorage.getItem("currentTab") as string;

const StepsBlockAction = {
  add: (currentTab: string) => {
    const { mutate } = useMutationData(
      ["CodeBlockAction.addstep"],
      async (payload: any) => {
        const response = await api.post(`${source}/`, payload);
        return response.data;
      },
      [
        [`ProjectAction.getAllSteps-${currentTab}` as string],
        [`ProjectAction.getOneCodeBlock-${currentTab}` as string],
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

  codeRunner: (step_id: string) => {
    const { mutate } = useMutationData(
      ["CodeBlockAction.codeRunner"],
      async (payload: any) => {
        const response = await api.post(`${source}/run`, payload);
        return response.data;
      },
      [[`ProjectAction.getOneStep-${step_id}` as string]],
      undefined
    );
    return { mutate };
  },

  update: (codeBlock_id: string) => {
    const { mutate } = useMutationData(
      ["CodeBlockAction.updateStep"],
      async (payload: any) => {
        const response = await api.patch(`${source}/${payload.id}`, payload);
        return response.data;
      },
      [[`ProjectAction.getOneCodeBlock-${codeBlock_id}` as string]],
      (previousData: any, variables: any) => {
        return {
          ...previousData,
          payload: {
            ...previousData.payload,
            steps: [...previousData.payload.steps].map((item: any) => {
              if (item.id === variables.id) {
                return {
                  ...item,
                  ...variables,
                };
              }
              return item;
            }),
          },
        };
      },
      () => {}
    );
    return { mutate };
  },

  duplicate: (currentTab: string) => {
    const { mutate } = useMutationData(
      ["CodeBlockAction.duplicateStep"],
      async (payload: any) => {
        const response = await api.post(`${source}/duplicate`, payload);
        return response.data;
      },
      [[`ProjectAction.getAllSteps-${currentTab}` as string]],
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
      [[`ProjectAction.getOneCodeBlock-${currentTab}` as string]],
      () => {},
      () => {}
    );
    return { mutate };
  },
};

export default StepsBlockAction;
