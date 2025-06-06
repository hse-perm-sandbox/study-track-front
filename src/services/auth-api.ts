import apiClient from './api-client';
import AuthService from './auth-service';

const login = async (email: string, password: string) => {
  const res = await apiClient.post("/auth/login", {
    email,
    password,
  });
  AuthService.setToken(res.data["token"])
  return res.data;
};
export default login;