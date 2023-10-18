"use client";

import axios from "axios";
import { AuthService } from "./authService";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const API = {
    getOne: (resource: string, queryParams = "") => {
        const config = { headers: AuthService.getAuthorizationHeaders() };
        return axiosInstance.get(`${ resource }/?${ queryParams }`, config);
    },
    getList: (resource: string, resourceId: number) => {
        const config = { headers: AuthService.getAuthorizationHeaders() };
        return axiosInstance.get(`${ resource }/${ resourceId }/`, config);
    },
    post: (url: string, data: Object) => {
        const config = { headers: AuthService.getAuthorizationHeaders() };
        return axiosInstance.post(url, data, config);
    },
    patch: (url: string, data: Object) => {
        const config = { headers: AuthService.getAuthorizationHeaders() };
        return axiosInstance.patch(url, data, config);
    },
    delete: (url: string) => {
        const config = { headers: AuthService.getAuthorizationHeaders() };
        return axiosInstance.delete(url, config);
    },
};

export default API;
