export const plotterInstructions = {
  config: {
    canvasHeight: 1024,
    canvasWidth: 2048,
    beginningSequence: 'F',
  },
  state: {
    plotterPosition: [0, 0],
    plotterRotation: Math.PI * 0.25,
    circleRadius: 15,
    minX: 512 + 25,
    maxX: 1024 - 25,
    minY: 0 + 25,
    maxY: 512 - 25,
    moveDist: 50,
  },
  commandSequences: {
    F: ['F'],
    R: ['R'],
    L: ['L'],
    LL: ['LL'],
    RR: ['RR'],
    A: []
  },
  transitionRules: {
    F: ['A'],
    A: ['R', 'L', 'RR', 'LL'],
    R: ['F'],
    L: ['F'],
    RR: ['F'],
    LL: ['F'],
  },
  transitionFunctions: {
    'F': (p5, nextSequence) => {
      // const currPosition = plotterInstructions.state.plotterPosition;
      const nextPosition = [
        0, 
        plotterInstructions.state.moveDist
      ];

      p5.push();
      p5.stroke(0, 0, p5.random(175));
      p5.strokeWeight(p5.random(3));
      p5.line(0, 0, nextPosition[0], nextPosition[1]);
      p5.pop();

      p5.translate(...nextPosition);
    },
    R: (p5) => {
      const rotationAmount = Math.PI * 0.25;
      p5.rotate(rotationAmount);
      // plotterInstructions.state.plotterRotation += rotationAmount; 
    },
    L: (p5) => {
      const rotationAmount = -Math.PI * 0.25;
      p5.rotate(rotationAmount);
      // plotterInstructions.state.plotterRotation += rotationAmount; 
    },
    RR: (p5) => {
      const rotationAmount = Math.PI * 0.5;
      p5.rotate(rotationAmount);
      // plotterInstructions.state.plotterRotation += rotationAmount; /
    },
    LL: (p5) => {
      const rotationAmount = -Math.PI * 0.5;
      p5.rotate(rotationAmount);
      // plotterInstructions.state.plotterRotation += rotationAmount; 
    },
  },
  arrivalFunctions: {
    'F': (p5) => {
      p5.push();
      p5.stroke(0, 0, p5.random(255));
      p5.strokeWeight(1);
      p5.fill(255, 255, p5.random(255));
      p5.circle(0, 0, p5.random(plotterInstructions.state.circleRadius));
      p5.pop();
    }
  },
  setup: (p5) => {
    p5.translate(plotterInstructions.state.minX, plotterInstructions.state.minY);
  },
  beforeDraw(p5) {
    // p5.translate(plotterInstructions.state.minX, plotterInstructions.state.minY);
    // p5.translate(plotterInstructions.state.plotterPosition[0], plotterInstructions.state.plotterPosition[1]);
    // p5.rotate(plotterInstructions.state.plotterRotation);

  }
}