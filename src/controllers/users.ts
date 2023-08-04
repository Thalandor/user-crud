import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { db } from "../db/db";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export const Create = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // TODO: Input validation (check if name, email, and password are provided and meet your requirements)

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // TODO: Insert the new user into the database
    const newUser: User = await db.one(
      "INSERT INTO users(name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashedPassword]
    );

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error during user creation:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
};

export const Read = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const users: User[] = await db.one(
      "SELECT id, name, email FROM users WHERE id = $1",
      [id]
    );
    res.json(users);
  } catch (error) {
    console.error("Error while fetching users:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
};

export const Update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // Get current user
    const user: User = await db.one(
      "SELECT id, name, email, password FROM users WHERE id = $1",
      [id]
    );

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // TODO: Input validation (check if name and email are provided and meet your requirements)

    const updatedUser: User = await db.one(
      "UPDATE users SET name = $1, email = $2 , password = $3 WHERE id = $4 RETURNING id, name, email",
      [name, email, password, id]
    );

    res.json(updatedUser);
  } catch (error) {
    console.error("Error during user update:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
};

export const Delete = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // TODO: Delete the user from the database
    const user = await db.result("DELETE FROM users WHERE id = $1", id);

    // Check if the user was deleted successfully
    if (user.rowCount === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error during user deletion:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
};
