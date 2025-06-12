import * as usersService from "./users.service.js";

export const getUserById = (req, res) => {
  const user = usersService.getUserById(Number(req.params.id));

  res.status(200).json(user);
};

export const getAllUsers = (req, res) => {
  const users = usersService.getAllUsers();

  res.status(200).json(users);
};

export const createUser = (req, res) => {
  const user = usersService.createUser(req.body);

  res.status(201).json(user);
};

export const updateUser = (req, res) => {
  const user = usersService.updateUser({
    ...req.body,
    id: Number(req.params.id),
  });

  res.status(200).json(user);
};

export const deleteUser = (req, res) => {
  const result = usersService.deleteUser(Number(req.params.id));

  res.status(200).json(result);
};