// import request from "supertest";
// import app from "../app";
// import App from "../app";
// import { User } from "../repositories/users";
// import jwt from "jsonwebtoken";

// export const generateValidToken = (user: User): string => {
//   const payload = { userId: user.id };
//   return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
// };

// describe("User Endpoints", () => {
//   let createdUserId: string; // To store the id of the user created in the test

//   let app: App;
//   let authToken: string; // To store the generated token

//   beforeAll(() => {
//     app = new App();
//     authToken = generateValidToken({ id: "test-user-id" }); // Use the ID of the user you want to simulate in the token
//   });

//   it("should create a new user", async () => {
//     const response = await request(app).post("/users").send({
//       name: "John Doe",
//       email: "john@example.com",
//       password: "securepass",
//     });

//     expect(response.status).toBe(201);
//     expect(response.body).toHaveProperty("id");
//     createdUserId = response.body.id;
//   });

//   it("should get a user by id", async () => {
//     const response = await request(app).get(`/users/${createdUserId}`);

//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty("id", createdUserId);
//     expect(response.body).toHaveProperty("name", "John Doe");
//     expect(response.body).toHaveProperty("email", "john@example.com");
//   });

//   it("should update a user", async () => {
//     const response = await request(app).patch(`/users/${createdUserId}`).send({
//       name: "Updated Name",
//       email: "updated@example.com",
//       password: "newpassword",
//     });

//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty("id", createdUserId);
//     expect(response.body).toHaveProperty("name", "Updated Name");
//     expect(response.body).toHaveProperty("email", "updated@example.com");
//   });

//   it("should delete a user", async () => {
//     const response = await request(app).delete(`/users/${createdUserId}`);

//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty(
//       "message",
//       "User deleted successfully."
//     );
//   });

//   it("should not get a user with an invalid id", async () => {
//     const response = await request(app).get("/users/invalidId");

//     expect(response.status).toBe(404);
//     expect(response.body).toHaveProperty("errors", "User not found.");
//   });
// });
