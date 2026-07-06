import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let count = 0;

app.get("/", (req, res) => {
  console.log("hello!");
  res.send("<h1>hello world!</h1>");
});

app.get("/count", (req, res) => {
  res.send(count);
});

io.on("connection", (socket) => {
  count++;
  socket.on("message", (message) => {
    io.emit("message", message);
  });
  socket.on("disconnect", (reason) => {
    console.log(socket.id + " connection closed. reason: " + reason);
    count--;
  });
});

server.listen(3001, () => {
  console.log("Running on port 3001");
});
