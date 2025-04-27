import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.defaults.withCredentials = true;

// let access_token = localStorage.getItem("access_token");
// let refresh_token = localStorage.getItem("refresh_token");

// Adding access token to each Request Header
// api.interceptors.request.use(
//   (config) => {
//     if (access_token && access_token.length) {
//       config.headers.Authorization = `Bearer ${access_token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

api.interceptors.response.use(
  (response) => {
    // //  If the response status is 201 (created), store the access token and refresh token
    // if (response.status === 201) {
    //   localStorage.setItem("access_token", response.data.payload.accessToken);
    //   localStorage.setItem("refresh_token", response.data.payload.refreshToken);
    //   return response.data;
    // }

    // // If the response status is 210 (Logout), remove the access token and redirect to the login page
    // if (response.status === 210) {
    //   localStorage.removeItem("access_token");
    //   localStorage.removeItem("refresh_token");
    //   window.location.href = "/login";
    // }

    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // If the response status is 401 (unauthorized), redirect to the login page
    if (error.response.status === 401) {
      window.location.href = "/login";
    }
    // If the response status is 402 (unauthorized), refresh the token and retry the request
    if (error.response.status === 402 && !originalRequest._retry) {
      originalRequest._retry = true;
      const res = await api.post("/user/access_token");

      if (res.status === 200) {
        return api(originalRequest);
      }
    }

    // For example, you can redirect the user to the login page
    return Promise.reject(error);
  }
);

export default api;
