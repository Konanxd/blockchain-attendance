
import request from "supertest";
import { describe, it, expect, beforeAll } from "vitest";
import app from "../index.js";
import {prisma} from "../utils/prisma.ts";

describe("Auth API", () => {
  const user = {
    name: "name",
    email: "user@test.com",
    password: "password123",
  };

  beforeAll(async () => {
    await prisma.user.deleteMany();
  });

  it("can register", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(user);

    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  it("can login", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send(user);

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
