import api from "../server.js"
import MockAdapter from "axios-mock-adapter";
import { login } from "../services/authService.js";
import { describe, it, expect, beforeEach } from "vitest";

const mock = new MockAdapter(api);

describe("Auth Service", () => {
  beforeEach(() => mock.reset());

  it("stores token on login", async () => {
    mock.onPost("/auth/login").reply(200, {
      token: "fake-jwt",
    });

    const res = await login("user@test.com", "password123");

    expect(localStorage.getItem("token")).toBe("fake-jwt");
    expect(res.token).toBe("fake-jwt");
  });
});
