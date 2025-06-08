import apiClient from './api-client';
import { Category } from '../types/category.interface';

// Получить список всех категорий текущего пользователя
export const fetchCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get('/categories/');
  return response.data;
};

// Создать новую категорию
export const createCategory = async (
  category: Omit<Category, 'id'>
): Promise<Category> => {
  const response = await apiClient.post('/categories/', category);
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
