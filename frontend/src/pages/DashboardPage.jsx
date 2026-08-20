import { useDashboard } from '../hooks/useDashboard';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function TarjetaKPI({ titulo, valor, destacado }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <p className="text-gray-500 text-sm">{titulo}</p>
      <p
        className={`text-2xl font-bold mt-1 ${
          destacado ? 'text-[#C4463A]' : 'text-[#3D2622]'
        }`}
      >
        {valor}
      </p>
    </div>
  );
}

export default function DashboardPage() {
  const { datos, cargando, error } = useDashboard();

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="font-display font-bold text-2xl text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            Resumen general de tu inventario.
          </p>
        </div>

        {cargando && <p className="text-gray-500 text-sm">Cargando métricas...</p>}
        {error && <p className="text-[#C4463A] text-sm">{error}</p>}

        {!cargando && !error && datos && (
          <>
            {/* Tarjetas KPI */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <TarjetaKPI
                titulo="Valor total de inventario"
                valor={`S/ ${datos.resumen.valorTotalInventario.toFixed(2)}`}
              />
              <TarjetaKPI
                titulo="Total de productos"
                valor={datos.resumen.totalProductos}
              />
              <TarjetaKPI
                titulo="Productos con stock bajo"
                valor={datos.resumen.productosStockBajo}
                destacado={datos.resumen.productosStockBajo > 0}
              />
              <TarjetaKPI
                titulo="Proveedores"
                valor={datos.resumen.totalProveedores}
              />
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h2 className="font-medium text-gray-900 mb-4">Productos por categoría</h2>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={datos.productosPorCategoria}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="nombre" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="cantidad" fill="#2A3FA0" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h2 className="font-medium text-gray-900 mb-4">Valor por proveedor</h2>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={datos.valorPorProveedor}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="nombre" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(v) => `S/ ${v.toFixed(2)}`} />
                    <Bar dataKey="valor" fill="#D9AFA3" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Tabla de stock bajo */}
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h2 className="font-medium text-gray-900 mb-4">Productos con menor stock</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 text-xs uppercase">
                    <th className="pb-2">Producto</th>
                    <th className="pb-2">SKU</th>
                    <th className="pb-2">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {datos.productosBajoStock.map((p) => (
                    <tr key={p.sku} className="border-t border-gray-100">
                      <td className="py-2 text-[#3D2622]">{p.nombre}</td>
                      <td className="py-2 text-gray-500">{p.sku}</td>
                      <td className="py-2">{p.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}