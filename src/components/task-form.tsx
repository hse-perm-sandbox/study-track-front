import React, { useState } from 'react';
import { Task } from '../types/task.interface';
import './task-form.css';
import AuthService from '../services/auth-service';
import { useCategories } from '../hooks/use-categories';
import { Category } from '../types/category.interface';

interface TaskFormProps {
  addTask: (task: Omit<Task, 'id' | 'user_id'>) => Promise<void>;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('low');
  const [deadline, setDeadline] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { categories, error: categoriesError } = useCategories();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !deadline || !categoryId) return;

    const user = AuthService.getUserInfo();
    if (!user?.user_id) {
      console.error('Пользователь не авторизован');
      return;
    }

    setIsSubmitting(true);
    try {
      await addTask({
        title,
        description,
        priority,
        deadline,
        category_id: categoryId,
      });
      setTitle('');
      setDescription('');
      setPriority('low');
      setDeadline('');
      setCategoryId(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Название</label>
        <input
          id="title"
          type="text"
          className="form-control"
          placeholder="Введите название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Описание</label>
        <input
          id="description"
          type="text"
          className="form-control"
          placeholder="Введите описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="priority">Приоритет</label>
        <select
          id="priority"
          className="form-control"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Низкий</option>
          <option value="medium">Средний</option>
          <option value="high">Высокий</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="deadline">Срок</label>
        <input
          id="deadline"
          type="date"
          className="form-control"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Категория</label>
        <select
          id="category"
          className="form-control"
          value={categoryId ?? ''}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          required
        >
          <option value="">Выберите категорию</option>
          {categories.map((category: Category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {categoriesError && <p className="error">{categoriesError}</p>}
      </div>

      <button type="submit" className="submit-btn" disabled={isSubmitting}>
        {isSubmitting ? 'Добавление...' : 'Добавить задачу'}
      </button>
    </form>
  );
};

export default TaskForm;
