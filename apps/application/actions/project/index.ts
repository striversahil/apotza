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

const GetProject = {
  getProject: () => {
    return useQueryData(["GetProject.getProject"], async () => {
      const response = await api.get(`${project}`);
      return response.data;
    });
  },

  getContext: () => {
    return useQueryData(["GetProjec.getContext"], async () => {
      const response = await api.get(`${project}/context`);
      return response.data;
    });
  },

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++ CodeBlock Actions ++++++++++++++++++++++++++++++++++++++++++++++++++++++
  getCodeBlock: (id: string) => {
    return useQueryData(
      [`GetProject.getOneCodeBlock-${id}` as string],
      async () => {
        const response = await api.get(`${codeBlock}/${id}`);
        return response.data;
      }
    );
  },

  getContextCodeBlock: (id: string) => {
    return useQueryData(["GetProject.getContextCodeBlock"], async () => {
      const response = await api.get(`${codeBlock}/${id}/context`);
      return response.data;
    });
  },

  getStep: (id: string) => {
    return useQueryData([`GetProject.getOneStep-${id}` as string], async () => {
      const response = await api.get(`${stepsBlock}/${id}`);
      return response.data;
    });
  },

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++ Component Actions +++++++++++++++++++++++++++++++++++++++++++++++++++++++

  getPage: (route: string) => {
    const page_id = route.split("/").pop();
    return useQueryData(["GetProject.getPage"], async () => {
      const response = await api.get(`${page}/${page_id}`);
      return response.data;
    });
  },

  getSection: (id: string) => {
    return useQueryData(
      [`GetProject.getOneSection-${id}` as string],
      async () => {
        const response = await api.get(`${section}/${id}`);
        return response.data;
      }
    );
  },

  getComponent: (id: string) => {
    return useQueryData([`GetProject.getComponent-${id}`], async () => {
      const response = await api.get(`${component}/${id}`);
      return response.data;
    });
  },

  getComponents: () => {
    return useQueryData(["GetProject.getComponents"], async () => {
      const response = await api.get(`${component}`);
      return response.data;
    });
  },

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++ Project Specific Actions +++++++++++++++++++++++++++++++++++++++++++++++++++++++
  useNameChange: () => {
    return useMutationData(
      ["GetProject.nameChange"],
      async (payload: any) => {
        const response = await api.post(`${project}/name`, payload);
        return response;
      },
      [["GetProject.getProject"]],
      (previousData: any, variables: any) => {
        return { ...previousData, variables };
      }
    );
  },
};
export default GetProject;
