//env vars
import { config } from "dotenv";
config();

import express from "express";

import driverRoutes from "./driver/Driver.routes";
import authRoutes from "./auth/Auth.routes";
import requestRoutes from "./requests/Request.routes";
import userRoutes from "./user/User.routes";
import connectDB from "./config/db";
import { WebSocketManager } from "./SocketClass";
import { Server } from "socket.io";
import { createServer } from "http";
import morgan from "morgan";

const app = express();

const server = createServer(app);
const io = new Server(server);

// Create an instance of the WebSocketManager and pass the io instance to it
export const webSocketManager = new WebSocketManager(io);

app.use(express.json());
app.use(morgan("dev"));

//connect Database
connectDB();

//Mount routes
app.use("/api/drivers", driverRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/requests", requestRoutes);
// app.use("/api/packages", packageRoutes);
server.listen(process.env.PORT, () => {
  console.log("Server running on", process.env.PORT);
});
