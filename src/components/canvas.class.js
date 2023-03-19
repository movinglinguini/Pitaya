/**
 * Class for configuring the canvas.
 * As of version 0.0.2, we're only using the canvas class once. Eventually,
 * when we mess with layers, we'll come back to instantiating multiple canvas classes. 
 */
export class Canvas {

  constructor() {
    this.width = 0;
    this.height = 0;
    this.paddingTop = 0;
    this.paddingBottom = 0;
    this.paddingLeft = 0;
    this.paddingRight = 0;
  }
}