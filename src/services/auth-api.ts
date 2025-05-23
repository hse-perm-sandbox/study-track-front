import axios from 'axios';

const login = async (email: string, password: string) => {
  const res = await axios.post("http://localhost:8080/api/auth/login", {
    email,
    password,
  });
  return res.data;
};
export default login;