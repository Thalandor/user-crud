import express from "express";
import * as UserController from "../controllers/users";
import * as TokenController from "../controllers/token";
import { checkSchema, validationResult } from "express-validator";

export const router = express.Router();
const schema = {
  email: {
    isEmail: { errorMessage: "email is not a valid email" },
    isLength: { errorMessage: "email has invalid length", options: { min: 1 } },
  },
  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: "Password should be at least 8 chars",
    },
  },
};

const validate = () => {
  console.log("trying validation");
  return [
    checkSchema(schema),
    (req, res, next) => {
      console.log("before validation result");
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
      }
      next();
    },
  ];
};

router.post("/users", UserController.Create);
router.get("/users/:id", UserController.Read);
router.patch("/users/:id", UserController.Update);
router.delete("/users/:id", UserController.Delete);
router.post("/login", checkSchema(schema), TokenController.Login);
