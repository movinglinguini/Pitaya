import { Application, Container, Graphics } from "pixi.js";
import { initColorPicker } from "./color-picker";

function main() {
  // add canvas
  const app = initPixi($('#canvas-container'));

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
  // add the first drawing layer to the stage
  initInteractionLayer(app.stage);
  initLayer(app.stage);

  // initialize color picker
  const onPickColorCallback = ((colorPickerObj) => {
    $('#colorpicker-output').text(JSON.stringify(colorPickerObj.color));

  });
  
  initColorPicker(onPickColorCallback);
}

/** Initializes the PIXI application */
function initPixi(containerElement) {
  const app = new Application({
    backgroundColor: 'white'
  });
  containerElement.append(app.view);
  return app;
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

/** 
 * Adds a new layer to the stage.
 * 
 * @returns The index of the new layer.
 * */
function initLayer(stage) {
  if (!stage.__layers) {
    stage.__layers = [];
  }

  // init the new layer
  const newLayer = new Graphics();

  stage.__layers.push(
    newLayer,
  );

  onSetActiveLayer(newLayer, stage);

  stage.addChild(newLayer);

  return stage.__layers.length - 1;
}

function initInteractionLayer(stage) {
  $('canvas').on('mousedown', ((evt) => {
    console.log(evt);
  }));
}

/** Event Handlers */
function onSetActiveLayer(layer, stage) {
  stage.__activeLayer = layer;
}

$.when($.ready)
  .then(() => {
    main();
  });
