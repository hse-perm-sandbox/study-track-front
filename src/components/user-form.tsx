import React, { useState } from 'react';
import { User } from '../types/user.interface';

interface UserFormProps {
  addUser: (user: Omit<User, 'id'>) => Promise<void>;
}

const UserForm: React.FC<UserFormProps> = ({ addUser }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !age) return;

    await addUser({ name, age: Number(age) });
    setName('');
    setAge('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
      />
      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;