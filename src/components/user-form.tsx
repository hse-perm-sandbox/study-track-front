import React, { useState } from 'react';
import { User } from '../types/user.interface';
import './user-form.css';

interface UserFormProps {
  addUser: (user: Omit<User, 'id'>) => Promise<void>;
}

const UserForm: React.FC<UserFormProps> = ({ addUser }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !age) return;

    setIsSubmitting(true);
    try {
      await addUser({ name, age: Number(age) });
      setName('');
      setAge('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          className="form-control"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isSubmitting}
          aria-label="User name"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          className="form-control"
          placeholder="Enter age"
          value={age}
          onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
          disabled={isSubmitting}
          min="1"
          aria-label="User age"
        />
      </div>

      <button 
        type="submit" 
        className="submit-btn"
        disabled={!name || !age || isSubmitting}
        aria-label="Add user"
      >
        {isSubmitting ? 'Adding...' : 'Add User'}
      </button>
    </form>
  );
};

export default UserForm;