import { useMutationData } from "@/hooks/useMutation";
import axios from "axios";

axios.defaults.withCredentials = true; // Global axios config to enable cookies
const source = (process.env.NEXT_PUBLIC_BASE_URL as string) + "/page";

const PageAction = {
  create: () => {
    const { mutate } = useMutationData(
      ["PageAction.add"],
      async (payload: any) => {
        const response = await axios.post(`${source}`, payload);
        return response.data;
      },
      [["ProjectAction.getProject"]]
    );
  },
  delete: () => {
    const { mutate } = useMutationData(
      ["PageAction.delete"],
      async (payload: any) => {
        const response = await axios.delete(`${source}/${payload.id}`);
        return response.data;
      },
      [["ProjectAction.getProject"]]
    );
  },
  update: () => {
    const { mutate } = useMutationData(
      ["PageAction.update"],
      async (payload: any) => {
        const response = await axios.patch(`${source}/update`, payload);
        return response.data;
      },
      [["ProjectAction.getProject"]]
    );
  },
};

export default PageAction;
