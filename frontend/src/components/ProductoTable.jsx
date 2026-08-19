import StockBadge from './StockBadge';

export default function ProductoTable({ productos, onEditar, onEliminar }) {
  if (productos.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
        <p className="font-display text-lg text-gray-700">Sin productos todavía</p>
        <p className="text-gray-500 text-sm mt-1">Crea el primero con el botón de arriba.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Producto</th>
            <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Categoría</th>
            <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Proveedor</th>
            <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Precio</th>
            <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Stock</th>
            <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
              <td className="px-5 py-4">
                <div className="font-display font-medium text-gray-900">{producto.nombre}</div>
                <div className="font-mono-sku text-xs text-gray-500 mt-0.5">{producto.sku}</div>
              </td>
              <td className="px-5 py-4 text-sm text-gray-600">{producto.categoria?.nombre}</td>
              <td className="px-5 py-4 text-sm text-gray-600">{producto.proveedor?.nombre}</td>
              <td className="px-5 py-4 text-sm font-medium text-gray-900">
                S/ {Number(producto.precio).toFixed(2)}
              </td>
              <td className="px-5 py-4">
                <StockBadge stock={producto.stock} />
              </td>
              <td className="px-5 py-4 text-right">
                <button
                  onClick={() => onEditar(producto)}
                  className="text-sm font-medium text-[#2A3FA0] hover:underline mr-4"
                >
                  Editar
                </button>
                <button
                  onClick={() => onEliminar(producto)}
                  className="text-sm font-medium text-[#C4463A] hover:underline"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}