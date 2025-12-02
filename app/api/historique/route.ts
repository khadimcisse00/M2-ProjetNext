import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { recupererUtilisateurConnecte } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const utilisateur = await recupererUtilisateurConnecte();
  if (!utilisateur) {
    return NextResponse.json(
      { message: "Non connecté" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const idPartie = searchParams.get("id");

  if (idPartie) {
    const partie = await prisma.partie.findFirst({
      where: { id: Number(idPartie) },
      include: {
        gagnant: true,
        joueurX: true,
        joueurO: true,
      },
    });
    if (!partie) {
      return NextResponse.json(
        { message: "Partie introuvable" },
        { status: 404 }
      );
    }
    return NextResponse.json({ partie });
  }

  const parties = await prisma.partie.findMany({
    where: {
      OR: [
        { joueurXId: utilisateur.id },
        { joueurOId: utilisateur.id },
      ],
    },
    orderBy: { creeLe: "desc" },
    include: {
      gagnant: true,
    },
  });

  const resultat = parties.map((p) => ({
    id: p.id,
    code: p.code,
    typePartie: p.typePartie,
    niveauIA: p.niveauIA,
    gagnant: p.gagnant ? p.gagnant.pseudo : p.estNulle ? "Égalité" : null,
    date: p.creeLe,
  }));

  return NextResponse.json({ parties: resultat });
}
