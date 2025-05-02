import React from 'react';
import { useUsers } from '../hooks/use-users';

const UserList: React.FC = () => {
  const { users, loading, error, removeUser } = useUsers();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} ({user.age} years old)
          <button onClick={() => removeUser(user.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default UserList;