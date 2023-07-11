import { NextFunction, Request, Response } from "express";

export function errorMiddleware(
  err,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
}
