"use client"
import axios from "axios";
// import { ENV } from "config/env";
import { AuthService } from "./authService";

const userData = [
    {
        token: "test",
        id: 1,
        profileType: "Company"
    },
    {
        token: "test2",
        id: 2,
        profileType: "Company2"
    }
]
localStorage.setItem("testUser", JSON.stringify(userData));
// const api = axios.create({
// 	baseURL: ENV.BASE_API_URL,
// });

export function setLocalStorage() {
    localStorage.setItem("testUser", JSON.stringify(userData));
    console.log('test')
}

const API = {
	// getAllResources: (resource, queryParams = "") => {
	// 	return api.get(`${resource}/?${queryParams}`);
	// },
	// getResourceById: (resource, resourceId) => {
	// 	return api.get(`${resource}/${resourceId}`);
	// },
	// getProtectedResourceById: (resource, resourceId) => {
	// 	const config = { headers: AuthService.getAuthorizationHeaders() };
	// 	return api.get(`${resource}/${resourceId}`, config);
	// },
	// post: (url, data, config) => {
	// 	return api.post(url, data, config);
	// },
	// patch: (url, data) => {
	// 	const config = {};
	// 	config.headers = AuthService.getAuthorizationHeaders();
	// 	return api.patch(url, data, config);
	// },
};

export default API;
