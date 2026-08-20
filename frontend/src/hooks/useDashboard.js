import { useState, useEffect } from 'react';
import api from '../services/api';

export function useDashboard() {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  async function cargarMetricas() {
    try {
      setCargando(true);
      setError(null);
      const res = await api.get('/dashboard');
      setDatos(res.data);
    } catch (err) {
      console.error('ERROR AL CARGAR DASHBOARD:', err);
      setError('No se pudieron cargar las métricas del dashboard.');
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarMetricas();
  }, []);

  return { datos, cargando, error, recargar: cargarMetricas };
}