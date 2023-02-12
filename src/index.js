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

  kochcurve = new LSystem({
    axiom: 'F++F++F',
    productions: { F: 'F-F++F-F' },
    finals: {
      '+': () => { _p5.rotate(Math.PI / 180 * 60) },
      '-': () => { _p5.rotate(Math.PI / 180 * -60) },
      'F': () => {
        const maxIter = kochcurve.iterations;
        const i = _p5.frameCount;
        const theta = (i / maxIter) * 2 * Math.PI;
        const radius = 100;
        const newPosition = [
          radius * Math.cos(theta),
          radius * Math.sin(theta),
        ];
        _p5.stroke('black');
        if (oldPosition) {
          _p5.line(...oldPosition, ...newPosition);
        }
        oldPosition = newPosition;
      }
    }
  });

  kochcurve.iterate(3);
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


