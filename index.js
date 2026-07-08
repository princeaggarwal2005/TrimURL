import "./config/loadEnv.js";
import connectDB from "./db/connect.js";
import "./config/redis.js";
import app from "./app.js";

const port = process.env.PORT || 5000;
connectDB();

app.listen(port, () => {
    console.log(`URL Shorter API is running on port ${port}`);
    console.log(`http://localhost:${port}`);
});