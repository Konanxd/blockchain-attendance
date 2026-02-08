import bcrypt from "bcrypt";
import { prisma } from "../utils/prisma.ts";
import { signToken } from "../utils/jwt.js";

class AuthService {
  async register(name, email, password) {
    const exists = await prisma.user.findUnique({
      where: { email },
    });

    if (exists) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return {
      name: user.name,
      id: user.id,
      email: user.email,
    };
  }

  async login(email, password) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    const token = signToken({
      sub: user.id,
    });

    return {
      token,
      user: {
        name: user.name,
        id: user.id,
        email: user.email,
      },
    };
  }

  async register(name, email, password) {
    const exists = await prisma.user.findUnique({
      where: { email },
    });

    if (exists) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return {
      name: user.name,
      id: user.id,
      email: user.email,
    };
  }
}

export default new AuthService();
