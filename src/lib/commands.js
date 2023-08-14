import { state } from './state';
import { euclideanDistance } from './utils';

export function goLeft() {
  state.moveDirection = 'counter-clockwise'
}

export function goRight() {
  state.moveDirection = 'clockwise';
}

export function setRadius(radius) {
  state.polarCoordinates.radius = radius;
}

export function arcTo(endPoint, height) {
  const width = euclideanDistance(state.cartesianCoordinates.arc, endPoint);
  const newRadius = (height / 2) * (Math.pow(width, 2) / 8 * height);

  const centeredArcX = state.cartesianCoordinates.arc.x - state.cartesianCoordinates.center.x;
  const centeredArcY = state.cartesianCoordinates.arc.y - state.cartesianCoordinates.center.y;

  const newTheta = Math.atan2(centeredArcY, centeredArcX);
  const newCenter = {
    x: state.cartesianCoordinates.arc.x - Math.cos(newTheta) * newRadius,
    y: state.cartesianCoordinates.arc.y - Math.sin(newTheta) * newRadius,
  }

  // transferCoordinates(newCenter);
}

export function setCenter(newCenter) {
  const newRadius = euclideanDistance(state.cartesianCoordinates.arc, newCenter);

  const centeredArcX = state.cartesianCoordinates.arc.x - newCenter;
  const centeredArcY = state.cartesianCoordinates.arc.y - newCenter;

  const newTheta = Math.atan2(centeredArcY, centeredArcX);
  
}

export function setStepSize(stepSize) {
  state.stepSize = stepSize;
}

export function repeatCommands(commandArr, repeatCount) {}
