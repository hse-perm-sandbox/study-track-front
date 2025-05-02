import React from 'react';
import UserList from './components/user-list';
import UserForm from './components/user-form';
import { useUsers } from './hooks/use-users';

const App: React.FC = () => {
  const users = useUsers();
  return (
    <div>
      <h1>User Management</h1>
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

export default App;