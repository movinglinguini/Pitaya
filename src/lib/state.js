const cartesianCoordinates = {
  arc: {
    x: 1,
    y: 0,
  },
  center: {
    x: 0,
    y: 0,
  },
};

const polarCoordinates = {
  theta: 0,
  radius: 1,
}

let stepSize = 0.001;
let moveDirection = 'clockwise';

export const state = {
  cartesianCoordinates,
  polarCoordinates,
  stepSize,
  moveDirection
}
