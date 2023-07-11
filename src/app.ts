import express, { Response } from "express";
import cookieParser from "cookie-parser";
import { nextAuthRouter, usersRouter } from "./routes";
import { authOptions } from "./config";
import { errorMiddleware } from "./middleware";

const app = express();

app.use(express.urlencoded({ extended: true }));

// Parses request body into the `req.body` property
app.use(express.json());

// Parses request cookies into the `req.cookie` property
app.use(cookieParser());

// Using the `nextAuthRouter` at the provided `basePath`
app.use(
  nextAuthRouter({
    basePath: "/api/auth",
    authOptions,
  })
);

app.use("/api/users", usersRouter);

app.use("/", (_req, res: Response) => {
  res.send(
    `
  <h1>Welcome to NextAuth + Express Demo!</h1>
  <ol>
    <li>Sign in at <a href="/api/auth/signin">/api/auth/signin</a> </li>
    <li>Sign out at <a href="/api/auth/signout">/api/auth/signout</a> </li>
    <li>Access the current user at <a href="/api/users/me">/api/users/me</a> </li>
  </ol>
`
  );
});

app.use(errorMiddleware);

export { app };
