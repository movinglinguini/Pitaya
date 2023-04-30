const circleRuleset = new PitayaRuleset();

// basic setup
circleRuleset.name = 'Blood Circle';
circleRuleset.canvas.height = 1040;
circleRuleset.canvas.width = circleRuleset.canvas.height * 1.33;

circleRuleset.plotter.states = {
  'left': [ 'left', 'in', 'out' ],
  'in': ['left'],
  'out': ['left'],
};
circleRuleset.plotter.initialState = 'left';
circleRuleset.plotter.position = [0, 25];
circleRuleset.plotter.centerPosition = [circleRuleset.canvas.width * 0.66, circleRuleset.canvas.height * 0.5];
circleRuleset.plotter.circleStepSize = Math.PI * 0.05;
circleRuleset.plotter.maxRadiusStepSize = 5;
circleRuleset.plotter.maxRadius = circleRuleset.canvas.width * 0.33;

circleRuleset.plotter.moves = {
  'left': (from) => {
    const fromPolar = Pitaya.utils.cartToPolar(from.x, from.y);
    const to = Pitaya.utils.polarToCart(fromPolar.phi + circleRuleset.plotter.circleStepSize, fromPolar.radius);
    return new Pitaya.utils.Vector(to.x, to.y);
  },
  'in': (from) => {
    const fromPolar = Pitaya.utils.cartToPolar(from.x, from.y);
    const newRadius = Pitaya.utils.clamp(fromPolar.radius - circleRuleset.plotter.maxRadiusStepSize, 0, circleRuleset.plotter.maxRadius);
    const to = Pitaya.utils.polarToCart(fromPolar.phi, newRadius);
    return new Pitaya.utils.Vector(to.x, to.y);
  },
  'out': (from) => {
    const fromPolar = Pitaya.utils.cartToPolar(from.x, from.y);
    const newRadius = Pitaya.utils.clamp(fromPolar.radius + circleRuleset.plotter.maxRadiusStepSize, 0, circleRuleset.plotter.maxRadius);
    const to = Pitaya.utils.polarToCart(fromPolar.phi, newRadius);
    return new Pitaya.utils.Vector(to.x, to.y);
  }
}

circleRuleset.plotter.strokes = {
  'left->left': (from, to) => {
    const p5_ = Pitaya.library;
    const fromPolar = Pitaya.utils.cartToPolar(from.x, from.y);
    const toPolar = Pitaya.utils.cartToPolar(to.x, to.y);
    p5_.push();
    p5_.stroke('#630800');
    p5_.strokeWeight(p5_.noise(Date.now()) * 2.5)
    p5_.noFill();
    p5_.arc(...circleRuleset.plotter.centerPosition, toPolar.radius, toPolar.radius, fromPolar.phi, toPolar.phi);
    p5_.pop();
  }
}

const lineRuleset = new PitayaRuleset();
lineRuleset.name = 'Blood Circle - Lines';
lineRuleset.plotter.states = {
  'start': ['shift'],
  'shift': ['thruline1'],
  'thruline1': ['shift1'],
  'shift1': ['thruline2'],
  'thruline2': ['end'],
  'end': ['end']
};
lineRuleset.plotter.initialState = 'start';
lineRuleset.plotter.minRadius = circleRuleset.plotter.maxRadius * 0.75;
lineRuleset.plotter.maxRadius = circleRuleset.plotter.maxRadius * 0.9;

lineRuleset.plotter.moves = {
  'thruline1': (from) => {
    console.log(from);
    const fromPolar = Pitaya.utils.cartToPolar(from.x, from.y);
    const to = Pitaya.utils.polarToCart(
      // new phi
      Pitaya.utils.random(fromPolar.phi - Math.PI * 1.5, fromPolar.phi + Math.PI * 1.5),
      fromPolar.radius,
    );
    return new Pitaya.utils.Vector(to.x, to.y);
  },
  'thruline2': (from) => {
    const fromPolar = Pitaya.utils.cartToPolar(from.x, from.y);
    const to = Pitaya.utils.polarToCart(
      // new phi
      Pitaya.utils.random(fromPolar.phi - Math.PI * 1.5, fromPolar.phi + Math.PI * 1.5),
      fromPolar.radius,
    );
    return new Pitaya.utils.Vector(to.x, to.y);
  },
  'shift': (from) => {
    const newPoint = Pitaya.utils.polarToCart(Pitaya.utils.random(Math.PI * 0.5, Math.PI), Pitaya.utils.random(lineRuleset.plotter.minRadius, lineRuleset.plotter.maxRadius));
    return new Pitaya.utils.Vector(
      newPoint.x,
      newPoint.y,
    );
  },
  'shift1': (from) => {
    const newPoint = Pitaya.utils.polarToCart(Pitaya.utils.random(Math.PI * 1.5, Math.PI * 2), Pitaya.utils.random(lineRuleset.plotter.minRadius, lineRuleset.plotter.maxRadius));
    return new Pitaya.utils.Vector(
      newPoint.x,
      newPoint.y,
    );
  },
  'end': (from) => {
    const newPoint = Pitaya.utils.polarToCart(Pitaya.utils.random(Math.PI * 2), Pitaya.utils.random(lineRuleset.plotter.minRadius, lineRuleset.plotter.maxRadius));
    return new Pitaya.utils.Vector(
      newPoint.x,
      newPoint.y,
    );
  }
}

lineRuleset.plotter.strokes = {
  'shift->thruline1': (from, to) => {
    const p5_ = Pitaya.library;
    const center = circleRuleset.plotter.centerPosition;
    const from_ = from.clone().add(center);
    const to_ = to.clone().add(center);
    console.log(from_.components, to_.components);
    p5_.push();
    p5_.stroke('#630800');
    p5_.strokeWeight(1);
    p5_.line(from_.x, from_.y, to_.x, to_.y);
    p5_.line(from_.x + 25, from_.y + 25, to_.x + 25, to_.y + 25);
    p5_.pop();
  },
  'shift1->thruline2': (from, to) => {
    const p5_ = Pitaya.library;
    const center = circleRuleset.plotter.centerPosition;
    const from_ = from.clone().add(center);
    const to_ = to.clone().add(center);
    console.log(from_.components, to_.components);
    p5_.push();
    p5_.stroke('#630800');
    p5_.strokeWeight(2);
    p5_.line(from_.x, from_.y, to_.x, to_.y);
    p5_.line(from_.x - 15, from_.y - 15, to_.x - 15, to_.y - 15);
    p5_.pop();
  }
}

new p5((p5_) => {
  Pitaya.setLibrary(p5_);
  Pitaya.addRuleset(circleRuleset);
  Pitaya.addRuleset(lineRuleset);

  p5_.setup = () => {
    p5_.createCanvas(circleRuleset.canvas.width, circleRuleset.canvas.height);
    p5_.background('#C20F00');
  }

  p5_.draw = () => {
    Pitaya.transition();
  }
});

