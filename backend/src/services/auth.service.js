import bcrypt from "bcrypt";
import { prisma } from "../utils/prisma.ts";
import { signToken } from "../utils/jwt.js";


class AuthService {
  async register(name, email, password, role = "USER") {
    const exists = await prisma.user.findUnique({
      where: { email },
    });

    if (exists) throw new Error("Email already registered");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        role: role,
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  async login(email, password) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new Error("Invalid credentials");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Invalid credentials");

    const token = signToken({
      id: user.id,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || "USER",
      },
    };
  }
}

export default new AuthService();
