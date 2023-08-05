export const loginSchema = {
  email: {
    notEmpty: {
      errorMessage: "Email is mandatory",
    },
    isEmail: { errorMessage: "Email is not a valid email" },
    isLength: { errorMessage: "Email has invalid length", options: { min: 1 } },
  },
  password: {
    notEmpty: {
      errorMessage: "Password is mandatory",
    },
    isLength: {
      options: { min: 8 },
      errorMessage: "Password should be at least 8 chars",
    },
  },
};
