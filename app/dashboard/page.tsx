"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PageDashboard() {
  const [codePartieRejoindre, setCodePartieRejoindre] = useState("");
  const router = useRouter();

  async function creerPartie() {
    const res = await fetch("/api/parties/creer", {
      method: "POST",
    });
    const data = await res.json();
    if (res.ok) {
      router.push(`/partie/${data.code}`);
    }
  }

  function rejoindrePartie() {
    if (!codePartieRejoindre) return;
    router.push(`/partie/${codePartieRejoindre}`);
  }

  function jouerContreOrdinateur() {
    router.push("/ordinateur");
  }

  function voirHistorique() {
    router.push("/historique");
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Créer une partie</h2>
          <p>Générez un code et invitez un ami.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={creerPartie}>
              Créer
            </button>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Rejoindre une partie</h2>
          <input
            className="input input-bordered w-full"
            placeholder="Code de partie"
            value={codePartieRejoindre}
            onChange={(e) => setCodePartieRejoindre(e.target.value)}
          />
          <div className="card-actions justify-end">
            <button className="btn btn-secondary" onClick={rejoindrePartie}>
              Rejoindre
            </button>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Jouer contre ordinateur</h2>
          <p>Choisissez un niveau de difficulté et jouez.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-accent" onClick={jouerContreOrdinateur}>
              Jouer
            </button>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Historique</h2>
          <p>Consultez vos parties passées.</p>
          <div className="card-actions justify-end">
            <button className="btn" onClick={voirHistorique}>
              Voir l&apos;historique
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
