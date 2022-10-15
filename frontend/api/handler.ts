import type { Handler } from "vite-plugin-mix";

export const handler: Handler = (req, res, next) => {
  if (req.path === "/hello") {
    return res.end(JSON.stringify({ data: "hello" }));
  }
  next();
};
