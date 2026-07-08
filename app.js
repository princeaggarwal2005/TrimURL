import express from "express";
import urlRoutes from "./routes/url.routes.js";
import { redirectToUrl } from "./controllers/url.controller.js";
import authRoutes from "./routes/auth.routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";



const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>TrimURL API</title>
        <style>
          body{
            font-family: Arial, sans-serif;
            background:#111827;
            color:white;
            display:flex;
            justify-content:center;
            align-items:center;
            height:100vh;
            margin:0;
          }
          .card{
            text-align:center;
            padding:40px;
            border-radius:12px;
            background:#1f2937;
            box-shadow:0 0 20px rgba(0,0,0,.3);
          }
          h1{
            color:#60a5fa;
            margin-bottom:10px;
          }
          p{
            color:#d1d5db;
          }
          code{
            background:#374151;
            padding:4px 8px;
            border-radius:6px;
          }
        </style>
      </head>

      <body>

      <div class="card">
        <h1>🚀 TrimURL API</h1>

        <p>Production-ready URL Shortener API</p>

        <p>Status:
        <span style="color:#22c55e;">● Online</span>
        </p>

        <p>Base URL</p>

        <code>https://trimurl-x10s.onrender.com</code>

      </div>

      </body>
    </html>
  `);
});


app.use("/url", urlRoutes);
app.get("/:shortId", redirectToUrl);

app.use("/auth", authRoutes);

export default app;
