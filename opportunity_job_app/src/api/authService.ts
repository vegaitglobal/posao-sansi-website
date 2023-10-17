import API from "./baseApi";

export const AuthService = {
    login: async (email: string, password: string) => {
        const response = await API.post("login/", {
            email: email,
            password: password,
        },{});
        const userDataString = JSON.stringify({
            token: response.data.token,
            id: response.data.id,
            accountType: response.data.account_type,
            account_id: response.data.account_id
        });
        localStorage.setItem("user", userDataString);
    },
    isAuthenticated: () => {
        return !!AuthService.getUser();
    },
    getUser: () => {
        const userData = localStorage.getItem("user");
        if (userData) {
            return JSON.parse(userData);
        } else {
            return null;
        }
    },
    getAuthorizationHeaders: () => {
        const userJSON = localStorage.getItem("user");
        const user = userJSON ? JSON.parse(userJSON) : null;
        return user ? { Authorization: `Bearer ${ user?.token }` } : {};
    },
  logout: async () => {
    try {
      await API.post("logout/", {}, { headers: AuthService.getAuthorizationHeaders() });
    } catch (e) {}
    localStorage.removeItem("user");
  },
  register: (userData: Object, type: any) => {
    return API.post(`register-${type}/`, userData, {});
  },
  forgotPassword: (email: string) => {
    return API.post("/password-forgotten/", { email: email }, {});
  },
  resetPassword: (hash: string, password: string) => {
    return API.post(`/password-reset/${hash}/`, { password: password }, {});
  },
};
