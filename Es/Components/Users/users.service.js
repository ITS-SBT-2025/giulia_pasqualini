import * as usersData from "./users.data.js";
import bcrypt from "bcrypt";

export const getUserById = async (id) => {
  const user = await usersData.getUserById(id);
  return user;
};

export const getAllUsers = () => {
  const users = usersData.getAllUsers();
  return users;
};

export const createUser = async (user) => {
  const newUserId = await usersData.createUser({
    ...user,
    password: bcrypt.hashSync(user.password),
  });
}

export const updateUser = async (user) => {
  await usersData.updateUser(user);
  return await getUserById(user.id);
};

export const deleteUser = async (id) => {
  const result = await usersData.deleteUser(id);
  return result;
};