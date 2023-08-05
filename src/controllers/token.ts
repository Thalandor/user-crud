import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as usersRepository from "../repositories/users";
import { validationResult } from "express-validator";

export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  console.log("errors: :", errors);
  try {
    // Check if the user with the given email exists
    const user = await usersRepository.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Issue a JWT token for authentication
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
};
