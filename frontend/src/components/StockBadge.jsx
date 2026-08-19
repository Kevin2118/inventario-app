export default function StockBadge({ stock }) {
  let color, texto;

  if (stock === 0) {
    color = '#C4463A';
    texto = 'Agotado';
  } else if (stock <= 10) {
    color = '#C98A1F';
    texto = 'Stock bajo';
  } else {
    color = '#2F8F5B';
    texto = 'Disponible';
  }

  return (
    <span className="inline-flex items-center gap-2 text-sm">
      <span
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span style={{ color }}>{texto}</span>
      <span className="text-gray-400">·</span>
      <span className="font-mono-sku text-gray-600">{stock}</span>
    </span>
  );
}