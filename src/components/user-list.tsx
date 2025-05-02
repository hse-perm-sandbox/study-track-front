import React from 'react';
import { User } from '../types/user.interface';

interface UserListProps {
  users: User[];
  loading: boolean;
  error: string | null;
  removeUser: (id: number) => Promise<void>;
}

const UserList: React.FC<UserListProps> = ({ users, loading, error, removeUser }) => {
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