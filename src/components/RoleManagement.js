import React, { useState, useEffect } from 'react';
import { mockApi } from '../utils/mockApi';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState({ name: '', permissions: [] });
  const [permission, setPermission] = useState('');

  useEffect(() => {
    // Fetch initial roles
    mockApi.getRoles().then(setRoles);
  }, []);

  const handleAddRole = () => {
    if (!newRole.name) return alert('Role name is required!');
    mockApi.addRole(newRole).then((role) => setRoles([...roles, role]));
    setNewRole({ name: '', permissions: [] });
  };

  const handleAddPermission = () => {
    if (!permission) return;
    setNewRole({ ...newRole, permissions: [...newRole.permissions, permission] });
    setPermission('');
  };

  const handleDeleteRole = (id) => {
    mockApi.deleteRole(id).then(() => setRoles(roles.filter((role) => role.id !== id)));
  };

  return (
    <div className="role-management">
      <h2>Role Management</h2>
      <div className="add-role">
        <input
          type="text"
          placeholder="Role Name"
          value={newRole.name}
          onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
        />
        <div className="permissions">
          <input
            type="text"
            placeholder="Permission"
            value={permission}
            onChange={(e) => setPermission(e.target.value)}
          />
          <button onClick={handleAddPermission}>Add Permission</button>
        </div>
        <button onClick={handleAddRole}>Add Role</button>
      </div>
      <ul>
        {roles.map((role) => (
          <li key={role.id}>
            {role.name} ({role.permissions.join(', ')})
            <button onClick={() => handleDeleteRole(role.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleManagement;
