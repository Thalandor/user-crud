import express from "express";
import * as UserController from "../controllers/users";
import * as TokenController from "../controllers/token";

export const router = express.Router();

router.post("/users", UserController.Create);
router.get("/users/:id", UserController.Read);
router.patch("/users/:id", UserController.Update);
router.delete("/users/:id", UserController.Delete);
router.post("/login", TokenController.Login);
