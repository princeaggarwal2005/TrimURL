import express from "express";
import urlRoutes from "./routes/url.routes.js";
import { redirectToUrl } from "./controllers/url.controller.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("URL Shortener API is running");
});

app.use("/url", urlRoutes);
app.get("/:shortId", redirectToUrl);

app.use("/auth", authRoutes);

export default app;
