import React, { useState } from 'react';
import { Task } from '../types/task.interface';
import './task-form.css';
import AuthService from '../services/auth-service';
import { useCategories } from '../hooks/use-categories';
import CategoryManager from './category-select';

interface TaskFormProps {
  addTask: (task: Omit<Task, 'id' | 'user_id'>) => Promise<void>;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');
  const [deadline, setDeadline] = useState('');
  const [displayDeadline, setDisplayDeadline] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();

  const handleDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let formattedValue = value;

    // Автоматическое добавление разделителей
    if (value.length === 2 || value.length === 5) {
      formattedValue = value + '-';
    }

    // Ограничение длины и разрешение только цифр и дефисов
    if (value.length <= 10 && /^[\d-]*$/.test(value)) {
      setDisplayDeadline(formattedValue);
      
      // Преобразование в формат ГГГГ-ММ-ДД при полной дате
      if (value.length === 10) {
        const [day, month, year] = value.split('-');
        if (day && month && year) {
          setDeadline(`${year}-${month}-${day}`);
          return;
        }
      }
      setDeadline('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!title.trim()) {
      setFormError('Введите название задачи');
      return;
    }

    if (!deadline) {
      setFormError('Укажите корректный срок выполнения (ДД-ММ-ГГГГ)');
      return;
    }

    const user = AuthService.getUserInfo();
    if (!user?.user_id) {
      setFormError('Пользователь не авторизован');
      return;
    }

    if (!categoryId) {
      setFormError('Выберите категорию');
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
      
      // Сброс формы
      setTitle('');
      setDescription('');
      setPriority('low');
      setDisplayDeadline('');
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
          disabled={isSubmitting}
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
          disabled={isSubmitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor="priority">Приоритет</label>
        <select
          id="priority"
          className="form-control"
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
          disabled={isSubmitting}
        >
          <option value="low">Низкий</option>
          <option value="medium">Средний</option>
          <option value="high">Высокий</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="deadline">Срок выполнения * (ДД-ММ-ГГГГ)</label>
        <input
          id="deadline"
          type="text"
          className="form-control"
          placeholder="ДД-ММ-ГГГГ"
          value={displayDeadline}
          onChange={handleDeadlineChange}
          maxLength={10}
          disabled={isSubmitting}
        />
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
        disabled={isSubmitting || isCategoriesDisabled}
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
      <CategoryManager />
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