/*Auto generated file. Do not edit.*/
  export default {axiom:"F++F++F",productions:{'F':"F-F++F-F",},finals:{'+':(p5Instance) => p5Instance.rotate(Math.PI / 180 * 60),'-':(p5Instance) => p5Instance.rotate(Math.PI / 180 * -60),'F':(p5Instance, lsystem) => {
  const newPosition = [0, 40/(lsystem.iterations + 1)];
  p5Instance.stroke('black');
  p5Instance.line(0, 0, newPosition[0], newPosition[1]);
  p5Instance.translate(...newPosition);
},},iterations:2,};