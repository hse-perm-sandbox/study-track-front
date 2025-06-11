import React, { useState } from 'react';
import { Task } from '../types/task.interface';
import './task-form.css';
import AuthService from '../services/auth-service';
import { useCategories } from '../hooks/use-categories';

interface TaskFormProps {
  addTask: (task: Omit<Task, 'id' | 'user_id'>) => Promise<void>;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  // Состояния формы
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');
  const [deadline, setDeadline] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Получаем категории
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();

  const handleDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (value) {
      const year = new Date(value).getFullYear();
      if (year < 1000 || year > 9999) {
        setFormError('Год должен состоять из 4 цифр');
        return;
      }
    }
    
    setDeadline(value);
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!title.trim()) {
      setFormError('Введите название задачи');
      return;
    }
    if (!deadline) {
      setFormError('Укажите срок выполнения');
      return;
    }
    if (!categoryId) {
      setFormError('Выберите категорию');
      return;
    }

    const user = AuthService.getUserInfo();
    if (!user?.user_id) {
      setFormError('Пользователь не авторизован');
      return;
    }

    setIsSubmitting(true);
    try {
      await addTask({
        title: title.trim(),
        description: description.trim(),
        priority,
        deadline,
        category_id: categoryId,
      });
      setTitle('');
      setDescription('');
      setPriority('low');
      setDeadline('');
      setCategoryId(null);
    } catch (error) {
      setFormError('Ошибка при добавлении задачи');
      console.error('Error adding task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isCategoriesDisabled = Boolean(categoriesError) || categories.length === 0;

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {formError && <div className="form-error">{formError}</div>}

      <div className="form-group">
        <label htmlFor="title">Название *</label>
        <input
          id="title"
          type="text"
          className="form-control"
          placeholder="Введите название задачи"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Описание</label>
        <textarea
          id="description"
          className="form-control"
          placeholder="Введите описание задачи"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          maxLength={500}
        />
      </div>

      <div className="form-group">
        <label htmlFor="priority">Приоритет</label>
        <select
          id="priority"
          className="form-control"
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
        >
          <option value="low">Низкий</option>
          <option value="medium">Средний</option>
          <option value="high">Высокий</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="deadline">Срок выполнения *</label>
        <input
          id="deadline"
          type="date"
          className="form-control"
          value={deadline}
          onChange={handleDeadlineChange}
          min={new Date().toISOString().split('T')[0]}
          max="2100-12-31"
        />
        <small className="text-muted">Формат: ГГГГ-ММ-ДД</small>
      </div>

      <div className="form-group">
        <label htmlFor="category">Категория *</label>
        {categoriesLoading ? (
          <div className="loading">Загрузка категорий...</div>
        ) : (
          <>
            <select
              id="category"
              className="form-control"
              value={categoryId ?? ''}
              onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : null)}
              disabled={isCategoriesDisabled}
            >
              <option value="">Выберите категорию</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {categoriesError && <div className="error">{categoriesError}</div>}
            {categories.length === 0 && !categoriesError && (
              <div className="info">Нет доступных категорий</div>
            )}
          </>
        )}
      </div>

      <button 
        type="submit" 
        className="submit-btn" 
        disabled={isSubmitting || categoriesLoading}
      >
        {isSubmitting ? 'Добавление...' : 'Добавить задачу'}
      </button>
    </form>
  );
};

export default TaskForm;