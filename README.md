# 📦 Sistema de Inventario

CRUD completo para gestión de productos, categorías y proveedores. Proyecto full-stack construido para practicar arquitectura de API REST, relaciones de base de datos y diseño de interfaz.

## 🚀 Demo en vivo

> Próximamente

## ✨ Funcionalidades

- CRUD completo de productos (crear, listar, editar, eliminar)
- Creación rápida de categorías y proveedores desde el mismo formulario
- Relaciones entre tablas: cada producto pertenece a una categoría y un proveedor
- Validaciones en backend (SKU único, campos requeridos)
- Indicador visual de nivel de stock (disponible / bajo / agotado)
- Manejo de errores con mensajes claros (ej. "No puedes eliminar una categoría con productos asociados")

## 🛠️ Tecnologías

**Backend**

- Node.js + Express
- Prisma ORM
- PostgreSQL (alojado en [Neon](https://neon.tech))

**Frontend**

- React + Vite
- Tailwind CSS
- Axios

## 📂 Estructura del proyecto

inventario-app/
├── backend/ # API REST (Express + Prisma)
│ ├── prisma/ # Schema y migraciones
│ └── src/
│ ├── routes/
│ ├── controllers/
│ └── lib/
└── frontend/ # Interfaz (React + Vite)
└── src/
├── components/
├── pages/
├── hooks/
└── services/

## ⚙️ Instalación local

### Requisitos

- Node.js 18+
- Una base de datos PostgreSQL (puede ser gratuita en [Neon](https://neon.tech))

### 1. Clonar el repositorio

```bash
git clone https://github.com/Kevin2118/inventario-app.git
cd inventario-app
```

### 2. Configurar el backend

```bash
cd backend
npm install
```

Crea un archivo `.env` en `backend/` con:

DATABASE_URL="tu_connection_string_de_postgresql"

Corre las migraciones y genera el cliente:

```bash
npx prisma migrate dev
npx prisma generate
```

Enciende el servidor:

```bash
node server.js
```

El backend corre en `http://localhost:3000`.

### 3. Configurar el frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

El frontend corre en `http://localhost:5173`.

## 📊 Modelo de datos

Categoria (1) ──< (N) Producto (N) >── (1) Proveedor

Cada producto pertenece a una categoría y un proveedor. Al intentar eliminar una categoría o proveedor con productos asociados, la API lo bloquea con un mensaje claro.

## 👤 Autor

**Kevin**
[GitHub](https://github.com/Kevin2118)
