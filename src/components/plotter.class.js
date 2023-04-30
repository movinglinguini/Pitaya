import { Vector } from "../utils/classes/vector.class";
import { Signal } from '../utils/classes/signal.class';

/**
 * Class for the **plotter** part of this program. A **plotter's** function is analogous to somebody
 * moving a pen around paper or a brush around canvas. The plotter's main functions are either to
 * make a **stroke** between two points or **move** to a point.
 * 
 * A stroke is like holding the drawing tool down against the material to apply whatever medium on it,
 * like a paint brush on canvas.
 * 
 * To move is simply to change the position of the object. It's like picking up the drawing tool away from
 * from the material, like you would when you write disconnected letters with a pen. 
 * 
 * @param {*} library Whatever library is being used to draw in this program. For example, it could be P5js. 
 */
export class Plotter {

  get position() {
    return this._position;
  }

  set position(components) {
    this._position.components = components;
  }

  get strokes() {
    return {...this._strokes};
  }

  set strokes(strokes) {
    this._strokes = {...strokes};
  }

  constructor() {
    this._position = new Vector(0, 0);
    this._strokes = {};

    this.$beforeStroke = new Signal();
    this.$afterStroke = new Signal();
  }

  stroke(to) {
    this.$beforeStroke.emit({ from: this.position, to });
    this.onStroke();
    this.move(to);
    this.$afterStroke.emit({ from: this.position, to });
  }

  move(newPosition) {
    if (newPosition instanceof Vector) {
      this.position = {...newPosition};
    } else if (Array.isArray(newPosition)) {
      this.position.components = [...newPosition];
    }

    throw new Error('Position must be an instance of Vector or an array.');
  }

  onStroke(strokeInstruction) {
    
  }
}