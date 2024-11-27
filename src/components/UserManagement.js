import React, { useState, useEffect } from 'react';
import { mockApi } from '../utils/mockApi';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', role: '' });

  useEffect(() => {
    // Fetch initial users
    mockApi.getUsers().then(setUsers);
  }, []);

  const handleAddUser = () => {
    if (!newUser.name || !newUser.role) return alert('Both fields are required!');
    mockApi.addUser(newUser).then((user) => setUsers([...users, user]));
    setNewUser({ name: '', role: '' });
  };

  const handleDeleteUser = (id) => {
    mockApi.deleteUser(id).then(() => setUsers(users.filter((user) => user.id !== id)));
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <div className="add-user">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Role"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.role})
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
