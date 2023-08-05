import { db } from "../db/db";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export const createUser = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  try {
    const newUser: User = await db.one(
      "INSERT INTO users(name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, password]
    );

    return newUser;
  } catch (error) {
    console.error("Error during user creation:", error);
    throw new Error("Something went wrong.");
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const user: User = await db.oneOrNone(
      "SELECT id, name, email FROM users WHERE id = $1",
      [id]
    );

    return user;
  } catch (error) {
    console.error("Error while fetching user:", error);
    throw new Error("Something went wrong.");
  }
};

export const updateUser = async (
  id: string,
  name: string,
  email: string,
  password: string
): Promise<User | null> => {
  try {
    // Get current user
    const user: User = await db.oneOrNone(
      "SELECT id, name, email, password FROM users WHERE id = $1",
      [id]
    );

    if (!user) {
      return null;
    }

    const updatedUser: User = await db.one(
      "UPDATE users SET name = $1, email = $2 , password = $3 WHERE id = $4 RETURNING id, name, email",
      [name, email, password, id]
    );

    return updatedUser;
  } catch (error) {
    console.error("Error during user update:", error);
    throw new Error("Something went wrong.");
  }
};

export const deleteUser = async (id: string): Promise<boolean> => {
  try {
    const result = await db.result("DELETE FROM users WHERE id = $1", id);

    // Check if the user was deleted successfully
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error during user deletion:", error);
    throw new Error("Something went wrong.");
  }
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    // Fetch the user by their email from the database
    const user: User = await db.oneOrNone(
      "SELECT * FROM users WHERE email = $1",
      email
    );
    return user;
  } catch (error) {
    console.error("Error while fetching user:", error);
    throw new Error("Something went wrong.");
  }
};
