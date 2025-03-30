import { verify } from "hono/jwt";
import { MiddlewareHandler } from "hono";

// Authentication Middleware
export const authMiddleware: MiddlewareHandler = async (c, next) => {
  try {
    const authHeader = c.req.header("Authorization") || "";
    const token = authHeader.split(" ")[1];

    if (!token) {
      return c.json({ message: "Unauthorized access: No token provided" }, 401);
    }

    const decoded = await verify(token, "secret");
    if (!decoded) {
      return c.json({ message: "Unauthorized access: Invalid token" }, 401);
    }

    // Attach user info to context (optional)
    c.set("userid",decoded);
    await next();
  } catch (error) {
    return c.json({ message: "Unauthorized access" }, 401);
  }
};
