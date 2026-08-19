import { useState, useEffect } from 'react';
import api from '../services/api';

export function useCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);

  async function cargarCategorias() {
    try {
      setCargando(true);
      const respuesta = await api.get('/categorias');
      setCategorias(respuesta.data);
    } catch (err) {
      console.error('Error al cargar categorías', err);
    } finally {
      setCargando(false);
    }
  }

    async function crearCategoria(datos) {
    const respuesta = await api.post('/categorias', datos);
    await cargarCategorias();
    return respuesta.data;
  }

  useEffect(() => {
    cargarCategorias();
  }, []);

  return { categorias, cargando, crearCategoria };
}