import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  baseURL: "http://localhost:3000/api/",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`
  },
  timeout: 1000,
  withCredentials: true,
  responseType: "json"
};

export const client = {
  post: function(url: string, data: any) {
    return axios.post(url, data, config);
  },
  patch: function(url: string, data: any) {
    return axios.patch(url, data, config);
  },
  get: function(url: string) {
    return axios.get(url, config);
  },
  delete: function(url: string) {
    return axios.delete(url, config);
  }
};
