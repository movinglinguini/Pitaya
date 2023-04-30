function cartToPolar(x, y) {
  return {
    phi: Math.atan2(y, x),
    radius: Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)),
  };
}

function polarToCart(phi, radius) {
  return {
    x: radius * Math.cos(phi),
    y: radius * Math.sin(phi)
  };
}

export default {
  cartToPolar,
  polarToCart,
}
