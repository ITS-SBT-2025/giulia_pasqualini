import ErrorWithStatus from "../../error-with-status.js";
import { getUserByEmail } from "../Users/users.data.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signin = async (email, password) => {
  // verifico se l'utente (email) esiste
  const user = await getUserByEmail(email);

  // verifico se la password ricevuta è corretta
  // bcrypt mi consente di confrontare una password in chiaro con una password criptata
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new ErrorWithStatus(401, "Password errata");
  }

  // creo un nuovo token, utilizzando la secret key definita nel file .env
  // salvo nel token tutte le informazioni dell'utente (oggetto user)
  // configuro il token in modo che scada dopo 8 ore
  return jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: "8h" });
};