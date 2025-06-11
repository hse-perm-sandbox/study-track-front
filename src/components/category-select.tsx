import React from 'react';
import { useCategories } from '../hooks/use-categories';
import './category-select.css';

interface CategorySelectProps {
  selectedCategory: number | null;
  onSelect: (id: number) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ selectedCategory, onSelect }) => {
  const { categories, loading, error } = useCategories();

  if (loading) return <p>Загрузка категорий...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="category-select">
      <label>Категория</label>
      <select
        value={selectedCategory || ''}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value="">Выберите категорию</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelect;