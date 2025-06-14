import React, { useState } from 'react';
import { useCategories } from '../hooks/use-categories';
import AuthService from '../services/auth-service';
import './category-select.css';

const CategoryManager: React.FC = () => {
  const {
    categories,
    loading,
    error,
    addCategory,
    removeCategory,
  } = useCategories();

  const [newCategory, setNewCategory] = useState('');
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError(null);

    const name = newCategory.trim();
    if (!name) {
      setAddError('Название не может быть пустым');
      return;
    }

    const user = AuthService.getUserInfo();
    if (!user?.user_id) {
      setAddError('Пользователь не авторизован');
      return;
    }

    setAdding(true);
    try {
      await addCategory({ name, user_id: user.user_id });
      setNewCategory('');
    } catch {
      setAddError('Ошибка при добавлении категории');
    } finally {
      setAdding(false);
    }
  };

  const handleRemoveCategory = async (id: number) => {
    if (window.confirm('Удалить категорию?')) {
      await removeCategory(id);
    }
  };

  return (
    <div className="category-manager">
      <h3>Категории</h3>
      {error && <div className="error">{error}</div>}

      <ul className="category-list">
        {loading ? (
          <li>Загрузка...</li>
        ) : (
          categories.map((cat) => (
            <li key={cat.id} className="category-item">
              {cat.name}
              <button
                className="remove-btn"
                onClick={() => handleRemoveCategory(cat.id)}
                disabled={adding}
                title="Удалить категорию"
              >
                ✕
              </button>
            </li>
          ))
        )}
      </ul>

      <div className="add-category-form">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Новая категория"
          disabled={adding}
        />
        <button
          type="button" // ВАЖНО: НЕ submit
          onClick={handleAddCategory}
          disabled={adding}
        >
          {adding ? 'Добавление...' : 'Добавить'}
        </button>
      </div>

      {addError && <div className="error">{addError}</div>}
    </div>
  );
};

export default CategoryManager;
