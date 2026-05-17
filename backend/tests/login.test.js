import { jest } from "@jest/globals";
import request from "supertest";
import app from "../index.js";
import userModel from "../Model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

test("should login user", async () => {
  const mockUser = {
    _id: "mockUserId",
    email: "dasun5967@gmail.com",
    password: "hashedPassword123"
  };

  jest.spyOn(userModel, "findOne").mockResolvedValue(mockUser);
  jest.spyOn(bcrypt, "compare").mockResolvedValue(true);
  jest.spyOn(jwt, "sign").mockReturnValue("mockToken123");

  const response = await request(app)
    .post("/api/auth/login")
    .send({
      email: "dasun5967@gmail.com",
      password: "Dasun123"
    });

  expect(response.statusCode).toBe(200);
  expect(response.body.token).toBe("mockToken123");
});