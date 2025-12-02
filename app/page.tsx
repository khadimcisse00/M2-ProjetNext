export default function PageAccueil() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold text-center">
        Bienvenue sur Tic Tac Toe
      </h1>
      <p className="text-center max-w-md">
        Jouez en ligne contre vos amis, contre l&apos;ordinateur, suivez votre
        historique de parties et gérez votre profil.
      </p>
    </div>
  );
}
