import { useState, useEffect } from 'react';
import { fetchTasks, createTask, deleteTask } from '../services/tasks-api';
import { Task } from '../types/task.interface';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
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
