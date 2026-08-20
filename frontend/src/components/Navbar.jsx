import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const linkClase = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
      isActive
        ? 'bg-[#E3C4BA] text-[#3D2622]'
        : 'text-gray-500 hover:text-[#3D2622]'
    }`;

  return (
    <nav className="border-b border-gray-200 px-6 py-3">
      <div className="max-w-6xl mx-auto flex items-center gap-2">
        <NavLink to="/" end className={linkClase}>
          Inventario
        </NavLink>
        <NavLink to="/dashboard" className={linkClase}>
          Dashboard
        </NavLink>
      </div>
    </nav>
  );
}