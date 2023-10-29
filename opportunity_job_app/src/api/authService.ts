import API from "./baseApi";
import { ApplicantAccount } from "@/api/models/ApplicantAccount";

export const AuthService = {
  login: async (email: string, password: string) => {
    const response = await API.post("login/", {
      email: email,
      password: password,
    });
    const authJSON = JSON.stringify({
      token: response.data.token,
      id: response.data.id,
      account_type: response.data.account_type,
      account_id: response.data.account_id
    });
    localStorage.setItem("auth", authJSON);
  },
  isAuthenticated: () => {
    return !!AuthService.getAuth();
  },
  getAuth: () => {
    const authJSON = localStorage.getItem("auth");
    if (authJSON) {
      return JSON.parse(authJSON);
    } else {
      return null;
    }
  },
  getAuthorizationHeaders: () => {
    const authJSON = localStorage.getItem("auth");
    const auth = authJSON ? JSON.parse(authJSON) : null;
    return auth ? { Authorization: `Bearer ${ auth.token }` } : {};
  },
  logout: async () => {
    try {
      await API.post("logout/", {});
    } catch (e) {
    }
    localStorage.removeItem("auth");
  },
  registerApplicant: (data: ApplicantAccount) => {
    return API.post(`register-applicant/`, data);
  },
  registerEmployer: (data: Object) => {
    return API.post(`register-employer/`, data);
  },
  requestPasswordReset: (email: string) => {
    return API.post("password-forgotten/", { email: email });
  },
  resetPassword: (hash: string, password: string) => {
    return API.post(`password-reset/${ hash }/`, { password: password });
  },
};
