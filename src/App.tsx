import React from 'react';
import UserList from './components/user-list';
import UserForm from './components/user-form';

const App: React.FC = () => {
  return (
    <div>
      <h1>User Management</h1>
      <UserForm />
      <UserList />
    </div>
  );
};

export default App;