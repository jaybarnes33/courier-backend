import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  // You can add more user properties if needed
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET
    ) as UserPayload;
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default authMiddleware;
