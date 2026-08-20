const prisma = require('../lib/prisma');

// GET /api/dashboard - metricas generales
async function obtenerMetricas(req, res) {
  try {
    const STOCK_BAJO = 10;

    // Traemos todos los productos con su categoria y proveedor
    // (para un inventario pequeño esto es más simple que hacer
    // 5 queries agregadas separadas)
    const productos = await prisma.producto.findMany({
      include: { categoria: true, proveedor: true },
    });

    const totalProductos = productos.length;

    const valorTotalInventario = productos.reduce(
      (acc, p) => acc + Number(p.precio) * p.stock,
      0
    );

    const productosStockBajo = productos.filter(
      (p) => p.stock < STOCK_BAJO
    ).length;

    const totalProveedores = await prisma.proveedor.count();

    // Agrupar por categoria: cuántos productos y cuánto valor tiene cada una
    const porCategoriaMap = {};
    for (const p of productos) {
      const nombre = p.categoria.nombre;
      if (!porCategoriaMap[nombre]) {
        porCategoriaMap[nombre] = { nombre, cantidad: 0, valor: 0 };
      }
      porCategoriaMap[nombre].cantidad += 1;
      porCategoriaMap[nombre].valor += Number(p.precio) * p.stock;
    }
    const productosPorCategoria = Object.values(porCategoriaMap);

    // Agrupar por proveedor: valor total de inventario que provee cada uno
    const porProveedorMap = {};
    for (const p of productos) {
      const nombre = p.proveedor.nombre;
      if (!porProveedorMap[nombre]) {
        porProveedorMap[nombre] = { nombre, valor: 0 };
      }
      porProveedorMap[nombre].valor += Number(p.precio) * p.stock;
    }
    const valorPorProveedor = Object.values(porProveedorMap);

    // Top 5 productos con menos stock (para alertas)
    const productosBajoStock = [...productos]
      .sort((a, b) => a.stock - b.stock)
      .slice(0, 5)
      .map((p) => ({ nombre: p.nombre, sku: p.sku, stock: p.stock }));

    res.json({
      resumen: {
        valorTotalInventario,
        totalProductos,
        productosStockBajo,
        totalProveedores,
      },
      productosPorCategoria,
      valorPorProveedor,
      productosBajoStock,
    });
  } catch (error) {
    console.error('ERROR AL OBTENER METRICAS DEL DASHBOARD:', error);
    res.status(500).json({ error: 'Error al obtener las métricas' });
  }
}

module.exports = { obtenerMetricas };