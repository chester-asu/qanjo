import axios, { AxiosRequestConfig } from "axios";

const unauthenticatedConfig: () => AxiosRequestConfig = () => ({
  baseURL: "http://localhost:3000/v1",
  timeout: 1000,
  responseType: "json"
});

const authenticatedConfig: () => AxiosRequestConfig = () => ({
  baseURL: "http://localhost:3000/v1",
  timeout: 1000,
  responseType: "json",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Authorization: `Bearer ${localStorage.getItem("token")}`
  },
  withCredentials: true
});

function clientFactory(config: () => AxiosRequestConfig) {
  return {
    post: function(url: string, data: any) {
      return axios.post(url, data, config());
    },
    patch: function(url: string, data: any) {
      return axios.patch(url, data, config());
    },
    get: function(url: string) {
      return axios.get(url, config());
    },
    delete: function(url: string) {
      return axios.delete(url, config());
    }
  };
}

export const authenticatedClient = clientFactory(authenticatedConfig);
export const unauthenticatedClient = clientFactory(unauthenticatedConfig);
