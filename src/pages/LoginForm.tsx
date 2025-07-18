import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import login from "../services/auth-api";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  try {
    await login(email, password);
    navigate("/tasks");
  } catch {
    setError("Неверный логин или пароль");
  }
};

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Логин"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Войти</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default LoginForm;