export const loginSchema = {
  email: {
    isEmail: { errorMessage: "Email is not a valid email" },
    isLength: { errorMessage: "Email has invalid length", options: { min: 1 } },
  },
  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: "Password should be at least 8 chars",
    },
  },
};
