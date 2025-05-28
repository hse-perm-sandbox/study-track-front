import apiClient from './api-client';
import { Task } from '../types/task.interface';

// Получить список задач
export const fetchTasks = async (): Promise<Task[]> => {
  const response = await apiClient.get('/tasks');
  return response.data;
};

// Добавить новую задачу
export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const response = await apiClient.post('/tasks', task);
  return response.data;
};

// Удалить задачу
export const deleteTask = async (id: number): Promise<void> => {
  await apiClient.delete(`/tasks/${id}`);
};

// Обновить данные задачи
export const updateTask = async (id: number, task: Partial<Task>): Promise<Task> => {
  const response = await apiClient.patch(`/tasks/${id}`, task);
  return response.data;
};
