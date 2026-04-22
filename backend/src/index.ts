import express from "express";
import cors from "cors";

import { ENV } from "./config/env";
import { clerkMiddleware } from "@clerk/express";

import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import commentRoutes from "./routes/commentRoutes";

const app = express();

app.use(cors({ origin: ENV.FRONTEND_URL, credentials: true }));

app.use(clerkMiddleware()); // auth obj will be attached to the req
app.use(express.json()); // parse JSON req body
app.use(express.urlencoded({ extended: true })); // parses form data (like HTML forms)

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

(app.use("/api/users", userRoutes),
  app.use("/api/comments", commentRoutes),
  app.use("/api/products", productRoutes),
  app.listen(ENV.PORT, () => {
    console.log(`🚀 Server is running on port ${ENV.PORT} 🚀`);
  }));
