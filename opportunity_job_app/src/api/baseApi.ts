"use client";

import axios from "axios";
import { AuthService } from "./authService";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const API = {
  getList: (urlPath: string, queryParams = "") => {
    const config = API._getConfig();
    return axiosInstance.get(`${ urlPath }/?${ queryParams }`, config);
  },
  getOne: (urlPath: string, resourceId: number) => {
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
  _getConfig: (): any => {
    const headers = {
      "Accept-Language": localStorage.getItem("locale"),
      ...AuthService.getAuthorizationHeaders()
    };
    return { headers: headers };
  },
};

export default API;
