import p5 from 'p5';
import LSystem from 'lindenmayer';

/**
 * Main setup function to be used by p5 instance.
*/
function setup(_p5) {
  _p5.createCanvas(400, 400);
  _p5.angleMode(_p5.RADIANS);
  _p5.background(220);


  const kochcurve = new LSystem({
    axiom: 'F++F++F',
    productions: { F: 'F-F++F-F' },
    finals: {
      '+': () => { _p5.rotate(Math.PI / 180 * 60) },
      '-': () => { _p5.rotate(Math.PI / 180 * -60) },
      'F': () => {
        const newPosition = [0, 40/(kochcurve.iterations + 1)];
        _p5.stroke('black');
        _p5.line(0, 0, newPosition[0], newPosition[1]);
        _p5.translate(...newPosition);
      }
    }
  });

  _p5.translate(_p5.width * 0.75, _p5.height * 0.25);
  kochcurve.iterate(3);
  kochcurve.final();
}

/**
 * Main draw function to be used by p5 instance.
 * @param {} _p5 
 */
function draw(_p5) { }

const process = new p5((_p5) => {
  _p5.setup = (() => setup(_p5));
  _p5.draw = (() => draw(_p5));
});

