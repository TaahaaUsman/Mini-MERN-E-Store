import express from "express";
import { configDotenv } from "dotenv";
configDotenv();
import cors from "cors";
import path from "path";
import connectDB from "./config/db_connection.js";
import appRouter from "./routes/appRouter.js";

const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api", appRouter);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(port, () => {
  connectDB();
  console.log(`Application is running at http://localhost:${port}`);
});
