import express from "express";
import * as UserController from "../controllers/users";
import * as TokenController from "../controllers/token";

export const router = express.Router();

router.post("/users", UserController.Create);
router.get("/users", UserController.Read);
router.post("/users", UserController.Update);
router.delete("/users", UserController.Delete);
router.post("/login", TokenController.Login);
