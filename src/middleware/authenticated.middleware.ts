import { getServerSession } from "next-auth";
import { NextFunction, Request, Response } from "express";
import { authOptions } from "../config";

export async function authenticatedUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const session = await getServerSession(req, res, authOptions);
  if (session?.user) {
    res.locals.user = session.user;
    next();
  } else {
    res.status(403).send("Unauthorized! You need to log in first.");
  }
}
