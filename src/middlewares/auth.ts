import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Middleware function to validate JWT token
export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Assuming the token is sent as a Bearer token

  if (!token) {
    return res.status(401).json({ error: "Unauthorized. Token not found." });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY) as { userId: string };
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized. Invalid token." });
  }
};
