import { Request, Response } from "express";
import * as usersRepository from "../repositories/users";
import bcrypt from "bcrypt";

const SALT = 10;

export const create = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await usersRepository.getUserByEmail(email);
    if (user) {
      return res.status(404).json({ errors: "User already exists." });
    }
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
    res.status(500).json({ errors: error.message });
  }
};

export const read = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await usersRepository.getUserById(id);
    if (!user) {
      return res.status(404).json({ errors: "User not found." });
    }
    res.json(user);
  } catch (error) {
    console.error("Error while fetching users:", error);
    res.status(500).json({ errors: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const originalUser = await usersRepository.getUserById(id);
    if (!originalUser) {
      return res.status(404).json({ errors: "User not found." });
    }
    // Hash the password in case there is a new one or get the original one
    const hashedPassword = password
      ? await bcrypt.hash(password, SALT)
      : originalUser.password;
    console.log("hey dude");
    const updatedUser = await usersRepository.updateUser(
      id,
      name || originalUser.name,
      email || originalUser.email,
      hashedPassword
    );
    res.json(updatedUser);
  } catch (error) {
    console.error("Error during user update:", error);
    res.status(500).json({ errors: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const isDeleted = await usersRepository.deleteUser(id);
    if (!isDeleted) {
      return res.status(404).json({ errors: "User not found." });
    }
    res.json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error during user deletion:", error);
    res.status(500).json({ errors: error.message });
  }
};
