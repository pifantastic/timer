
var util = require('util');

var now;

try {
  // Attempt to load the totally sweet microtime module.
  var microtime = require('microtime');
  now = function () {
    return microtime.nowDouble();
  };
}
catch (e) {
  // Fall back to Date.
  now = function () {
    return new Date().getTime() / 1000;
  };
}

/**
 * A timer.
 */
function Timer () {
  this._segments = [];
  this._start = null;
}

/**
 * Start a new segment.
 * @return {this}
 */
Timer.prototype.start = function () {
  if (this._start === null) {
    this._start = now();
  }
  return this;
};

/**
 * Reset the timer and start it over.
 * @return {this}
 */
Timer.prototype.reset = function () {
  return this.clear().start();
};

/**
 * Stop the current segment.
 * @return {Double} The length of the segment that was stopped in seconds.
 */
Timer.prototype.stop = function () {
  if (this._start !== null) {
    var segment = now() - this._start;
    this._segments.push(segment);
    this._start = null;
    return segment;
  }

  return 0;
};

/**
 * Clear all segments.
 * @return {this}
 */
Timer.prototype.clear = function () {
  this._segments = [];
  this._start = null;
  return this;
};

/**
 * Get the total time including all segments and the currently running segment
 * if it exists.
 * @return {Double} Total time in seconds.
 */
Timer.prototype.total = function () {
  var tot = 0;

  // Add time of currently running segment if it exists.
  if (this._start !== null) {
    tot += now() - this._start;
  }

  // Sum up all segments.
  tot += this._segments.reduce(function (a, b) {
    return a + b;
  }, 0);

  return tot;
};

/**
 * String representation of the total time for this timer.
 * @return {String}
 */
Timer.prototype.toString = function () {
  return util.format('%d', this.total());
};

/**
 * Store all timers created using the timer() method.
 * @type {Object}
 */
var timers = {};

/**
 * Create a new timer or retrieve the existing timer with the given name.
 * @param  {String} name
 * @return {Timer}
 */
function timer (name) {
  if (typeof name !== 'string') {
    name = '__default__';
  }

  if (!timers[name]) {
    timers[name] = new Timer();
  }

  return timers[name];
}

/**
 * Clear all timers created using the timer() method.
 */
timer.clearAll = function () {
  for (var name in timers) {
    timers[name].clear();
  }
};

/**
 * Return a summary of all timers created using the timer() method.
 * @return {Object} The names of the object are the timer names and the values
 *   are the total times.
 */
timer.summary = function () {
  var all = {};

  for (var name in timers) {
    all[name] = timers[name].total();
  }

  return all;
};

module.exports = timer;
timer.Timer = Timer;
