import { useState, useEffect } from 'react';

const vacio = {
  nombre: '',
  sku: '',
  precio: '',
  stock: '',
  categoriaId: '',
  proveedorId: '',
};

export default function ProductoForm({
  abierto,
  productoEditando,
  categorias,
  proveedores,
  onGuardar,
  onCerrar,
  onCrearCategoria,
  onCrearProveedor,
}) {
  const [datos, setDatos] = useState(vacio);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  const [mostrarNuevaCategoria, setMostrarNuevaCategoria] = useState(false);
  const [nombreNuevaCategoria, setNombreNuevaCategoria] = useState('');

  const [mostrarNuevoProveedor, setMostrarNuevoProveedor] = useState(false);
  const [nombreNuevoProveedor, setNombreNuevoProveedor] = useState('');

  useEffect(() => {
    if (productoEditando) {
      setDatos({
        nombre: productoEditando.nombre,
        sku: productoEditando.sku,
        precio: productoEditando.precio,
        stock: productoEditando.stock,
        categoriaId: productoEditando.categoriaId,
        proveedorId: productoEditando.proveedorId,
      });
    } else {
      setDatos(vacio);
    }
    setError(null);
    setMostrarNuevaCategoria(false);
    setMostrarNuevoProveedor(false);
  }, [productoEditando, abierto]);

  if (!abierto) return null;

  function actualizarCampo(campo, valor) {
    setDatos((prev) => ({ ...prev, [campo]: valor }));
  }

  async function manejarCrearCategoria() {
    if (!nombreNuevaCategoria.trim()) return;
    try {
      const nueva = await onCrearCategoria({ nombre: nombreNuevaCategoria.trim() });
      actualizarCampo('categoriaId', nueva.id);
      setNombreNuevaCategoria('');
      setMostrarNuevaCategoria(false);
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo crear la categoría');
    }
  }

  async function manejarCrearProveedor() {
    if (!nombreNuevoProveedor.trim()) return;
    try {
      const nuevo = await onCrearProveedor({ nombre: nombreNuevoProveedor.trim() });
      actualizarCampo('proveedorId', nuevo.id);
      setNombreNuevoProveedor('');
      setMostrarNuevoProveedor(false);
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo crear el proveedor');
    }
  }

  async function manejarSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!datos.nombre || !datos.sku || !datos.precio || !datos.categoriaId || !datos.proveedorId) {
      setError('Completa todos los campos requeridos.');
      return;
    }

    try {
      setGuardando(true);
      await onGuardar(datos);
      onCerrar();
    } catch (err) {
      setError(err.response?.data?.error || 'Ocurrió un error al guardar.');
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <h3 className="font-display font-semibold text-lg text-gray-900 mb-5">
          {productoEditando ? 'Editar producto' : 'Nuevo producto'}
        </h3>

        <form onSubmit={manejarSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              value={datos.nombre}
              onChange={(e) => actualizarCampo('nombre', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A3FA0]"
              placeholder="Ej. Samsung Galaxy A54"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
            <input
              type="text"
              value={datos.sku}
              onChange={(e) => actualizarCampo('sku', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A3FA0] font-mono-sku text-sm"
              placeholder="Ej. SGA54-001"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Precio (S/)</label>
              <input
                type="number"
                step="0.01"
                value={datos.precio}
                onChange={(e) => actualizarCampo('precio', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A3FA0]"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
              <input
                type="number"
                value={datos.stock}
                onChange={(e) => actualizarCampo('stock', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A3FA0]"
                placeholder="0"
              />
            </div>
          </div>

          {/* Categoría */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">Categoría</label>
              <button
                type="button"
                onClick={() => setMostrarNuevaCategoria((v) => !v)}
                className="text-xs font-medium text-[#2A3FA0] hover:underline"
              >
                {mostrarNuevaCategoria ? 'Cancelar' : '+ Nueva categoría'}
              </button>
            </div>

            {mostrarNuevaCategoria ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={nombreNuevaCategoria}
                  onChange={(e) => setNombreNuevaCategoria(e.target.value)}
                  placeholder="Nombre de la categoría"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A3FA0]"
                />
                <button
                  type="button"
                  onClick={manejarCrearCategoria}
                  className="px-3 py-2 text-sm font-medium text-white bg-[#2A3FA0] hover:bg-[#22337f] rounded-lg transition-colors"
                >
                  Crear
                </button>
              </div>
            ) : (
              <select
                value={datos.categoriaId}
                onChange={(e) => actualizarCampo('categoriaId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A3FA0] bg-white"
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map((c) => (
                  <option key={c.id} value={c.id}>{c.nombre}</option>
                ))}
              </select>
            )}
          </div>

          {/* Proveedor */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">Proveedor</label>
              <button
                type="button"
                onClick={() => setMostrarNuevoProveedor((v) => !v)}
                className="text-xs font-medium text-[#2A3FA0] hover:underline"
              >
                {mostrarNuevoProveedor ? 'Cancelar' : '+ Nuevo proveedor'}
              </button>
            </div>

            {mostrarNuevoProveedor ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={nombreNuevoProveedor}
                  onChange={(e) => setNombreNuevoProveedor(e.target.value)}
                  placeholder="Nombre del proveedor"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A3FA0]"
                />
                <button
                  type="button"
                  onClick={manejarCrearProveedor}
                  className="px-3 py-2 text-sm font-medium text-white bg-[#2A3FA0] hover:bg-[#22337f] rounded-lg transition-colors"
                >
                  Crear
                </button>
              </div>
            ) : (
              <select
                value={datos.proveedorId}
                onChange={(e) => actualizarCampo('proveedorId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A3FA0] bg-white"
              >
                <option value="">Selecciona un proveedor</option>
                {proveedores.map((p) => (
                  <option key={p.id} value={p.id}>{p.nombre}</option>
                ))}
              </select>
            )}
          </div>

          {error && (
            <p className="text-sm text-[#C4463A] bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCerrar}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={guardando}
              className="px-4 py-2 text-sm font-medium text-white bg-[#2A3FA0] hover:bg-[#22337f] rounded-lg transition-colors disabled:opacity-50"
            >
              {guardando ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}