import { useMutationData } from "@/hooks/useMutation";
import { useQueryData } from "@/hooks/useQueryData";
import { toast } from "sonner";
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
  coordinatesUpdate: (section_id: string) => {
    const { mutate } = useMutationData(
      ["ComponentAction.coordinatesUpdate"],
      async (payload: any) => {
        const response = await api.patch(`${source}/coordinates`, payload);
        return response.data;
      },
      [
        [`GetProject.getOneSection-${section_id}`],
        ["GetProject.getComponents"],
      ],
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
                    coordinates: {
                      x: item.coordinates.x + variables.x,
                      y: item.coordinates.y + variables.y,
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

  update: (section_id: string) => {
    const { mutate } = useMutationData(
      ["ComponentAction.update"],
      async (payload: any) => {
        const response = await api.patch(`${source}/${payload.id}`, payload);
        return response.data;
      },
      [[`GetProject.getOneSection-${section_id}`]],
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
                    content: variables.content ?? item.content,
                    appearance: variables.appearance ?? item.appearance,
                    layout: variables.layout ?? item.layout,
                    interaction: variables.interaction ?? item.interaction,
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
  updateWidthHeight: (section_id: string) => {
    const { mutate } = useMutationData(
      ["ComponentAction.updateWidthHeight"],
      async (payload: any) => {
        const response = await api.patch(`${source}/update`, payload);
        return response.data;
      },
      [[`GetProject.getOneSection-${section_id}`]],
      (previousData: any, variables: any) => {
        return {
          ...previousData,
          payload: {
            ...previousData.payload,
            components: [...previousData.payload.components].map(
              (item: any) => {
                if (item.id === variables.id) {
                  console.log(variables);
                  return {
                    ...item,
                    layout: {
                      ...variables.layout,
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
};

export default ComponentAction;
