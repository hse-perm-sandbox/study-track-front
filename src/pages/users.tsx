import React from 'react';
import { Link } from 'react-router-dom';
import UserForm from '../components/user-form';
import { useUsers } from '../hooks/use-users';
import './users.css';

const UsersPage: React.FC = () => {
  const users = useUsers();
  return (
    <div className="page-container users-container">
      <h1>Регистрация</h1>
      <Link to="/">
        <button>На главную</button>
      </Link>
      <UserForm addUser={users.addUser}/>
    </div>
  );
};

export default UsersPage;