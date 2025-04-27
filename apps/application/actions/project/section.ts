import { useMutationData } from "@/hooks/useMutation";
import { useQueryData } from "@/hooks/useQueryData";
import api from "..";
const source = "/section";

const SectionAction = {
  create: () => {
    const { mutate } = useMutationData(
      ["SectionAction.add"],
      async (payload: any) => {
        const response = await api.post(`${source}`, payload);
        return response.data;
      },
      [["GetProject.getPage"]]
    );
    return { mutate };
  },
  delete: () => {
    const { mutate } = useMutationData(
      ["SectionAction.delete"],
      async (payload: any) => {
        const response = await api.delete(`${source}/${payload.id}`);
        return response.data;
      },
      [["GetProject.getPage"]]
    );
    return { mutate };
  },
};

export default SectionAction;
