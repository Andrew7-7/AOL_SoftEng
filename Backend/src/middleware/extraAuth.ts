import "dotenv/config";
import { encrypt } from "../others/encrypt";
import { NextFunction, Response, Request } from "express";

export const extraAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // auth: Bearer (EXTRA_AUTH (ambil dari .env))
  const { auth } = req.headers;

  const EXTRA_AUTH = await encrypt.hashPass(process.env.EXTRA_AUTH);

  if (!auth) {
    return res.status(401).json({ message: "Missing auth Headers" });
  }

  const token = (auth as string).split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decode = await encrypt.comparePass(token, EXTRA_AUTH);
  if (!decode) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};
