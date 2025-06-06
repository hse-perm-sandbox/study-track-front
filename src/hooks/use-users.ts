import { useState, useEffect } from 'react';
import { fetchUsers, createUser, deleteUser, updateUser } from '../services/users-api';
import { User } from '../types/user.interface';
import { CreateUserInput } from '../types/user.interface';
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

  const reloadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to reload users');
    }
  };

  const addUser = async (user: CreateUserInput) => {
  try {
    await createUser(user);
    await reloadUsers();
  } catch (err) {
    setError('Failed to add user');
  }
};

  const removeUser = async (id: number) => {
    try {
      await deleteUser(id);
      await reloadUsers(); // Повторная загрузка списка пользователей
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  const editUser = async (id: number, updatedUser: Partial<User>) => {
    try {
      await updateUser(id, updatedUser);
      await reloadUsers(); // Повторная загрузка списка пользователей
    } catch (err) {
      setError('Failed to update user');
    }
  };

  return { users, loading, error, addUser, removeUser, editUser };
};