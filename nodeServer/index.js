const express = require("express");
const app = express();
const http = require("http").createServer(app);
// const io = require('socket.io')(5006, { cors: { origin: '*', } });
const io = require("socket.io")(http);

const users = {}; // define for getting name of diff users with socket id
var port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("recieve", {
      message: message,
      name: users[socket.id],
    });
  });

  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});

app.listen(port);
