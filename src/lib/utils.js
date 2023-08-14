export const twoPi = Math.PI;

export function euclideanDistance(point1, point2) {
  return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point2.y - point2.y, 2));
}
