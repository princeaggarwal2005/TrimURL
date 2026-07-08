import "./config/loadEnv.js";
import connectDB from "./db/connect.js";
import "./config/redis.js";
import app from "./app.js";

const port = process.env.PORT || 5000;
connectDB();

app.listen(port, () => {
    console.log(`TrimURL API started on port ${port}`);
});