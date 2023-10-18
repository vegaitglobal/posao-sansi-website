"use client";

import axios from "axios";
import { AuthService } from "./authService";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const API = {
    getResourceList: (resource: string, queryParams = "") => {
        const config = { headers: AuthService.getAuthorizationHeaders() };
        return axiosInstance.get(`${ resource }/?${ queryParams }`, config);
    },
    getProtectedResourceList: (resource: string, queryParams = "") => {
        const config = { headers: AuthService.getAuthorizationHeaders() };
        return axiosInstance.get(`${ resource }/?${ queryParams }`, config);
    },
    getResourceDetails: (resource: string, resourceId: number) => {
        const config = { headers: AuthService.getAuthorizationHeaders() };
        return axiosInstance.get(`${ resource }/${ resourceId }/`, config);
    },
    getProtectedResourceDetails: (resource: string, resourceId: number) => {
        const config = { headers: AuthService.getAuthorizationHeaders() };
        return axiosInstance.get(`${ resource }/${ resourceId }/`, config);
    },
    post: (url: string, data: Object, config: Object) => {
        return axiosInstance.post(url, data, config);
    },
    patch: (url: string, data: Object) => {
        return axiosInstance.patch(url, data);
    },
    delete: (url: string, config: Object) => {
        return axiosInstance.delete(url, config);
    },
};

export default API;
