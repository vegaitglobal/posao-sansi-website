"use client";
import axios from "axios";
import { AuthService } from "./authService";

const api = axios.create({
    baseURL: "http://localhost:8000/api", // TODO: get from env vars
});

const API = {
    getResourceList: (resource, queryParams = "") => {
        return api.get(`${ resource }/?${ queryParams }`);
    },
    getProtectedResourceList: (resource, queryParams = "") => {
        const config = { headers: AuthService.getAuthorizationHeaders() };
        return api.get(`${ resource }/?${ queryParams }`, config);
    },
    getResourceDetails: (resource, resourceId) => {
        return api.get(`${ resource }/${ resourceId }`);
    },
    getProtectedResourceDetails: (resource, resourceId) => {
        const config = { headers: AuthService.getAuthorizationHeaders() };
        return api.get(`${ resource }/${ resourceId }`, config);
    },
    post: (url, data, config) => {
        return api.post(url, data, config);
    },
    patch: (url, data) => {
        const config = {};
        config.headers = AuthService.getAuthorizationHeaders();
        return api.patch(url, data, config);
    },
};

export default API;
