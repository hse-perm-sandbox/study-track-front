import React, { useState } from 'react';
import { useUsers } from '../hooks/use-users';

const UserForm: React.FC = () => {
  const { addUser } = useUsers();
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
        onChange={(e) => setAge(Number(e.target.value))}
      />
      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;