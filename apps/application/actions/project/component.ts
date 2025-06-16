import { useMutationData } from "@/hooks/useMutation";
import api from "..";
const source = "/component";

const ComponentAction = {
  add: (section_id: string) => {
    const { mutate } = useMutationData(
      ["ComponentAction.add"],
      async (payload: any) => {
        const response = await api.post(`${source}`, payload);
        return response.data;
      },
      [
        [`GetProject.getOneSection-${section_id}`],
        ["GetProject.getComponents"],
      ],
      () => {},
      () => {}
    );
    return { mutate };
  },
  coordinateUpdate: (id: string) => {
    const { mutate } = useMutationData(
      ["ComponentAction.coordinateUpdate"],
      async (payload: any) => {
        const response = await api.patch(`${source}/coordinates`, payload);
        return response.data;
      },
      [[`GetProject.getComponent-${id}`], ["GetProject.getComponents"]],
      (previousData: any, variables: any) => {
        return {
          ...previousData,
          payload: {
            ...previousData.payload,
            coordinates: {
              x: previousData.payload.coordinates.x + variables.x,
              y: previousData.payload.coordinates.y + variables.y,
            },
          },
        };
      },
      () => {}
    );
    return { mutate };
  },

  delete: (section_id: string) => {
    const { mutate } = useMutationData(
      ["ComponentAction.delete"],
      async (payload: any) => {
        const response = await api.delete(`${source}/${payload.id}`);
        return response.data;
      },
      [[`GetProject.getOneSection-${section_id}`]],
      (previousData: any, variables: any) => {
        return {
          ...previousData,
          payload: {
            ...previousData.payload,
            components: [...previousData.payload.components].filter(
              (item: any) => item.id !== variables.id
            ),
          },
        };
      },
      () => {}
    );
    return { mutate };
  },

  updateComponent: (id: string) => {
    const { mutate } = useMutationData(
      ["ComponentAction.updateComponent"],
      async (payload: any) => {
        const response = await api.patch(`${source}/${id}`, payload);
        return response.data;
      },
      [[`GetProject.getComponent-${id}`]],
      (previousData: any, variables: any) => {
        return {
          ...previousData,
          payload: {
            ...previousData.payload,
            configuration: {
              ...variables.configuration,
            },
          },
        };
      },
      () => {}
    );
    return { mutate };
  },

  update: (id: string) => {
    const { mutate } = useMutationData(
      ["ComponentAction.update"],
      async (payload: any) => {
        const response = await api.patch(`${source}/${payload.id}`, payload);
        return response.data;
      },
      [[`GetProject.getComponent-${id}`]],
      (previousData: any, variables: any) => {
        return {
          ...previousData,
          payload: {
            ...previousData.payload,
            components: [...previousData.payload.components].map(
              (item: any) => {
                if (item.id === variables.id) {
                  return {
                    ...item,
                    configuration: {
                      ...variables.configuration,
                    },
                  };
                }
                return item;
              }
            ),
          },
        };
      },
      () => {}
    );

    return { mutate };
  },
  updateSize: (id: string) => {
    const { mutate } = useMutationData(
      ["ComponentAction.updateSize"],
      async (payload: any) => {
        const response = await api.patch(`${source}/${payload.id}`, payload);
        return response.data;
      },
      [[`GetProject.getComponent-${id}`]],
      (previousData: any, variables: any) => {
        console.log("variables", variables);
        return {
          ...previousData,
          payload: {
            ...previousData.payload,
            configuration: {
              ...variables.configuration,
            },
          },
        };
      },
      () => {}
    );
    return { mutate };
  },
};

export default ComponentAction;
