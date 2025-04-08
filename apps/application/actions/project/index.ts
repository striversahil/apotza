import { useMutationData } from "@/hooks/useMutation";
import { useQueryData } from "@/hooks/useQueryData";
import axios from "axios";

axios.defaults.withCredentials = true; // Global axios config to enable cookies
const codeBlock = (process.env.NEXT_PUBLIC_BASE_URL as string) + "/codeblock";
const stepsBlock = (process.env.NEXT_PUBLIC_BASE_URL as string) + "/stepblock";
const project = (process.env.NEXT_PUBLIC_BASE_URL as string) + "/project";
const page = (process.env.NEXT_PUBLIC_BASE_URL as string) + "/page";
const section = (process.env.NEXT_PUBLIC_BASE_URL as string) + "/section";
const component = (process.env.NEXT_PUBLIC_BASE_URL as string) + "/component";

// Here the Index i.e. Most Used Common Get Actions will be Handled for Project

const ProjectAction = {
  getProject: () => {
    return useQueryData(["ProjectAction.getProject"], async () => {
      const response = await axios.get(`${project}`);
      return response.data;
    });
  },
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++ CodeBlock Actions ++++++++++++++++++++++++++++++++++++++++++++++++++++++
  getCodeBlock: (id: string) => {
    return useQueryData(
      [`ProjectAction.getOneCodeBlock-${id}` as string],
      async () => {
        const response = await axios.get(`${codeBlock}/${id}`);
        return response.data;
      }
    );
  },

  getStep: (id: string) => {
    return useQueryData(
      [`ProjectAction.getOneStep-${id}` as string],
      async () => {
        const response = await axios.get(`${stepsBlock}/${id}`);
        return response.data;
      }
    );
  },

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++ Component Actions +++++++++++++++++++++++++++++++++++++++++++++++++++++++

  getPage: (route: string) => {
    const page_id = route.split("/").pop();
    return useQueryData(["ProjectAction.getPage"], async () => {
      const response = await axios.get(`${page}/${page_id}`);
      return response.data;
    });
  },

  getSection: (id: string) => {
    return useQueryData(
      [`ProjectAction.getOneSection-${id}` as string],
      async () => {
        const response = await axios.get(`${section}/${id}`);
        return response.data;
      }
    );
  },

  getComponent: (id: string) => {
    return useQueryData([`ProjectAction.getComponent-${id}`], async () => {
      const response = await axios.get(`${component}/${id}`);
      return response.data;
    });
  },

  getComponents: () => {
    return useQueryData(["ProjectAction.getComponents"], async () => {
      const response = await axios.get(`${component}`);
      return response.data;
    });
  },

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++ Project Specific Actions +++++++++++++++++++++++++++++++++++++++++++++++++++++++
  useNameChange: () => {
    return useMutationData(
      ["ProjectAction.nameChange"],
      async (payload: any) => {
        const response = await axios.post(`${project}/name`, payload);
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
