import React from 'react';
import { User } from '../types/user.interface';
import './user-list.css';

interface UserListProps {
  users: User[];
  loading: boolean;
  error: string | null;
  removeUser: (id: number) => Promise<void>;
}

const UserList: React.FC<UserListProps> = ({ users, loading, error, removeUser }) => {
  if (loading) return <p className="loading-message">Loading users...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <ul className="user-list">
      {users.map((user) => (
        <li key={user.user_id} className="user-item">
          <div className="user-info">
          <div className="user-name">{user.name}</div>
          <div className="user-age">{user.email}</div>

          </div>
          <button 
            className="delete-btn"
            onClick={() => removeUser(user.user_id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default UserList;