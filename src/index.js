import p5 from 'p5';
import LSystem from 'lindenmayer';
import lsystemConfig from './lsystem.config';

let kochcurve = null;

/**
 * Main setup function to be used by p5 instance.
*/
function setup(_p5) {
  _p5.createCanvas(400, 400);
  _p5.angleMode(_p5.RADIANS);
  _p5.background(220);

  console.log(lsystemConfig);

  // 
  let oldPosition = null;

  const finals = {};
  // Object.keys(lsystemConfig).forEach(k => {
  //   finals[k] = 
  // });

  kochcurve = new LSystem({
    axiom: lsystemConfig.axiom,
    productions: lsystemConfig.productions,
    finals: {},
  });
  Object.keys(lsystemConfig.finals).forEach(k => {
    const func = lsystemConfig.finals[k];
    kochcurve.setFinal(k, () => func(_p5, kochcurve));
  });

  kochcurve.iterate(lsystemConfig.iterations);
}

/**
 * Main draw function to be used by p5 instance.
 * @param {} _p5 
 */
function draw(_p5) {
  _p5.translate(_p5.width / 2, _p5.height / 2);
  if (_p5.frameCount <= 100) {
    kochcurve.final();
  }
}

const process = new p5((_p5) => {
  _p5.setup = (() => setup(_p5));
  _p5.draw = (() => draw(_p5));
});


