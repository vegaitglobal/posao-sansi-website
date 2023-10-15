"use client";
import axios from "axios";
import { AuthService } from "./authService";

const api = axios.create({
    baseURL: "http://localhost:8000/api", // TODO: get from env vars
});

const API = {
    getResourceList: (resource: string, queryParams = "") => {
        return api.get(`${ resource }/?${ queryParams }`);
    },
    getProtectedResourceList: (resource: string, queryParams = "") => {
        const config = { headers: AuthService.getAuthorizationHeaders() };
        return api.get(`${ resource }/?${ queryParams }`, config);
    },
    getResourceDetails: (resource: string, resourceId: number) => {
        return api.get(`${ resource }/${ resourceId }`);
    },
    getProtectedResourceDetails: (resource: string, resourceId: number) => {
        const config = { headers: AuthService.getAuthorizationHeaders() };
        return api.get(`${ resource }/${ resourceId }`, config);
    },
    post: (url:string, data: Object, config: Object) => {
        return api.post(url, data, config);
    },
    patch: (url: string, data: Object) => {
        return api.patch(url, data);
    },
};

export default API;
