import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Client connecté :", socket.id);

  socket.on("jouer-coup", (data) => {
    socket.broadcast.emit("coup-joué", data);
  });

  socket.on("disconnect", () => {
    console.log("Déconnecté :", socket.id);
  });
});

httpServer.listen(3001, () => {
  console.log("Socket.IO serveur sur http://localhost:3000");
});
