const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const uuid = require("uuid");
const { send } = require("process");
const pgp = require("pg-promise")(/* options */);

const app = express();
const db = pgp("postgresql://postgres:postgres@localhost:5432/chat");

// db.one("SELECT $1 AS value", 123)
//   .then((data) => {
//     console.log("DATA:", data.value);
//   })
//   .catch((error) => {
//     console.log("ERROR:", error);
//   });

app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
// io.use(async (socket, next) => {
//   try {
//     socket.user = "john";
//   } catch (e) {
//     console.log("error happened");
//   }
// });

io.on("connection", (socket) => {
  // console.log("initial transport", socket.conn.transport.name); // prints "polling"

  // console.log("hello");
  // socket.on("disconnecting", (reason) => {
  //   console.log(reason);
  // });
  // console.log(socket.user, "user is here");
  socket.on("send_message", (msg, sender, reciver) => {
    io.sockets.emit("hi", `everyone ${sender}`);
    io.sockets.emit("jeevan", "jeevan");
    console.log(msg, sender, reciver);
    socket.broadcast.emit("recive_message", msg, sender, reciver);
  });
});

httpServer.listen(8000);
