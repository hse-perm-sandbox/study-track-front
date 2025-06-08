import { useEffect, useState } from 'react';
import { Category } from '../types/category.interface';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../services/categories-api';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch {
      setError('Ошибка загрузки категорий');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const addCategory = async (category: Omit<Category, 'id'>) => {
    try {
      const newCategory = await createCategory(category);
      setCategories((prev) => [...prev, newCategory]);
    } catch {
      setError('Ошибка при добавлении категории');
    }
  };

  const editCategory = async (
    id: number,
    updated: Partial<Omit<Category, 'id'>>
  ) => {
    try {
      const updatedCategory = await updateCategory(id, updated);
      setCategories((prev) =>
        prev.map((c) => (c.id === id ? updatedCategory : c))
      );
    } catch {
      setError('Ошибка при обновлении категории');
    }
  };

  const removeCategory = async (id: number) => {
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch {
      setError('Ошибка при удалении категории');
    }
  };

  return {
    categories,
    loading,
    error,
    addCategory,
    editCategory,
    removeCategory,
  };
};
