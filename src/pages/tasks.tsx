import React from 'react';
import { Link } from 'react-router-dom';
import TaskForm from '../components/task-form';
import TaskList from '../components/task-list';
import { useTasks } from '../hooks/use-tasks';
import './tasks.css';

const TasksPage: React.FC = () => {
  const tasks = useTasks();

  return (
    <div className="page-container tasks-container">
      <h1>Управление задачами</h1>
      <Link to="/">
        <button>На главную</button>
      </Link>
      <TaskForm addTask={tasks.addTask} />
      <TaskList
        tasks={tasks.tasks}
        loading={tasks.loading}
        error={tasks.error}
        removeTask={tasks.removeTask}
      />
    </div>
  );
};

export default TasksPage;