const prisma = require('../lib/prisma');

async function listar(req, res) {
  try {
    const proveedores = await prisma.proveedor.findMany({
      orderBy: { nombre: 'asc' },
    });
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener proveedores' });
  }
}

async function crear(req, res) {
  try {
    const { nombre, contacto } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: 'El nombre es requerido' });
    }

    const nuevoProveedor = await prisma.proveedor.create({
      data: { nombre, contacto },
    });
    res.status(201).json(nuevoProveedor);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el proveedor' });
  }
}

async function actualizar(req, res) {
  try {
    const { id } = req.params;
    const { nombre, contacto } = req.body;

    const proveedorActualizado = await prisma.proveedor.update({
      where: { id: Number(id) },
      data: { nombre, contacto },
    });

    res.json(proveedorActualizado);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }
    res.status(500).json({ error: 'Error al actualizar el proveedor' });
  }
}

async function eliminar(req, res) {
  try {
    const { id } = req.params;
    await prisma.proveedor.delete({ where: { id: Number(id) } });
    res.json({ mensaje: 'Proveedor eliminado correctamente' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }
    if (error.code === 'P2003') {
      return res.status(400).json({ error: 'No puedes eliminar un proveedor con productos asociados' });
    }
    res.status(500).json({ error: 'Error al eliminar el proveedor' });
  }
}

module.exports = { listar, crear, actualizar, eliminar };