const ruleset = new PitayaRuleset();

ruleset.name = 'Marigold';
ruleset.circleMaxRadius = 10;
ruleset.stepSize = 20;
ruleset.canvas.height = 1024;
ruleset.canvas.width = ruleset.canvas.height * 1.33;
ruleset.plotter.states = {
  up: ['up', 'left', 'right', 'down'],
  down: ['up', 'left', 'right', 'down'],
  left: ['up', 'left', 'right', 'down'],
  right: ['up', 'left', 'right', 'down'],
};
ruleset.plotter.initialState = 'right';
ruleset.plotter.position = [100, 100];
ruleset.plotter.moves = {
  'up': (from) => {
    return from.add([0, -ruleset.stepSize]);
  },
  'left': (from) => {
    return from.add([-ruleset.stepSize, 0]);
  },
  'right': (from) => {
    return from.add([ruleset.stepSize, 0]);
  },
  'down': (from) => {
    return from.add([0, ruleset.stepSize]);
  },
}
ruleset.plotter.strokes = {
  '*': (from, to) =>  {
    const _p5 = Pitaya.library;
    _p5.push();
    _p5.stroke(0, 0, _p5.random(175));
    _p5.strokeWeight(_p5.random(3));
    _p5.line(...from.components, ...to.components);
    _p5.pop();
  } 
};
ruleset.plotter.releases = {
  '*': () => {
    const _p5 = Pitaya.library;
    const currentPosition = ruleset.plotter.position;
    const radius = Pitaya.utils.random(ruleset.circleMaxRadius);
    _p5.push();
    _p5.circle(...currentPosition, radius);
    _p5.pop();
  }
}

new p5((p5) => {
  Pitaya.setLibrary(p5);
  Pitaya.addRuleset(ruleset);

  p5.setup = () => {
    p5.createCanvas(ruleset.canvas.width, ruleset.canvas.height);
  }

  p5.draw = () => {
    Pitaya.transition();
  }
});



