import { AxiosRequestConfig, AxiosResponse } from "axios";
import { AuthService } from "@/api/authService";
import { axiosInstance } from "@/api/baseApi";

export const prepareRequest = async (config): Promise<AxiosRequestConfig> => {
  return {
    ...config,
    headers: {
      "Accept-Language": localStorage.getItem("locale"),
      ...AuthService.getAuthorizationHeaders()
    }
  };
};

export const handleResponseError = async (error: any): Promise<AxiosResponse> => {
  if (error.response.status === 401 && localStorage.getItem("auth")) {
    const originalRequest = error.config;
    originalRequest._retry = true;
    localStorage.removeItem("auth");
    // TODO: refresh auth in Header component since
    //  it will stay the same after this even if "auth"
    //  is removed from local storage
    return axiosInstance(originalRequest);
  }
  return Promise.reject(error);
};