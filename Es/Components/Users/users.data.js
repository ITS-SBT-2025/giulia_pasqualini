import dbUsers from "../../database/users.js";

export const getUserById = (id) => {
  const user = dbUsers.find((u) => u.id === id);

  if (!user) {
    // TODO: gestire errore
    return null;
  }

  return user;
};

export const getAllUsers = () => {
  return dbUsers;
};

export const createUser = (user) => {
  const maxId = dbUsers.length > 0 ? Math.max(...dbUsers.map((u) => u.id)) : 0;

  const newUser = {
    ...user,
    id: maxId + 1,
  };

  dbUsers.push(newUser);

  return newUser;
};

export const updateUser = (user) => {
  const index = dbUsers.findIndex((u) => u.id === user.id);

  if (index === -1) {
    // TODO: gestire errore
    return null;
  }

  dbUsers[index] = { ...user };

  return dbUsers[index];
};

export const deleteUser = (id) => {
  const index = dbUsers.findIndex((u) => u.id === id);

  if (index === -1) {
    // TODO: gestire errore
    return false;
  }

  dbUsers.splice(index, 1);

  return true;
};