import { useState, useEffect } from 'react';
import api from '../services/api';

export function useProductos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  async function cargarProductos() {
    try {
      setCargando(true);
      const respuesta = await api.get('/productos');
      setProductos(respuesta.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los productos');
    } finally {
      setCargando(false);
    }
  }

  async function crearProducto(datos) {
    await api.post('/productos', datos);
    await cargarProductos();
  }

  async function actualizarProducto(id, datos) {
    await api.put(`/productos/${id}`, datos);
    await cargarProductos();
  }

  async function eliminarProducto(id) {
    await api.delete(`/productos/${id}`);
    await cargarProductos();
  }

  useEffect(() => {
    cargarProductos();
  }, []);

  return {
    productos,
    cargando,
    error,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
  };
}