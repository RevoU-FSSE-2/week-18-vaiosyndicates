const allRoles = {
  user: ['getTodos', 'manageTodos'],
  admin: ['getUsers', 'manageUsers', 'getTodos', 'manageTodos'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
