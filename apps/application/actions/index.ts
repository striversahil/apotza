import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
});

let access_token = localStorage.getItem("access_token");
let refresh_token = localStorage.getItem("refresh_token");

api.interceptors.request.use(
  (config) => {
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If the response status is 401 (unauthorized), redirect to the login page
    if (error.response.status === 401) {
      window.location.href = "/login";
    }
    // If the response status is 402 (unauthorized), refresh the token
    if (error.response.status === 402) {
      const res = await api.post("/access_token", {
        refreshToken: refresh_token,
      });

      if (res.status === 200) {
        access_token = res.data.accessToken;
        refresh_token = res.data.refreshToken;
        localStorage.setItem("access_token", access_token ?? "");
        localStorage.setItem("refresh_token", refresh_token ?? "");
      }
    }

    // If the response status is 410 (Logout), remove the access token and redirect to the login page
    if (error.response.status === 410) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.href = "/login";
    }

    // Handle 401 errors here
    // For example, you can redirect the user to the login page
    return Promise.reject(error);
  }
);
