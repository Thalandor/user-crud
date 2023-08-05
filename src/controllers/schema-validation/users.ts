import { Schema } from "express-validator";

export const createSchema: Schema = {
  name: {
    notEmpty: true,
    isLength: {
      errorMessage: "Name should be less than 255 characters",
      options: { max: 255 },
    },
  },
  email: {
    isEmail: { errorMessage: "Email is not a valid email" },
    isLength: {
      errorMessage:
        "Password should be at least 1 chars and less than 50 characters",
      options: { min: 1, max: 255 },
    },
  },
  password: {
    isLength: {
      options: { min: 8, max: 50 },
      errorMessage:
        "Password should be at least 8 chars and less than 50 characters",
    },
  },
};

export const updateSchema: Schema = {
  id: {
    exists: true,
    isNumeric: true,
  },
  name: {
    optional: true,
    isLength: {
      errorMessage: "Name should be less than 255 characters",
      options: { min: 1, max: 255 },
    },
  },
  email: {
    optional: true,
    isEmail: { errorMessage: "Email is not a valid email" },
    isLength: {
      errorMessage:
        "Email should be at least 1 chars and less than 50 characters",
      options: { min: 1, max: 255 },
    },
  },
  password: {
    optional: true,
    isLength: {
      options: { min: 8, max: 50 },
      errorMessage:
        "Password should be at least 8 chars and less than 50 characters",
    },
  },
};

export const readSchema: Schema = {
  id: {
    exists: true,
    isNumeric: true,
  },
};

export const removeSchema: Schema = {
  id: {
    exists: true,
    isNumeric: true,
  },
};
