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
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>TrimURL API</title>

<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    font-family:Arial,Helvetica,sans-serif;
    background:linear-gradient(135deg,#111827,#1f2937);
    color:white;
    display:flex;
    justify-content:center;
    align-items:center;
    min-height:100vh;
}

.card{
    width:700px;
    max-width:90%;
    background:#1f2937;
    border-radius:18px;
    padding:45px;
    text-align:center;
    box-shadow:0 15px 40px rgba(0,0,0,.35);
}

h1{
    color:#60a5fa;
    font-size:42px;
    margin-bottom:12px;
}

.subtitle{
    color:#d1d5db;
    font-size:18px;
    margin-bottom:28px;
    line-height:1.6;
}

.status{
    margin:20px 0;
    font-size:18px;
}

.online{
    color:#22c55e;
    font-weight:bold;
}

.features{
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
    gap:12px;
    margin:30px 0;
}

.feature{
    background:#374151;
    padding:10px 18px;
    border-radius:8px;
    font-size:15px;
}

.code{
    background:#111827;
    padding:14px;
    border-radius:8px;
    color:#93c5fd;
    margin:25px 0;
    word-break:break-all;
}

.buttons{
    margin-top:30px;
}

.btn{
    display:inline-block;
    text-decoration:none;
    padding:13px 24px;
    margin:8px;
    border-radius:8px;
    font-weight:bold;
    transition:.25s;
}

.primary{
    background:#2563eb;
    color:white;
}

.primary:hover{
    background:#1d4ed8;
}

.secondary{
    background:#374151;
    color:white;
}

.secondary:hover{
    background:#4b5563;
}

.footer{
    margin-top:35px;
    color:#9ca3af;
    font-size:14px;
    line-height:1.7;
}

</style>

</head>

<body>

<div class="card">

<h1>🚀 TrimURL API</h1>

<p class="subtitle">
Production-ready URL shortening API built with
<strong>Node.js</strong>,
<strong>Express</strong>,
<strong>MongoDB Atlas</strong>,
<strong>Redis</strong> &
<strong>JWT Authentication</strong>.
</p>

<div class="status">
Status:
<span class="online">● Online</span>
</div>

<div class="features">
<div class="feature">🔗 Custom URLs</div>
<div class="feature">⚡ Redis Cache</div>
<div class="feature">📊 Analytics</div>
<div class="feature">🔐 JWT Auth</div>
<div class="feature">🛡 Rate Limiting</div>
</div>

<p>Base URL</p>

<div class="code">
https://trimurl-x10s.onrender.com
</div>

<div class="buttons">

<a
class="btn primary"
href="https://trimurl-x10s.onrender.com/api-docs/"
target="_blank">
🧪 Try it Yourself
</a>

<a
class="btn secondary"
href="https://trimurl-x10s.onrender.com/api-docs"
target="_blank">
📖 API Docs
</a>

<a
class="btn secondary"
href="https://github.com/princeaggarwal2005/TrimURL"
target="_blank">
⭐ GitHub
</a>

</div>

<div class="footer">
Interactive Swagger documentation available.<br>
Click <strong>"Try it Yourself"</strong> to create and test API requests directly from your browser.
</div>

</div>

</body>
</html>
`);
});

app.use("/url", urlRoutes);
app.get("/:shortId", redirectToUrl);

app.use("/auth", authRoutes);

export default app;
