export default (p5Instance, lsystem) => {
  const newPosition = [0, 40/(lsystem.iterations + 1)];
  p5Instance.stroke('black');
  p5Instance.line(0, 0, newPosition[0], newPosition[1]);
  p5Instance.translate(...newPosition);
};