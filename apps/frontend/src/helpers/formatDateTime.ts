export function formatDateTime(date: Date | string | number): string {
  const d = new Date(date);

  const time = d.toLocaleTimeString("es-UY", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${time} · ${day}/${month}/${year}`;
}