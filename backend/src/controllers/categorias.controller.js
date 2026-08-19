const prisma = require('../lib/prisma');

async function listar(req, res) {
  try {
    const categorias = await prisma.categoria.findMany({
      orderBy: { nombre: 'asc' },
    });
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
}

async function crear(req, res) {
  try {
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: 'El nombre es requerido' });
    }

    const nuevaCategoria = await prisma.categoria.create({ data: { nombre } });
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Esa categoría ya existe' });
    }
    res.status(500).json({ error: 'Error al crear la categoría' });
  }
}

async function actualizar(req, res) {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    const categoriaActualizada = await prisma.categoria.update({
      where: { id: Number(id) },
      data: { nombre },
    });

    res.json(categoriaActualizada);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.status(500).json({ error: 'Error al actualizar la categoría' });
  }
}

async function eliminar(req, res) {
  try {
    const { id } = req.params;
    await prisma.categoria.delete({ where: { id: Number(id) } });
    res.json({ mensaje: 'Categoría eliminada correctamente' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    if (error.code === 'P2003') {
      return res.status(400).json({ error: 'No puedes eliminar una categoría con productos asociados' });
    }
    res.status(500).json({ error: 'Error al eliminar la categoría' });
  }
}

module.exports = { listar, crear, actualizar, eliminar };