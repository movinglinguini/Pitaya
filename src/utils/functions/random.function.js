/**
 * This file contains various useful random functions.
 */

/**
 * Extension of JavaScript's base `Math.random` function. If `min` and `max` are both given, returns a number
 * in the range `[min, max)`. If only `min` or `max` is given, then returns a number between 0 and whichever
 * number was given. If neither is given, just returns a random number in the range `[0,1)`.
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
function random(min = null, max = null) {
  if (!(Boolean(min) || Boolean(max))) {
    return Math.random();
  } else if (Boolean(min)) {
    return Math.random() * min;
  } else if (Boolean(max)) {
    return Math.random() * max;
  }

  return Math.random() * (max - min) + min;
}

/**
 * Returns a random Integer. If `min` and `max` are both given, returns an integer
 * in the range `[min, max]`. If only `min` or `max` is given, then returns an integer between 0 and whichever
 * number was given. If neither is given, just returns 0 or 1.
 * @param {number} min 
 * @param {number} max 
 * @returns A random integer between `min` and `max` (inclusive).
 */
function randomInt(min = null, max = null) {
  return Math.floor(random(min, (max || 0) + 1));
}

/**
 * Returns a random item from `collection`.
 * @param {Array | Map} collection 
 * @returns 
 */
function choose(collection) {
  if (Array.isArray(collection)) {
    return collection[randomInt(collection.length)];
  } else if (collection instanceof Map) {
    return choose(Array.from(collection.values()));
  }

  throw new Error('Set must be an array or Map.');
}

export default {
  random,
  randomInt,
  choose,
}