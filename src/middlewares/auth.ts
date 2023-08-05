import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ errors: "Unauthorized. Token not found." });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY) as { userId: string };
    next();
  } catch (error) {
    return res.status(401).json({ errors: "Unauthorized. Invalid token." });
  }
};
