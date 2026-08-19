import { useState } from 'react';
import { useProductos } from '../hooks/useProductos';
import { useCategorias } from '../hooks/useCategorias';
import { useProveedores } from '../hooks/useProveedores';
import ProductoTable from '../components/ProductoTable';
import ProductoForm from '../components/ProductoForm';
import ConfirmDialog from '../components/ConfirmDialog';

export default function ProductosPage() {
  const { productos, cargando, error, crearProducto, actualizarProducto, eliminarProducto } = useProductos();
  const { categorias, crearCategoria } = useCategorias();
  const { proveedores, crearProveedor } = useProveedores();

  const [formAbierto, setFormAbierto] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  function abrirCrear() {
    setProductoEditando(null);
    setFormAbierto(true);
  }

  function abrirEditar(producto) {
    setProductoEditando(producto);
    setFormAbierto(true);
  }

  async function guardarProducto(datos) {
    if (productoEditando) {
      await actualizarProducto(productoEditando.id, datos);
    } else {
      await crearProducto(datos);
    }
  }

  async function confirmarEliminar() {
    await eliminarProducto(productoAEliminar.id);
    setProductoAEliminar(null);
  }

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-bold text-2xl text-gray-900">Inventario</h1>
            <p className="text-gray-500 text-sm mt-1">Gestiona tus productos, categorías y proveedores.</p>
          </div>
          <button
            onClick={abrirCrear}
            className="px-4 py-2.5 text-sm font-medium text-white bg-[#2A3FA0] hover:bg-[#22337f] rounded-lg transition-colors"
          >
            + Nuevo producto
          </button>
        </div>

        {cargando && <p className="text-gray-500 text-sm">Cargando productos...</p>}
        {error && <p className="text-[#C4463A] text-sm">{error}</p>}

        {!cargando && !error && (
          <ProductoTable
            productos={productos}
            onEditar={abrirEditar}
            onEliminar={(producto) => setProductoAEliminar(producto)}
          />
        )}
      </div>

      <ProductoForm
        abierto={formAbierto}
        productoEditando={productoEditando}
        categorias={categorias}
        proveedores={proveedores}
        onGuardar={guardarProducto}
        onCerrar={() => setFormAbierto(false)}
        onCrearCategoria={crearCategoria}
        onCrearProveedor={crearProveedor}
      />

      <ConfirmDialog
        abierto={!!productoAEliminar}
        titulo="Eliminar producto"
        mensaje={`¿Seguro que quieres eliminar "${productoAEliminar?.nombre}"? Esta acción no se puede deshacer.`}
        onConfirmar={confirmarEliminar}
        onCancelar={() => setProductoAEliminar(null)}
      />
    </div>
  );
}