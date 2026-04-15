import express from "express";
import { ENV } from "./config/env";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to GERAI API! 🚀 - Powered by postgrSQL, Drizzle ORM & Clerk Auth",
    endpoints: {
      users: "/api/users",
      products: "/api/products",
      comment: "/api/comments",
    },
  });
});

app.listen(ENV.PORT, () => {
  console.log(`🚀 Server is running on port ${ENV.PORT} 🚀`);
});
