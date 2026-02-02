import prisma from "../../prisma/generated/client";

export function operatorAuth(requiredRole = null) {
  return async (req, res, next) => {
    try {
      const apiKey = req.headers["x-api-key"];

      if (!apiKey) {
        return res.status(401).json({
          error: "API key required!",
        });
      }

      const operator = await prisma.operator.findUnique({
        where: { apiKey },
      });

      if (!operator) {
        return res.status(401).json({
          error: "Invalid API key!",
        });
      }

      if (requiredRole && operator.role !== requiredRole) {
        return res.status(403).json({
          error: "Insufficient permissions!",
        });
      }

      req.operator = operator;

      next();
    } catch (error) {
      console.error("Operator auth error: ", error);
      return res.status(500).json({
        error: "Authentication failed",
      });
    }
  };
}
