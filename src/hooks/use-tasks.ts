import { useEffect, useState } from 'react';
import { Task } from '../types/task.interface';
import { fetchTasks, createTask, deleteTask, updateTask} from '../services/tasks-api';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    try {
      const data = await fetchTasks(); 
      setTasks(data);
    } catch (err) {
      setError('Ошибка загрузки задач');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async (task: Omit<Task, 'id' | 'user_id'>) => {
    try {
      const newTask = await createTask(task); 
      setTasks((prev) => [...prev, newTask]);
    } catch {
      setError('Ошибка при добавлении задачи');
    }
  };

  const removeTask = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setError('Ошибка при удалении задачи');
    }
  };

  const editTask = async (id: number, updated: Partial<Task>) => {
  try {
    const updatedTask = await updateTask(id, updated);
    setTasks((prev) => prev.map((t) => t.id === id ? updatedTask : t));
  } catch {
    setError('Ошибка при обновлении задачи');
  }
  };

  return { tasks, loading, error, addTask, removeTask, editTask };
};
