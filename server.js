import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*", // autoriser Next.js (localhost:3000)
  },
});

// Serveur Socket.IO
io.on("connection", (socket) => {
  console.log("Client connecté :", socket.id);

  // Un joueur rejoint une partie (ROOM)
  socket.on("rejoindre_partie", (code) => {
    socket.join(code);
    console.log(`Joueur ${socket.id} a rejoint la partie ${code}`);

    // informer l'autre joueur
    socket.to(code).emit("adversaire_rejoint");
  });

  // Un joueur joue un coup
  socket.on("jouer_coup", ({ code, grille }) => {
    console.log(`Coup joué dans ${code} -> mise à jour envoyée`);
    socket.to(code).emit("mise_a_jour_grille", grille);
  });

  socket.on("disconnect", () => {
    console.log("Client déconnecté :", socket.id);
  });
})

// Démarrage du serveur HTTP pour Socket.IO
httpServer.listen(3001, () => {
  console.log("Serveur Socket.IO : http://localhost:3001");
});
