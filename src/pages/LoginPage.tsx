import React from "react";
import LoginForm from "../pages/LoginForm";
import { Link } from "react-router-dom";
import "./login.css";

const LoginPage: React.FC = () => {
  return (
    <div className="page-container login-container">
      <h1>Добро пожаловать в StudyTrack</h1>
      <LoginForm />
      <Link to="/">
        <button>На главную</button>
      </Link>
    </div>
  );
};

export default LoginPage;