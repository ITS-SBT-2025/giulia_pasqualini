import * as usersService from "./users.service.js";

export const getUserById = async (req, res) => {
 const schema = z.object({
    params: z.object({
      id: z.preprocess((val) => Number(val), z.number().positive()),
    }),
  });
    const isValidData = await schema.safeParseAsync({
      params: req.params,
    });
    if (!isValidData.success) {
        throw new ErrorWithStatus(422, isValidData.error.issues);
    }
  const user = usersService.getUserById(Number(req.params.id));
  res.status(200).json(user);
};

export const getAllUsers = (req, res) => {
  const users = usersService.getAllUsers();

  res.status(200).json(users);
};

export const createUser = async (req, res) => {
    const schema = z.object({
    params: z.object({
      name: z.string(),
      email: z.string(),
      age: z.number().int().positive(),
      isActive: z.boolean(),
    }),
  });
    const isValidData = await schema.safeParseAsync({
      params: req.params,
    });
    if (!isValidData.success) {
        throw new ErrorWithStatus(422, isValidData.error.issues);
    }
  const user = usersService.createUser(req.body);

  res.status(201).json(user);
};

export const updateUser = async (req, res) => {
  const schema = z.object({
    params: z.object({
      id: z.preprocess((val) => Number(val), z.number().positive()),
    }),
    body: z.object({
      name: z.string(),
      email: z.string(),
      age: z.number().int().positive(),
      isActive: z.boolean(),
    }),
  });
  const isValidData = await schema.safeParseAsync({
    params: req.params,
    body: req.body,
  });
  const user = usersService.updateUser({
    ...req.body,
    id: Number(req.params.id),
  });
    if (!isValidData.success) {
      throw new ErrorWithStatus(422, isValidData.error.issues);
    }
  res.status(200).json(user);
};

export const deleteUser = async (req, res) => {
  const schema = z.object({
    params: z.object({
      id: z.preprocess((val) => Number(val), z.number().positive()),
    }),
  });
  const isValidData = await schema.safeParseAsync({
    params: req.params,
  });
  if (!isValidData.success) {
    throw new ErrorWithStatus(422, isValidData.error.issues);
  }
  const result = usersService.deleteUser(Number(req.params.id));

  res.status(200).json(result);
};