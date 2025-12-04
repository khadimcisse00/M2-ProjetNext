import { io, Socket } from "socket.io-client";

let socketClient: Socket | null = null;

export function obtenirSocketClient() {
  if (!socketClient) {
    socketClient = io("", {
      path: "/api/socket",
    });
  }
  return socketClient;
}
