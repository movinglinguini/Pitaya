import { Canvas } from "./canvas.class";
import { Plotter } from "./plotter.class";

export class PitayaRuleset {
  constructor() {
    this.name = null;
    this.context = {};
    this.canvas = new Canvas();
    this.plotter = new Plotter();
  }
}