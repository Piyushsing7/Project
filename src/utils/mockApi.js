export const mockApi = {
    users: [
      { id: 1, name: 'Alice', role: 'Admin' },
      { id: 2, name: 'Bob', role: 'User' },
    ],
    roles: [
      { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
      { id: 2, name: 'User', permissions: ['Read'] },
    ],
  
    getUsers: async () => mockApi.users,
    addUser: async (user) => {
      const id = Date.now();
      const newUser = { ...user, id };
      mockApi.users.push(newUser);
      return newUser;
    },
    deleteUser: async (id) => {
      mockApi.users = mockApi.users.filter((user) => user.id !== id);
    },
  
    getRoles: async () => mockApi.roles,
    addRole: async (role) => {
      const id = Date.now();
      const newRole = { ...role, id };
      mockApi.roles.push(newRole);
      return newRole;
    },
    deleteRole: async (id) => {
      mockApi.roles = mockApi.roles.filter((role) => role.id !== id);
    },
  };
  