import * as usersData from "./users.data.js";

export const getUserById = async (id) => {
  const user = await usersData.getUserById(id);
  return user;
};

export const getAllUsers = () => {
  const users = usersData.getAllUsers();
  return users;
};

export const createUser = async (user) => {
  const newUser = await usersData.createUser(user);
  return newUser;
};

export const updateUser = async (user) => {
  const updatedUser = await usersData.updateUser(user);
  return updatedUser;
};

export const deleteUser = async (id) => {
  const result = await usersData.deleteUser(id);
  return result;
};