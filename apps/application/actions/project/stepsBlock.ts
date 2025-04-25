import { useCurrentTab } from "../../app/editor/_hooks/useCurrentTab";
import { useMutationData } from "@/hooks/useMutation";
import axios from "axios";
import { toast } from "sonner";

axios.defaults.withCredentials = true; // Global axios config to enable cookies
const source = (process.env.NEXT_PUBLIC_BASE_URL as string) + "/stepblock";

// const currentTab = localStorage.getItem("currentTab") as string;

const StepsBlockAction = {
  useadd: (currentTab: string) => {
    const { mutate } = useMutationData(
      ["CodeBlockAction.addstep"],
      async (payload: any) => {
        const response = await axios.post(`${source}/`, payload);
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

  useCodeRunner: (step_id: string) => {
    const { mutate } = useMutationData(
      ["CodeBlockAction.codeRunner"],
      async (payload: any) => {
        const response = await axios.post(`${source}/run`, payload);
        return response.data;
      },
      [[`ProjectAction.getOneStep-${step_id}` as string]],
      undefined
    );
    return { mutate };
  },

  useUpdate: (codeBlock_id: string) => {
    const { mutate } = useMutationData(
      ["CodeBlockAction.updateStep"],
      async (payload: any) => {
        const response = await axios.patch(`${source}/update`, payload);
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

  useduplicate: (currentTab: string) => {
    const { mutate } = useMutationData(
      ["CodeBlockAction.duplicateStep"],
      async (payload: any) => {
        const response = await axios.post(`${source}/duplicate`, payload);
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

  usedelete: (currentTab: string) => {
    const { mutate } = useMutationData(
      ["CodeBlockAction.deleteStep"],
      async (payload: any) => {
        const response = await axios.delete(`${source}/${payload.id}`);
        return response.data;
      },
      [[`ProjectAction.getAllSteps-${currentTab}` as string]],
      (previousData: any, variables: any) => {
        return {
          ...previousData,
          payload: {
            ...previousData.payload,
            steps: [...previousData.payload.steps].filter(
              (item) => item.id != variables.id
            ),
          },
        };
      },
      () => toast("Success", { description: "Successfully deleted step" })
    );
    return { mutate };
  },
};

export default StepsBlockAction;
