import React, { useState } from 'react';
import { Task } from '../types/task.interface';
import './task-form.css';

interface TaskFormProps {
  addTask: (task: Omit<Task, 'id'>) => Promise<void>;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('low');
  const [deadline, setDeadline] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState(1); // временно
  const [categoryId, setCategoryId] = useState(1); // временно

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !deadline) return;

    setIsSubmitting(true);
    try {
      await addTask({
        title,
        description,
        priority,
        deadline,
        user_id: userId,
        category_id: categoryId,
        });
      setTitle('');
      setDescription('');
      setPriority('low');
      setDeadline('');
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

      <button
        type="submit"
        className="submit-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Добавление...' : 'Добавить задачу'}
      </button>
    </form>
  );
};

export default TaskForm;
