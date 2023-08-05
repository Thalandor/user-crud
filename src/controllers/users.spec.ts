import request from "supertest";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import App from "../app";
import * as usersRepository from "../repositories/users";

jest.mock("../repositories/users", () => ({
  getUserByEmail: jest.fn(),
  getUserById: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),

  deleteUser: jest.fn(),
}));

const generateToken = () => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign({ test: "test" }, secretKey, { expiresIn: "1h" });
  return token;
};

describe("Create Endpoint", () => {
  let app: App;
  let expressApp: Express.Application;
  let token: string;

  beforeAll(async () => {
    app = new App();
    await app.start();
    expressApp = app.getApp();
    token = generateToken();
  });

  it("should create a user", async () => {
    const mockedCreateUser = usersRepository.createUser as jest.Mock;
    mockedCreateUser.mockImplementation(async (name, email, password) => {
      const newUser = {
        id: 1,
        name,
        email,
        password,
      };
      return newUser;
    });
    const response = await request(expressApp)
      .post("/users")
      .send({
        name: "test1",
        email: "email1@email1.com",
        password: "password1",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: 1,
      name: "test1",
      email: "email1@email1.com",
    });
  });

  it("should fail if user already created", async () => {
    const mockedGetUserByEmail = usersRepository.getUserByEmail as jest.Mock;
    mockedGetUserByEmail.mockReturnValueOnce({
      name: "test1",
      email: "email1@email1.com",
      password: "password1",
    });
    const response = await request(expressApp)
      .post("/users")
      .send({
        name: "test1",
        email: "email1@email1.com",
        password: "password1",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });
});

describe("Read Endpoint", () => {
  let app: App;
  let expressApp: Express.Application;
  let token: string;

  beforeAll(async () => {
    app = new App();
    await app.start();
    expressApp = app.getApp();
    token = generateToken();
  });

  it("should read a user", async () => {
    const mockedGetUserById = usersRepository.getUserById as jest.Mock;
    mockedGetUserById.mockReturnValueOnce({
      id: 1,
      name: "test1",
      email: "email1@email1.com",
    });
    const response = await request(expressApp)
      .get("/users/123")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body).toMatchObject({
      id: 1,
      name: "test1",
      email: "email1@email1.com",
    });
    expect(response.status).toBe(200);
  });

  it("should return an error if user does not exists", async () => {
    const mockedGetUserById = usersRepository.getUserById as jest.Mock;
    mockedGetUserById.mockReturnValueOnce(undefined);
    const response = await request(expressApp)
      .get("/users/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
  });
});

describe("Update Endpoint", () => {
  let app: App;
  let expressApp: Express.Application;
  let token: string;

  beforeAll(async () => {
    app = new App();
    await app.start();
    expressApp = app.getApp();
    token = generateToken();
  });

  it("should update a user", async () => {
    const mockedGetUserById = usersRepository.getUserById as jest.Mock;
    mockedGetUserById.mockReturnValueOnce({
      id: 1,
      name: "test1",
      email: "email1@email1.com",
    });
    const mockedUpdateUser = usersRepository.updateUser as jest.Mock;
    mockedUpdateUser.mockImplementationOnce(
      async (id, name, email, password) => {
        const updatedUser = {
          id: id,
          name,
          email,
          password,
        };
        return updatedUser;
      }
    );
    const response = await request(expressApp)
      .patch("/users/1")
      .send({ name: "new name" })
      .set("Authorization", `Bearer ${token}`);
    expect(response.body).toMatchObject({
      id: "1",
      name: "new name",
    });
    expect(response.status).toBe(200);
  });

  it("should return an error if user does not exists", async () => {
    const mockedGetUserById = usersRepository.getUserById as jest.Mock;
    mockedGetUserById.mockReturnValueOnce(undefined);
    const response = await request(expressApp)
      .patch("/users/1")
      .send({ name: "new name" })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
  });
});

describe("Delete Endpoint", () => {
  let app: App;
  let expressApp: Express.Application;
  let token: string;

  beforeAll(async () => {
    app = new App();
    await app.start();
    expressApp = app.getApp();
    token = generateToken();
  });

  it("should delete a user", async () => {
    const mockedDeleteUser = usersRepository.deleteUser as jest.Mock;
    mockedDeleteUser.mockReturnValueOnce(true);
    const response = await request(expressApp)
      .delete("/users/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("should return an error if user does not exists", async () => {
    const mockedDeleteUser = usersRepository.deleteUser as jest.Mock;
    mockedDeleteUser.mockReturnValueOnce(false);
    const response = await request(expressApp)
      .delete("/users/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
  });
});
