import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Добро пожаловать!</h1>
      <p>Это главная страница приложения.</p>
      <Link to="/users">
        <button>Управление пользователями</button>
      </Link>
    </div>
  );
};

export default Home;