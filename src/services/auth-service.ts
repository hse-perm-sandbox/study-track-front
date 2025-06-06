import { jwtDecode } from "jwt-decode";
import { User } from "../types/user.interface";

const AuthService = {
  setToken(token: string) {
    return localStorage.setItem("token", token);
  },

  logout() {
    localStorage.removeItem("token");
  },

  getToken() {
    return localStorage.getItem("token");
  },

  getUserInfo() {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<User>(token);
      
    } catch (e) {
      console.error("Ошибка декодирования JWT:", e);
      return null;
    }
  }
};

export default AuthService;