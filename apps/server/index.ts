import httpServer from "./app";
import Redis from "ioredis";
export const redis = new Redis(); // default localhost:6379
import "dotenv/config";
import { configDotenv } from "dotenv";
import { connectDB } from "./database";

const now = new Date();

configDotenv({
  path: "./.env",
});

const PORT = process.env.PORT;

connectDB().then(() => {
  httpServer.listen(PORT, () => {
    console.log(
      "Server is running on port :",
      PORT,
      `\n Date : ${now.toLocaleDateString()} \n Time : ${now.toLocaleTimeString()}`
    );
  });
});
