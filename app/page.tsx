"use client";

export default function PageAccueil() {
  return (
    <div className="container mx-auto p-6 max-w-2xl">

      {/* Titre */}
      <h1 className="text-4xl font-extrabold mb-4 text-center text-base-content">
        Bienvenue sur Tic Tac Toe
      </h1>

      {/* Sous-titre */}
      <p className="text-center mb-10 text-lg text-base-content/80">
        Jouez en ligne contre vos amis, contre l'ordinateur, 
        suivez votre historique et gérez votre profil.
      </p>

      {/* Bloc Dashboard intégré */}
      <div className="grid gap-4">

        <a className="btn btn-neutral w-full shadow-sm hover:shadow-md transition-all">
          🎮 Créer une partie
        </a>

        <a className="btn btn-outline w-full shadow-sm hover:shadow-md transition-all">
          🔗 Rejoindre une partie
        </a>

        <a className="btn btn-accent w-full shadow-sm hover:shadow-md transition-all btn-soft">
          🤖 Jouer contre l’ordinateur
        </a>

        <a className="btn btn-info w-full shadow-sm hover:shadow-md transition-all btn-soft">
          📊 Voir l’historique
        </a>
      </div>

    </div>
  );
}
