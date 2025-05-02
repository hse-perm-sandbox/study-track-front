import apiClient from './api-client';
import { User } from '../types/user.interface';

// Получить список пользователей
export const fetchUsers = async (): Promise<User[]> => {
  const response = await apiClient.get('/users');
  return response.data;
};

// Добавить нового пользователя
export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const response = await apiClient.post('/users', user);
  return response.data;
};

// Удалить пользователя
export const deleteUser = async (id: number): Promise<void> => {
  await apiClient.delete(`/users/${id}`);
};

// Обновить данные пользователя
export const updateUser = async (id: number, user: Partial<User>): Promise<User> => {
  const response = await apiClient.put(`/users/${id}`, user);
  return response.data;
};