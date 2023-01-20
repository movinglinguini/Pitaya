import { Application, Graphics } from "pixi.js";

function main() {
  // add canvas
  const app = new Application({
    backgroundColor: 'white'
  });
  document.querySelector('#canvas-container').appendChild(app.view);

  /** 
   * Everything on the canvas will be padded so that the drawing is always contained in the canvas (i.e., is not bleeding out by a few pixels)
   * */
  const padding = {
    top: 5,
    bottom: 10,
    left: 10,
    right: 5,
  }

  // draw the grid
  /** @TODO - this should be specified in a config file. */
  const resolution = 50;
  const grid = drawGrid(app.view.width - padding.left, app.view.height - padding.bottom, resolution);
  grid.position.set(padding.right, padding.top);
  app.stage.addChild(grid);
}

/** Draws the grid that the squares will be drawn into */
function drawGrid(width, height, resolution) {
  const cellWidth = width / resolution;
  const cellHeight = height / resolution;

  const gridGraphics = new Graphics();
  
  gridGraphics.lineStyle({
    color: '#efefef',
    width: 1,
  });

  for (let x = 0; x <= width; x += cellWidth) {
    gridGraphics.moveTo(x, 0);
    gridGraphics.lineTo(x, height);
  }

  for (let y = 0; y <= height; y += cellHeight ) {
    gridGraphics.moveTo(0, y);
    gridGraphics.lineTo(width, y);
  }

  return gridGraphics;
}

main();
