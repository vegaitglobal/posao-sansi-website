"use client"
import axios from "axios";
import { AuthService } from "./authService";

const userData = {
    token: "test",
    id: 1,
    accountType: "Company"
}

const api = axios.create({
    baseURL: "http://localhost:8000/api", // TODO: get from env vars
});

export function setLocalStorage() {
    localStorage.setItem("testUser", JSON.stringify(userData));
}

const API = {
    getAllResources: (resource, queryParams = "") => {
        return api.get(`${ resource }/?${ queryParams }`);
    },
    getResourceById: (resource, resourceId) => {
        return api.get(`${ resource }/${ resourceId }`);
    },
    getProtectedResourceById: (resource, resourceId) => {
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
