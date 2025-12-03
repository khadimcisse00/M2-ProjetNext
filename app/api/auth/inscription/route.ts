import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hacherMotDePasse } from "@/lib/auth";
import { envoyerEmailVerification } from "@/lib/email";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    // Récupération des données envoyées par le frontend
    const { nom, prenom, email, pseudo, motDePasse, avatar } =
      await req.json();

    // Vérification des champs obligatoires
    if (!nom || !prenom || !email || !pseudo || !motDePasse || !avatar) {
      return NextResponse.json(
        { message: "Champs manquants" },
        { status: 400 }
      );
    }

    // Vérification email déjà existant
    const deja = await prisma.utilisateur.findUnique({
      where: { email },
    });

    if (deja) {
      return NextResponse.json(
        {
          message: "Un compte existe déjà avec cet email.",
          code: "EMAIL_EXISTE",
        },
        { status: 400 }
      );
    }

    // Hash du mot de passe
    const hash = await hacherMotDePasse(motDePasse);

    // Création de l'utilisateur non vérifié
    const utilisateur = await prisma.utilisateur.create({
      data: {
        nom,
        prenom,
        email,
        pseudo,
        motDePasse: hash, // ⚠️ correspond au champ du schema Prisma
        avatar,
        estVerifie: false,
      },
    });

    // Génération du token
    const valeur = crypto.randomBytes(32).toString("hex");
    const expire = new Date();
    expire.setHours(expire.getHours() + 24);

    await prisma.token.create({
      data: {
        type: "VERIFICATION",
        valeur,
        utilisateurId: utilisateur.id,
        expireLe: expire,
      },
    });

    // Lien de vérification
    const baseUrl = process.env.NEXT_PUBLIC_URL!;
    const lien = `${baseUrl}/api/auth/verifier?token=${valeur}`;

    // Envoi email de vérification (via RESEND)
    await envoyerEmailVerification(
      utilisateur.email,
      utilisateur.nom,
      utilisateur.prenom,
      lien
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("ERREUR INSCRIPTION :", error);

    return NextResponse.json(
      {
        message:
          "Une erreur est survenue lors de l'inscription. Réessayez plus tard.",
      },
      { status: 500 }
    );
  }
}
