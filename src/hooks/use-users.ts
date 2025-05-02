import { useState, useEffect } from 'react';
import { fetchUsers, createUser, deleteUser, updateUser } from '../services/users-api';
import { User } from '../types/user.interface';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const addUser = async (user: Omit<User, 'id'>) => {
    const newUser = await createUser(user);
    setUsers((prev) => [...prev, newUser]);
  };

  const removeUser = async (id: number) => {
    await deleteUser(id);
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const editUser = async (id: number, updatedUser: Partial<User>) => {
    const user = await updateUser(id, updatedUser);
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...user } : u))
    );
  };

  return { users, loading, error, addUser, removeUser, editUser };
};