import React from 'react';
import { Link } from 'react-router-dom';
import UserForm from '../components/user-form';
import UserList from '../components/user-list';
import { useUsers } from '../hooks/use-users';
import './users.css';

const UsersPage: React.FC = () => {
  const users = useUsers();
  return (
    <div className="page-container users-container">
      <h1>Управление пользователями</h1>
      <Link to="/">
        <button>На главную</button>
      </Link>
      <UserForm addUser={users.addUser}/>
      <UserList 
        users={users.users} 
        loading={users.loading} 
        error={users.error} 
        removeUser={users.removeUser} 
      />
    </div>
  );
};

export default UsersPage;