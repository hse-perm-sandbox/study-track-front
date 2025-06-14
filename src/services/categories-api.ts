import apiClient from './api-client';
import AuthService from './auth-service';
import { Category } from '../types/category.interface';

// Получить список всех категорий текущего пользователя
export const fetchCategories = async (): Promise<Category[]> => {
  const user = AuthService.getUserInfo(); // Получаем данные пользователя
  if (!user?.user_id) {
    throw new Error('Пользователь не авторизован');
  }

  const response = await apiClient.get('/categories/', {
    params: { user_id: user.user_id }, // Передаём user_id в запрос
  });
  return response.data;
};

// Создать новую категорию
export const createCategory = async (
  category: Omit<Category, 'id'>
): Promise<Category> => {
  const user = AuthService.getUserInfo();
  if (!user?.user_id) {
    throw new Error('Пользователь не авторизован');
  }

  const response = await apiClient.post('/categories/', {
    ...category,
    user_id: user.user_id, 
  });
  return response.data;
};

// Обновить категорию по ID
export const updateCategory = async (
  id: number,
  category: Partial<Omit<Category, 'id'>>
): Promise<Category> => {
  const response = await apiClient.patch(`/categories/${id}`, category);
  return response.data;
};

// Удалить категорию по ID
export const deleteCategory = async (id: number): Promise<void> => {
  await apiClient.delete(`/categories/${id}`);
};
