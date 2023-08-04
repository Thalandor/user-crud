import { Request, Response } from "express";
import * as usersRepository from "../repositories/users";
import bcrypt from "bcrypt";

const SALT = 10;

export const Create = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // TODO: Input validation (check if name, email, and password are provided and meet your requirements)
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, SALT);
    const newUser = await usersRepository.createUser(
      name,
      email,
      hashedPassword
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

    const user = await usersRepository.getUserById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json(user);
  } catch (error) {
    console.error("Error while fetching users:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
};

export const Update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    // Hash the password before updating it in the database
    const hashedPassword = await bcrypt.hash(password, SALT);
    const updatedUser = await usersRepository.updateUser(
      id,
      name,
      email,
      hashedPassword
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error during user update:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
};

export const Delete = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const isDeleted = await usersRepository.deleteUser(id);

    if (!isDeleted) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error during user deletion:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
};
