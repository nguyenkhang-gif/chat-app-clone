import express, { json } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import messRouter from "./routes/message.routes.js";
import userRouter from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/message", messRouter);
app.use("/api/users", userRouter);

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`connect to server ${PORT}`);
});
