import jwt from "jsonwebtoken";
import ErrorWithStatus from "../error-with-status.js";

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      throw new ErrorWithStatus(401, "Accesso negato");
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    throw new ErrorWithStatus(401, "Accesso negato");
  }
};

export default verifyToken;