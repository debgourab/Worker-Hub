// Escape text before inserting it into an HTML template.
function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}[character]));
}
