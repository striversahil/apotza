import { useMutationData } from "@/hooks/useMutation";
import api from "..";

const source = "/user";

export const UserAction = {
  login: () => {
    const { mutate } = useMutationData(
      ["user-login"],
      async (payload: any) => {
        const response = await api.post(`${source}/signin`, payload);
        return response.data;
      },
      [["userinfo"]]
      // () => {
      //   console.log("User updated successfully!");
      // }
    );
    return { mutate };
  },

  signup: () => {
    const { mutate } = useMutationData(
      ["user-signup"],
      async (payload: any) => {
        const response = await api.post(`${source}/signup`, payload);
        return response.data;
      },
      [["userinfo"]]
      // () => {
      //   console.log("User updated successfully!");
      // }
    );
    return { mutate };
  },

  logout: () => {
    const { mutate } = useMutationData(
      ["user-logout"],
      async (payload: any) => {
        const response = await api.post(`${source}/logout`, payload);
        return response.data;
      },
      [["userinfo"]]
      // () => {
      //   console.log("User updated successfully!");
      // }
    );
    return { mutate };
  },
};
