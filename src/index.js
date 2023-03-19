import { createMachine } from 'xstate';
import { PitayaRuleset } from './components/ruleset.class';
import utils from './utils';

(() => {
  const rulesets = new Set();
  const stateMachines = [];

  /**
   * Adds a ruleset to Pitaya.
   */
  function addRuleset(ruleset) {
    // parse out the ruleset into a state machine
    rulesets.add(ruleset);
    const stateMachineConfig = {
      id: ruleset.name,
      initial: ruleset.plotter.initialState || utils.choose(Object.keys(ruleset.plotter.states)),
      states: {},
    };

    // build out states and transition rules
    Object.keys(ruleset.plotter.states).forEach((state) => {
      const neighbors = ruleset.plotter.states[state];
      const transitionRules = {
        on: {},
      };

      neighbors.forEach(nextState => {
        // transitionRuleKeys.add(`${state}->${nextState}`);
        const transitionRuleKey = `${state}->${nextState}`;
        const transitionConfig = {
          target: nextState,
          actions: [],
        };

        if (ruleset.plotter.moves[nextState]) {
          transitionConfig.actions.push(nextState);
        }

        if (ruleset.plotter.strokes[transitionRuleKey]) {
          transitionConfig.actions.push(transitionRuleKey);
        }

        // if there is a universal stroke, add its key
        if (ruleset.plotter.strokes['*']) {
          transitionConfig.actions.push('*');
        }

        transitionRules.on[transitionRuleKey] = transitionConfig;
      });

      stateMachineConfig.states[state] = transitionRules;
    });

    // add strokes to the list of actions
    const actions = {};
    Object.keys(ruleset.plotter.moves).forEach(moveKey => {
      actions[moveKey] = () => {
        const moveFn = ruleset.plotter.moves[moveKey];
        const plotterLastPosition = ruleset.plotter.position.clone();
        const plotterNextPosition = moveFn(plotterLastPosition);
        ruleset.plotter._lastPosition = plotterLastPosition;
        ruleset.plotter._position = plotterNextPosition;
      };
    });

    Object.keys(ruleset.plotter.strokes).forEach(strokeKey => {
      actions[strokeKey] = () => {
        const strokeFn = ruleset.plotter.strokes[strokeKey];
        strokeFn(ruleset.plotter._lastPosition, ruleset.plotter.position);
      };
    });

    const stateMachineActions = { actions };    
    const newMachine = createMachine(stateMachineConfig, stateMachineActions);
    newMachine._currentState = newMachine.initialState;
    stateMachines.push(newMachine);
  }

  function setLibrary(libraryInstance, libraryName) {
    Pitaya[libraryName] = libraryInstance;
    Pitaya.library = libraryInstance;
  }

  function transition() {
    Pitaya._stateMachines.forEach(sm => {
      const event = utils.choose(sm._currentState.nextEvents);
      const newState = sm.transition(sm._currentState.value, event);

      // execute transition actions
      newState.actions.forEach(act => {
        act.exec();
      })
      
      sm._currentState = newState;
    });
  }

  window.Pitaya = {
    _rulesets: rulesets,
    _stateMachines: stateMachines,
    library: null,
    utils,
    addRuleset,
    setLibrary,
    transition,
  };

  window.PitayaRuleset = PitayaRuleset;
})();