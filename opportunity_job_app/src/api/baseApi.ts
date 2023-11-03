"use client";

import axios from "axios";
import { handleResponseError, prepareRequest } from "@/api/utils";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use(
  config => prepareRequest(config),
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  error => handleResponseError(error)
);

const API = {
  getList: (urlPath: string, queryParams = "") => {
    return axiosInstance.get(`${ urlPath }/?${ queryParams }`);
  },
  getOne: (urlPath: string, resourceId: number) => {
    return axiosInstance.get(`${ urlPath }/${ resourceId }/`);
  },
  post: (urlPath: string, data: Object) => {
    return axiosInstance.post(urlPath, data);
  },
  patch: (urlPath: string, data: Object) => {
    return axiosInstance.patch(urlPath, data);
  },
  delete: (urlPath: string) => {
    return axiosInstance.delete(urlPath);
  },
};

export default API;
