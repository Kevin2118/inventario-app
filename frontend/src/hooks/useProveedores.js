import { useState, useEffect } from 'react';
import api from '../services/api';

export function useProveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [cargando, setCargando] = useState(true);

  async function cargarProveedores() {
    try {
      setCargando(true);
      const respuesta = await api.get('/proveedores');
      setProveedores(respuesta.data);
    } catch (err) {
      console.error('Error al cargar proveedores', err);
    } finally {
      setCargando(false);
    }
  }

  async function crearProveedor(datos) {
    const respuesta = await api.post('/proveedores', datos);
    await cargarProveedores();
    return respuesta.data;
  }

  useEffect(() => {
    cargarProveedores();
  }, []);

  return { proveedores, cargando, crearProveedor };
}