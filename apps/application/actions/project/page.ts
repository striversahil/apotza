import { useMutationData } from "@/hooks/useMutation";
import api from "..";

const source = (process.env.NEXT_PUBLIC_BASE_URL as string) + "/page";

const PageAction = {
  create: () => {
    const { mutate } = useMutationData(
      ["PageAction.add"],
      async (payload: any) => {
        const response = await api.post(`${source}`, payload);
        return response.data;
      },
      [["GetProject.getProject"]]
    );
  },
  delete: () => {
    const { mutate } = useMutationData(
      ["PageAction.delete"],
      async (payload: any) => {
        const response = await api.delete(`${source}/${payload.id}`);
        return response.data;
      },
      [["GetProject.getProject"]]
    );

    return { mutate };
  },
  update: () => {
    const { mutate } = useMutationData(
      ["PageAction.update"],
      async (payload: any) => {
        const response = await api.patch(`${source}/${payload.id}`, payload);
        return response.data;
      },
      [["GetProject.getProject"]]
    );
    return { mutate };
  },
};

export default PageAction;
