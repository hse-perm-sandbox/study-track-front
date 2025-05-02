import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home: React.FC = () => {
  return (
    <div className="page-container home-container">
      <h1>Добро пожаловать!</h1>
      <p>Это главная страница приложения.</p>
      <Link to="/users">
        <button>Управление пользователями</button>
      </Link>
    </div>
  );
};

export default Home;