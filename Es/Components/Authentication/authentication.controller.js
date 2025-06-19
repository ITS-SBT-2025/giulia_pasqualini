import ErrorWithStatus from "../../error-with-status.js";
import * as authenticationService from "./authentication.service.js";
import z from "zod";

export const signin = async (req, res) => {
  const schema = z.object({
    body: z.object({
      email: z.string(),
      password: z.string(),
    }),
  });

  const isValidData = await schema.safeParseAsync({
    body: req.body,
  });

  if (!isValidData.success) {
    throw new ErrorWithStatus(422, isValidData.error.issues);
  }

  const token = await authenticationService.signin(
    req.body.email,
    req.body.password
  );

  res.status(200).json({ token });
};