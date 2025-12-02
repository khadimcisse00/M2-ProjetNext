"use client";

type Props = {
  ouvert: boolean;
  message: string;
  onFermer: () => void;
};

export function ModalFinPartie({ ouvert, message, onFermer }: Props) {
  if (!ouvert) return null;
  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Fin de la partie</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <button className="btn btn-primary" onClick={onFermer}>
            Fermer
          </button>
        </div>
      </div>
    </dialog>
  );
}
