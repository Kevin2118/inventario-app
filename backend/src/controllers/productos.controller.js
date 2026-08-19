const prisma = require('../lib/prisma');

// GET /api/productos - listar todos
async function listar(req, res) {
  try {
    const productos = await prisma.producto.findMany({
      include: { categoria: true, proveedor: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(productos);
  } catch (error) {
    console.error('ERROR AL LISTAR PRODUCTOS:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
}

// GET /api/productos/:id - obtener uno
async function obtenerPorId(req, res) {
  try {
    const { id } = req.params;
    const producto = await prisma.producto.findUnique({
      where: { id: Number(id) },
      include: { categoria: true, proveedor: true },
    });

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(producto);
  } catch (error) {
    console.error('ERROR AL OBTENER PRODUCTO:', error);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
}

// POST /api/productos - crear
async function crear(req, res) {
  try {
    const { nombre, sku, precio, stock, categoriaId, proveedorId } = req.body;

    if (!nombre || !sku || !precio || !categoriaId || !proveedorId) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const nuevoProducto = await prisma.producto.create({
      data: {
        nombre,
        sku,
        precio: Number(precio),
        stock: Number(stock ?? 0),
        categoriaId: Number(categoriaId),
        proveedorId: Number(proveedorId),
      },
    });

    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error('ERROR AL CREAR PRODUCTO:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'El SKU ya existe' });
    }
    res.status(500).json({ error: 'Error al crear el producto' });
  }
}

// PUT /api/productos/:id - actualizar
async function actualizar(req, res) {
  try {
    const { id } = req.params;
    const { nombre, sku, precio, stock, categoriaId, proveedorId } = req.body;

    const productoActualizado = await prisma.producto.update({
      where: { id: Number(id) },
      data: {
        nombre,
        sku,
        precio: precio !== undefined ? Number(precio) : undefined,
        stock: stock !== undefined ? Number(stock) : undefined,
        categoriaId: categoriaId ? Number(categoriaId) : undefined,
        proveedorId: proveedorId ? Number(proveedorId) : undefined,
      },
    });

    res.json(productoActualizado);
  } catch (error) {
    console.error('ERROR AL ACTUALIZAR PRODUCTO:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
}

// DELETE /api/productos/:id - eliminar
async function eliminar(req, res) {
  try {
    const { id } = req.params;
    await prisma.producto.delete({ where: { id: Number(id) } });
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('ERROR AL ELIMINAR PRODUCTO:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
}

module.exports = { listar, obtenerPorId, crear, actualizar, eliminar };