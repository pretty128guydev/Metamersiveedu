/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_PUBLIC_URL,
});

// const requestHeader = (config) => {
//   return config;
// };

// axios.interceptors.request.use(requestHeader);

// export default { instance };
