import React from 'react';
import { Task } from '../types/task.interface';
import './task-list.css';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  removeTask: (id: number) => Promise<void>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, loading, error, removeTask }) => {
  if (loading) return <p className="loading-message">Загрузка задач...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className="task-item">
          <div className="task-info">
            <div className="task-title">{task.title}</div>
            <div className="task-desc">{task.description}</div>
            <div className="task-meta">
              <span>Приоритет: {task.priority}</span><br />
              <span>Срок: {new Date(task.deadline).toLocaleDateString()}</span>
            </div>
          </div>
          <button
            className="delete-btn"
            onClick={() => removeTask(task.id)}
          >
            Удалить
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
