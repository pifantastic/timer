![CI](https://secure.travis-ci.org/pifantastic/timer.png)

# Introduction

A simple code timer for node. Makes it easy to measure execution time of pieces of your codebase.
If the `microtime` module is available it's used for highly accurate timing. Otherwise it will
fall back to using `Date`.

# Usage

You can use the `Timer` class directly, or rely on the simpler `timer` function.

### timer

Create a named timer. Returns a `Timer` object.

```javascript
timer('a').start();
// Long running task...
timer('a').stop();
```

### timer.clearAll

Clear all named timers created using the `timer()` function.

### timer.summary

Get a summary of all current timers. Returns an object where the key is the name of the timer and
the value is the current time for that timer.

```javascript
timer('a').start();
timer('b').start();
timer.summary(); // { a: 7.440999984741211, b: 7.440999984741211 }
```

### timer.Timer

Creates a new timer object.

```javascript
var myTimer = new timer.Timer();
```

### Timer.prototype.start

Start the timer. Chainable.

```javascript
var myTimer = new timer.Timer();
myTimer.start();
```

### Timer.prototype.stop

Stop the timer. Returns the current time segment (time since last `.start()` call)

```javascript
var myTimer = new timer.Timer();
myTimer.start();

// Long running task...

myTimer.stop();
```

### Timer.prototype.total

Get the total time, including all segments.

``` javascript
var myTimer = new timer.Timer();
myTimer.start();
// Long running task A...
myTimer.stop();

// Other stuff.

myTimer.start();
// Long running task B...
myTimer.stop();

console.log(myTimer.total()); // Total time for tasks A + B
```

### Timer.prototype.clear

Clear the timer.

```javascript
var myTimer = new timer.Timer();
myTimer.start();
// Long running task...
myTimer.stop();
myTimer.clear();
console.log(myTimer.total()); // 0
```

### Timer.prototype.reset

Reset the timer. Clears the current time and restarts.

```javascript
var myTimer = new timer.Timer();
myTimer.start();
// Long running task A...
myTimer.stop();
myTimer.reset();
// Long running task B...
myTimer.stop();
console.log(myTimer.total()); // Total time for task B
```

# Examples

```javascript
var timer = require('../index');

function pterodactyl () {
  timer('pterodactyl').start();

  var large = 1e8;
  while (large) {
    --large;
  }

  timer('pterodactyl').stop();
}

pterodactyl();

// Output the time it took to execute pterodactyl.
console.log('pterodactyl: %s seconds', timer('pterodactyl')); // pterodactyl: 0.1529998779296875 seconds

pterodactyl();

// Output the cumulative time it took to execute pterodactyl.
console.log('pterodactyl: %s seconds', timer('pterodactyl')); // pterodactyl: 0.30700016021728516 seconds

// Clear the timer and run the function again.
timer('pterodactyl').clear();
pterodactyl();

// The timer has started over.
console.log('pterodactyl: %s seconds', timer('pterodactyl')); // pterodactyl took 0.15400004386901855 seconds

pterodactyl();
console.log('pterodactly total time: %d', timer('pterodactyl').total()); // pterodactly total time: 0.30500006675720215

// Start a timer.
timer('foo').start();
// Stop a timer.
timer('foo').stop();
// Clear a timer.
timer('foo').clear();
// Reset the timer, clears and restarts.
timer('foo').reset();
// Get the current total time for the timer.
timer('foo').total();
```
