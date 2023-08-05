import request from "supertest";
import App from "../app";
import bcrypt from "bcrypt";

jest.mock("../repositories/users", () => ({
  getUserByEmail: jest.fn().mockImplementation(async () => {
    return { name: "testname", password: await bcrypt.hash("password1", 10) };
  }),
}));

describe("Login Endpoint", () => {
  let app: App;
  let expressApp: Express.Application;

  beforeAll(async () => {
    app = new App();
    await app.start();
    expressApp = app.getApp();
  });

  it("should login and get a token", async () => {
    const response = await request(expressApp)
      .post("/login")
      .send({ email: "email1@email1.com", password: "password1" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should not login with invalid credentials", async () => {
    const response = await request(expressApp)
      .post("/login")
      .send({ email: "email1@email1.com", password: "wrongpassword" });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "errors",
      "Invalid email or password."
    );
  });
});
