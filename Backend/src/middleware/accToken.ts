import jwt from "jsonwebtoken";
import "dotenv/config";
import { NextFunction, Request, Response } from "express";

interface User {
  email: string;
  password: string;
  role: string;
  username: string;
}

interface validationReq extends Request {
  headers: {
    auth: string;
  };
  userData: User;
}

export const accToken = async (
  req: validationReq,
  res: Response,
  next: NextFunction
) => {
  // auth: Bearer (Token dari login)
  const { auth } = req.headers;

  if (!auth) {
    return res.status(401).json({
      message: "Missing Token",
    });
  }

  const token = (auth as string).split(" ")[1];

  const accToken = process.env.ACCESS_TOKEN;

  try {
    const decode = jwt.verify(token, accToken);

    if (typeof decode !== "string") {
      req.userData = decode as User;
    }
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  next();
};
