"use client";

import axios from "axios";
import { AuthService } from "./authService";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const API = {
  getOne: (urlPath: string, queryParams = "") => {
    const config = API._getConfig();
    return axiosInstance.get(`${ urlPath }/?${ queryParams }`, config);
  },
  getList: (urlPath: string, resourceId: number) => {
    const config = API._getConfig();
    return axiosInstance.get(`${ urlPath }/${ resourceId }/`, config);
  },
  post: (urlPath: string, data: Object) => {
    const config = API._getConfig();
    return axiosInstance.post(urlPath, data, config);
  },
  patch: (urlPath: string, data: Object) => {
    const config = API._getConfig();
    return axiosInstance.patch(urlPath, data, config);
  },
  delete: (urlPath: string) => {
    const config = API._getConfig();
    return axiosInstance.delete(urlPath, config);
  },
  _getConfig: () => {
    const headers = {
      "Accept-Language": "sr", // TODO: set this dynamically
      ...AuthService.getAuthorizationHeaders()
    };
    return { headers: headers };
  },

  // TODO: REMOVE WHEN FINISHED WITH DEVELOPMENT
  index: () => {
    console.log("process.env.NEXT_PUBLIC_API_URL:", process.env.NEXT_PUBLIC_API_URL);
    console.log("axiosInstance.getUri():", axiosInstance.getUri());

    const config = API._getConfig();
    return axiosInstance.get("/", config);
  }
};

export default API;
