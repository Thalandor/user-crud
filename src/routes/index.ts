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

export const router = express.Router();

router.post("/users", ...validate(createSchema), UserController.create);
router.get("/users/:id", ...validate(readSchema), UserController.read);
router.patch("/users/:id", ...validate(updateSchema), UserController.update);
router.delete("/users/:id", ...validate(removeSchema), UserController.remove);
router.post("/login", ...validate(loginSchema), TokenController.Login);
