import express from "express";
import http from "http";
import socketio from "socket.io";
import path from "path";

const PORT = process.env.PORT || 3000;
const app = express();
const server = new http.Server(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'client')));

io.on('connection', (socket) => {
  console.log(`${socket.id} has connected!`);
  socket.send(`Hello ${socket.id}!`);

  socket.on('disconnect', () => {
    console.log(`${socket.id} has disconnected`);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log('Connect with \x1b[36m%s\x1b[0m', `http://localhost:${PORT}/`);
});