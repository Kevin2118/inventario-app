export default function ConfirmDialog({ abierto, titulo, mensaje, onConfirmar, onCancelar }) {
  if (!abierto) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
        <h3 className="font-display font-semibold text-lg text-gray-900">{titulo}</h3>
        <p className="text-gray-600 text-sm mt-2">{mensaje}</p>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancelar}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            className="px-4 py-2 text-sm font-medium text-white bg-[#C4463A] hover:bg-[#a83a30] rounded-lg transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}