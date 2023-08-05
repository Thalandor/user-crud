import express from "express";
import * as UserController from "../controllers/users";
import * as TokenController from "../controllers/token";
import { validate } from "../middlewares/validation";
import { loginSchema } from "../controllers/schema-validation/token";
import {
  createSchema,
  readSchema,
  removeSchema,
  updateSchema,
} from "../controllers/schema-validation/users";
import { validateToken } from "../middlewares/auth";

export const router = express.Router();

router.post(
  "/users",
  validateToken,
  ...validate(createSchema),
  UserController.create
);

router.get(
  "/users/:id",
  validateToken,
  ...validate(readSchema),
  UserController.read
);

router.patch(
  "/users/:id",
  validateToken,
  ...validate(updateSchema),
  UserController.update
);

router.delete(
  "/users/:id",
  validateToken,
  ...validate(removeSchema),
  UserController.remove
);

router.post("/login", ...validate(loginSchema), TokenController.Login);
