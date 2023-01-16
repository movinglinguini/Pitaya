import { Application } from "pixi.js";

function main() {
  const app = new Application({
    backgroundColor: 'white'
  });
  document.querySelector('#canvas-container').appendChild(app.view);
}

main();
