import * as usersData from "./users.data.js";

export const getUserById = (id) => {
  const user = usersData.getUserById(id);

  return user;
};

export const getAllUsers = () => {
  const users = usersData.getAllUsers();

  return users;
};

export const createUser = (user) => {
  const newUser = usersData.createUser(user);

  return newUser;
};

export const updateUser = (user) => {
  const updatedUser = usersData.updateUser(user);

  return updatedUser;
};

export const deleteUser = (id) => {
  const result = usersData.deleteUser(id);

  return result;
};