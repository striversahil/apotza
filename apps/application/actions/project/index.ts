import { useMutationData } from "@/hooks/useMutation";
import { useQueryData } from "@/hooks/useQueryData";
import api from "..";

const codeBlock = "/codeblock";
const stepsBlock = "/stepblock";
const project = "/project";
const page = "/page";
const section = "/section";
const component = "/component";

// Here the Index i.e. Most Used Common Get Actions will be Handled for Project

const ProjectAction = {
  getProject: () => {
    return useQueryData(["ProjectAction.getProject"], async () => {
      const response = await api.get(`${project}`);
      return response.data;
    });
  },
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++ CodeBlock Actions ++++++++++++++++++++++++++++++++++++++++++++++++++++++
  getCodeBlock: (id: string) => {
    return useQueryData(
      [`ProjectAction.getOneCodeBlock-${id}` as string],
      async () => {
        const response = await api.get(`${codeBlock}/${id}`);
        return response.data;
      }
    );
  },

  getStep: (id: string) => {
    return useQueryData(
      [`ProjectAction.getOneStep-${id}` as string],
      async () => {
        const response = await api.get(`${stepsBlock}/${id}`);
        return response.data;
      }
    );
  },

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++ Component Actions +++++++++++++++++++++++++++++++++++++++++++++++++++++++

  getPage: (route: string) => {
    const page_id = route.split("/").pop();
    return useQueryData(["ProjectAction.getPage"], async () => {
      const response = await api.get(`${page}/${page_id}`);
      return response.data;
    });
  },

  getSection: (id: string) => {
    return useQueryData(
      [`ProjectAction.getOneSection-${id}` as string],
      async () => {
        const response = await api.get(`${section}/${id}`);
        return response.data;
      }
    );
  },

  getComponent: (id: string) => {
    return useQueryData([`ProjectAction.getComponent-${id}`], async () => {
      const response = await api.get(`${component}/${id}`);
      return response.data;
    });
  },

  getComponents: () => {
    return useQueryData(["ProjectAction.getComponents"], async () => {
      const response = await api.get(`${component}`);
      return response.data;
    });
  },

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++ Project Specific Actions +++++++++++++++++++++++++++++++++++++++++++++++++++++++
  useNameChange: () => {
    return useMutationData(
      ["ProjectAction.nameChange"],
      async (payload: any) => {
        const response = await api.post(`${project}/name`, payload);
        return response;
      },
      [["ProjectAction.getProject"]],
      (previousData: any, variables: any) => {
        return { ...previousData, variables };
      }
    );
  },
};
export default ProjectAction;
