import type { NextApiRequest, NextApiResponse } from "next";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import type { Socket as NetSocket } from "net";

export const config = {
  api: {
    bodyParser: false,
  },
};

interface ResAvecSocket extends NextApiResponse {
  socket: NetSocket & {
    server: HttpServer & {
      io?: IOServer;
    };
  };
}

export default function gestionnaireSocket(
  req: NextApiRequest,
  res: ResAvecSocket
) {
  if (!res.socket.server.io) {
    const io = new IOServer(res.socket.server, {
      path: "/api/socket",
      cors: {
        origin: "*",
      },
    });

    io.on("connection", (socket) => {
      socket.on("rejoindre_partie", (code) => {
        socket.join(code);
        io.to(code).emit("joueur_rejoint");
      });

      socket.on("jouer_coup", (donnees) => {
        const { code, grille, joueurCourant } = donnees;
        socket.to(code).emit("maj_grille", { grille, joueurCourant });
      });

      socket.on("fin_partie", (donnees) => {
        const { code, gagnant, estNulle } = donnees;
        io.to(code).emit("fin_partie", { gagnant, estNulle });
      });
    });

    res.socket.server.io = io;
  }
  res.end();
}
