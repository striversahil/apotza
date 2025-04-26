import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/user`,
});

api.defaults.withCredentials = true;

export const LoginAction = {
  USER_LOGIN: "USER_LOGIN",
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAILED: "USER_LOGIN_FAILED",
};
