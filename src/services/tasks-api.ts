import apiClient from './api-client';
import { Task } from '../types/task.interface';

// Получить список задач текущего пользователя (userId внутри токена)
export const fetchTasks = async (): Promise<Task[]> => {
  const response = await apiClient.get('/tasks/');
  return response.data;
};

export const createTask = async (
  task: Omit<Task, 'id' | 'user_id'>
): Promise<Task> => {
  const response = await apiClient.post('/tasks/', task);
  return response.data;
};

export const deleteTask = async (taskId: number): Promise<void> => {
  await apiClient.delete(`/tasks/${taskId}`);
};

export const updateTask = async (
  id: number,
  task: Partial<Task>
): Promise<Task> => {
  const response = await apiClient.patch(`/tasks/${id}`, task);
  return response.data;
};