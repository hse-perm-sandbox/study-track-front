import { useState, useEffect } from 'react';
import { fetchTasks, createTask, deleteTask } from '../services/tasks-api';
import { Task } from '../types/task.interface';
import AuthService from '../services/auth-service';
import { User } from '../types/user.interface';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    try {
      const currentUser: User | null = AuthService.getUserInfo();
      if (!currentUser){
        throw new Error('Current user is not set');
      }
      const data = await fetchTasks(currentUser.id);
      setTasks(data);
    } catch {
      setError('Ошибка загрузки задач');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async (task: Omit<Task, 'id'>) => {
    try {
      await createTask(task);
      await loadTasks();
    } catch {
      setError('Ошибка добавления задачи');
    }
  };

  const removeTask = async (id: number) => {
    try {
      await deleteTask(id);
      await loadTasks();
    } catch {
      setError('Ошибка удаления задачи');
    }
  };

  return { tasks, loading, error, addTask, removeTask };
};
