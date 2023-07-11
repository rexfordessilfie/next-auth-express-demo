import { Request, Router } from "express";
import NextAuth, { NextAuthOptions } from "next-auth";

/** Parse path to provide slug similar to Next.js's dynamic routes' "Catch-all Segments".
 *
 * @link https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes#catch-all-segments
 * @example
 *
 * parsePathSegments("/api/auth", "/api/auth/signin")  => ["signin"]
 * parsePathSegments("/api/auth", "/api/auth/signin/github") => ["signin", "github"], etc.
 * */
function parsePathSegments(basePath: string, path: string) {
  return path
    .replace(new RegExp(`^${basePath}\/?`), "") // Remove base path
    .replace(/\?.*$/, "") // Remove query parameters
    .split("/"); // Split into array
}

/**
 * Returns an Express router which handles requests for NextAuth.
 *
 * Requires:
 * 1. a body parser middleware that populates `req.body` e.g `app.use(express.json())`
 * 2. a cookie parser middleware that populates `req.cookie` e.g `app.use(cookieParser()`
 * 3. a urlencoded parser middleware that populates `req.query` e.g `app.use(express.urlencoded({extended: true}))`
 */
export function nextAuthRouter(options: {
  authOptions: NextAuthOptions | ((req: Request) => NextAuthOptions);
  /** Required to parse the path slug similarly to what is done for Next.js [...nextauth].ts route in file-based routing */
  basePath: string;
}) {
  const router = Router();

  const { basePath, authOptions } = options;

  router.use(`${basePath}/*`, async (req, res) => {
    // Parse and fill in `req.query` from the path to simulate
    // slug provided by Next.js in file-based routing for [...nextauth].ts file.
    req.query.nextauth = parsePathSegments(basePath, req.originalUrl);

    await NextAuth(
      req,
      res,
      typeof authOptions === "function" ? authOptions(req) : authOptions
    );
  });

  return router;
}
