import { jest } from "@jest/globals";
import request from "supertest";
import app from "../index.js";
import jobRequestModel from "../Model/jobRequestModel.js";
import jwt from "jsonwebtoken";

describe("Job API", () => {
  test("GET all jobs should return 200", async () => {
    jest.spyOn(jobRequestModel, "find").mockResolvedValue([]);

    const response = await request(app).get("/api/jobs");

    expect(response.statusCode).toBe(200);
    expect(response.body.allJobs).toEqual([]);
  });

  test("GET /myposts should return my posted jobs", async () => {
    const mockJobs = [{ title: "My Job Post", userId: "mockUserId" }];
    jest.spyOn(jobRequestModel, "find").mockResolvedValue(mockJobs);
    jest.spyOn(jwt, "verify").mockReturnValue({ id: "mockUserId" });

    const response = await request(app)
      .get("/api/jobs/myposts")
      .set("Authorization", "Bearer mockToken123");

    expect(response.statusCode).toBe(200);
    expect(response.body.allJobs).toEqual(mockJobs);
  });
});