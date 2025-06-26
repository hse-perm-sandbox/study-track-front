import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home';
import UsersPage from './pages/users';
import LoginPage from './pages/LoginPage';
import './App.css';
import TasksPage from './pages/tasks';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <nav style={{ padding: '10px', background: '#f0f0f0' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Главная</Link>
        <Link to="/tasks" style={{ marginRight: '10px' }}>Задачи</Link> 
        <Link to="/users">Регистрация</Link>        
        <Link to="/login" style={{ marginLeft: '10px' }}>Вход</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/tasks" element={<TasksPage />} /> 
      </Routes>
    </BrowserRouter>
  );
};

export default App;