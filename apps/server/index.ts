import httpServer from "./app";
import { configDotenv } from "dotenv";

const now = new Date();

configDotenv({
  path: "./.env",
});

const PORT = process.env.PORT;

const Server = () => {
  httpServer.listen(PORT, () => {
    console.log(
      "Server is running on port :",
      PORT,
      `\n Date : ${now.toLocaleDateString()} \n Time : ${now.toLocaleTimeString()}`
    );
  });
};

Server();
