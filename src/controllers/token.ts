import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as usersRepository from "../repositories/users";

/**
 * Gets a token using a password and a email
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {string} req.body.email - The updated email of the user (received in the request body).
 * @param {string} req.body.password - The updated password of the user (received in the request body).
 * @returns {Promise<void>} The response indicating the success of the deletion.
 * @throws {Error} If there's an error during the user login.
 */
export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    // Check if the user with the given email exists
    const user = await usersRepository.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ errors: "Invalid email or password." });
    }
    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ errors: "Invalid email or password." });
    }
    // Issue a JWT token for authentication. The userId is not actually used though.
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ errors: error.message });
  }
};
