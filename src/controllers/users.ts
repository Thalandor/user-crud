import { Request, Response } from "express";
import * as usersRepository from "../repositories/users";
import bcrypt from "bcrypt";

const SALT = 10;

/**
 * Create a new user.
 *
 * @param {Request} req - The Express request object.
 * @param {string} req.body.name - The name of the new user (received in the request body).
 * @param {string} req.body.email - The email of the new user (received in the request body).
 * @param {string} req.body.password - The password of the new user (received in the request body).
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>} The response containing the newly created user (id, name and email).
 * @throws {Error} If there's an error during user creation.
 */
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

/**
 * Read a user by ID.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {string} req.params.id - The ID of the user to read (received in the request parameters).
 * @returns {Promise<void>} The response containing the user(id,name and email) with the specified ID.
 * @throws {Error} If there's an error while fetching the user.
 */
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

/**
 * Update a user by ID.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {string} req.params.id - The ID of the user to update (received in the request parameters).
 * @param {string} req.body.name - The updated name of the user (received in the request body).
 * @param {string} req.body.email - The updated email of the user (received in the request body).
 * @param {string} req.body.password - The updated password of the user (received in the request body).
 * @returns {Promise<void>} The response containing the updated user(id, name and email).
 * @throws {Error} If there's an error during user update.
 */
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const originalUser = await usersRepository.getUserById(id, {
      getPassword: true,
    });
    if (!originalUser) {
      return res.status(404).json({ errors: "User not found." });
    }
    // Hash the password in case there is a new one or use the original one
    const hashedPassword = password
      ? await bcrypt.hash(password, SALT)
      : originalUser.password;

    // Update the user with the new info
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

/**
 * Remove a user by ID.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {string} req.params.id - The ID of the user to remove (received in the request parameters).
 * @returns {Promise<void>} The response indicating the success of the deletion.
 * @throws {Error} If there's an error during user deletion.
 */
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
