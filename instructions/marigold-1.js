const canvasHeight = 1024;
const canvasWidth = canvasHeight * 1.33;

export const plotterInstructions = {
  config: {
    canvasHeight: canvasHeight,
    canvasWidth: canvasWidth
  },
  state: {
    moveDist: 30,
    minX: canvasWidth * 0.2,
    maxX: canvasWidth * 0.8,
    minY: canvasHeight * 0.2,
    maxX: canvasHeight * 0.8,
    plotterPosition: [
      canvasWidth * 0.5,
      canvasHeight * 0.5, 
    ]
  },
  commandSequences: {
    U: ['U'],
    L: ['L'],
    R: ['R'],
    D: ['D'],
    UL: ['UL'],
    UR: ['UR'],
    DR: ['DR'],
    DL: ['DL'],
    A: []
  },
  transitionRules: {
    A: ['U', 'L', 'R', 'D', 'UL', 'UR', 'DR', 'DL'],
    U: ['A'],
    L: ['A'],
    R: ['A'],
    D: ['A'],
    UL: ['A'],
    UR: ['A'],
    DR: ['A'],
    DL: ['A'],
  },
  transitionFunctions: {
    A: (p5, nextSequence) => {
      let nextPosition = [];

      switch(nextSequence) {
        case 'U': nextPosition = [plotterInstructions.state.plotterPosition[0], -plotterInstructions.state.moveDist + plotterInstructions.state.plotterPosition[1]]; break;
        case 'L': nextPosition = [-plotterInstructions.state.moveDist + plotterInstructions.state.plotterPosition[0], plotterInstructions.state.plotterPosition[1]]; break;
        case 'R': nextPosition = [plotterInstructions.state.moveDist + plotterInstructions.state.plotterPosition[0], plotterInstructions.state.plotterPosition[1]]; break;
        case 'D': nextPosition = [plotterInstructions.state.plotterPosition[0], plotterInstructions.state.moveDist + plotterInstructions.state.plotterPosition[1]]; break;
        case 'UL': nextPosition = [-plotterInstructions.state.moveDist + plotterInstructions.state.plotterPosition[0], -plotterInstructions.state.moveDist + plotterInstructions.state.plotterPosition[1]]; break;
        case 'UR': nextPosition = [plotterInstructions.state.moveDist + plotterInstructions.state.plotterPosition[0], -plotterInstructions.state.moveDist + plotterInstructions.state.plotterPosition[1]]; break;
        case 'DL': nextPosition = [-plotterInstructions.state.moveDist + plotterInstructions.state.plotterPosition[0], plotterInstructions.state.moveDist + plotterInstructions.state.plotterPosition[1]]; break;
        case 'DR': nextPosition = [plotterInstructions.state.moveDist + plotterInstructions.state.plotterPosition[0], plotterInstructions.state.moveDist + plotterInstructions.state.plotterPosition[1]]; break;
      }

      if (
        nextPosition[0] < plotterInstructions.state.minX
        || nextPosition[1] < plotterInstructions.state.minY
        || nextPosition[0] > plotterInstructions.state.maxX
        || nextPosition[1] > plotterInstructions.state.maxY
      ) {
        return;
      }

      p5.push();
      p5.stroke(0, 0, p5.random(175));
      p5.strokeWeight(p5.random(3));
      p5.line(...plotterInstructions.state.plotterPosition, ...nextPosition);
      p5.pop();
      plotterInstructions.state.plotterPosition = [...nextPosition];
    }
  },
  arrivalFunctions: {
    'A': (p5) => {
      p5.push();
      p5.stroke(0, 0, p5.random(255));
      p5.fill(255, 255, p5.random(255));
      p5.circle(...plotterInstructions.state.plotterPosition, p5.random(15));
      p5.pop();
    }
  },
  setup: (p5) => {
    // p5.translate(plotterInstructions.state.minX, plotterInstructions.state.minY);
  }
}