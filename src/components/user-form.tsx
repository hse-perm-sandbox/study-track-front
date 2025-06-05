import React, { useState } from 'react';
import { User } from '../types/user.interface';
import './user-form.css';

interface UserFormProps {
  addUser: (user: Omit<User, 'id'>) => Promise<void>;
}

const UserForm: React.FC<UserFormProps> = ({ addUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    try {
      await addUser({
        name, email,
        password_hash: '',
        created_at: new Date,
        updated_at: new Date
      });
      setName('');
      setEmail('');
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
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="string"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
          min="1"
          aria-label="User age"
        />
      </div>

      <button 
        type="submit" 
        className="submit-btn"
        disabled={!name || !email || isSubmitting}
        aria-label="Add user"
      >
        {isSubmitting ? 'Adding...' : 'Add User'}
      </button>
    </form>
  );
};

export default UserForm;