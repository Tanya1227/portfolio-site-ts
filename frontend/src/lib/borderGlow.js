export const DEFAULT_EDGE_SENSITIVITY = 60;

export function computeEdge(x, y, rect, edgeSensitivity = DEFAULT_EDGE_SENSITIVITY) {
  const edgeDistance = Math.max(0, Math.min(x, y, rect.width - x, rect.height - y));
  return Math.max(0, 1 - edgeDistance / Math.max(1, edgeSensitivity));
}

export function applyGlowWithRect(el, rect, clientX, clientY, edgeSensitivity = DEFAULT_EDGE_SENSITIVITY) {
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  const edge = computeEdge(x, y, rect, edgeSensitivity);
  el.style.setProperty('--glow-x', `${x}px`);
  el.style.setProperty('--glow-y', `${y}px`);
  el.style.setProperty('--bg-edge', edge.toFixed(3));
}

export function applyGlow(el, clientX, clientY, edgeSensitivity = DEFAULT_EDGE_SENSITIVITY) {
  applyGlowWithRect(el, el.getBoundingClientRect(), clientX, clientY, edgeSensitivity);
}

export function clearGlow(el) {
  el.style.setProperty('--bg-edge', '0');
}
