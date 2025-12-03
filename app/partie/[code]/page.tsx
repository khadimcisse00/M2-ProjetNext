"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GrilleTicTacToe } from "@/components/GrilleTicTacToe";
import { ModalFinPartie } from "@/components/ModalFinPartie";
import {
  Grille,
  Symbole,
  creerGrilleInitiale,
  verifierVictoire,
  estMatchNul,
  jouerCoup,
} from "@/lib/tictactoe";
import { obtenirSocketClient } from "@/lib/socket";

export default function PagePartie() {
  const { code } = useParams() as { code: string };
  const [grille, setGrille] = useState<Grille>(creerGrilleInitiale);
  const [joueurCourant, setJoueurCourant] = useState<Symbole>("X");
  const [messageEtat, setMessageEtat] = useState("En attente d'un joueur...");
  const [fin, setFin] = useState(false);
  const [messageFin, setMessageFin] = useState("");
  const [socketPret, setSocketPret] = useState(false);

  useEffect(() => {
    const socket = obtenirSocketClient();

    socket.emit("rejoindre_partie", code);
    setMessageEtat("En attente d'un joueur");

    socket.on("joueur_rejoint", () => {
      setMessageEtat("Un adversaire vous a rejoint");
    });

    socket.on("maj_grille", (donnees) => {
      setGrille(donnees.grille);
      setJoueurCourant(donnees.joueurCourant);
    });

    socket.on("fin_partie", (donnees) => {
      setFin(true);
      if (donnees.estNulle) {
        setMessageFin("Match nul");
      } else {
        setMessageFin(`Le gagnant est : ${donnees.gagnant}`);
      }
    });

    setSocketPret(true);

    return () => {
      socket.off("joueur_rejoint");
      socket.off("maj_grille");
      socket.off("fin_partie");
    };
  }, [code]);

  function traiterClicCase(indice: number) {
    if (fin || !socketPret) return;
    if (grille[indice] !== "_") return;

    const nouvelleGrille = jouerCoup(grille, indice, joueurCourant);
    const prochain = joueurCourant === "X" ? "O" : "X";
    setGrille(nouvelleGrille);
    setJoueurCourant(prochain);

    const socket = obtenirSocketClient();
    socket.emit("jouer_coup", {
      code,
      grille: nouvelleGrille,
      joueurCourant: prochain,
    });

    const gagnant = verifierVictoire(nouvelleGrille);
    const nul = estMatchNul(nouvelleGrille);

    if (gagnant || nul) {
      setFin(true);
      const message = gagnant ? `Le gagnant est : ${gagnant}` : "Match nul";
      setMessageFin(message);
      socket.emit("fin_partie", {
        code,
        gagnant,
        estNulle: nul,
      });

      fetch("/api/parties/mise-a-jour", {
        method: "POST",
        body: JSON.stringify({
          code,
          grille: nouvelleGrille,
          gagnant,
          estNulle: nul,
        }),
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  function fermerModal() {
    setFin(false);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">Partie : {code}</h1>
      <p>{messageEtat}</p>
      <GrilleTicTacToe
        grille={grille}
        joueurCourant={joueurCourant}
        desactive={fin}
        onClicCase={traiterClicCase}
      />
      <ModalFinPartie
        ouvert={fin}
        message={messageFin}
        onFermer={fermerModal}
      />
    </div>
  );
}
