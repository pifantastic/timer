
var timer = require('../index');

exports.timer = {
  'invocation' : function (test) {
    test.expect(2);
    test.ok(timer().constructor.name === 'Timer', 'should return a Timer object');
    test.ok(timer('foo').constructor.name === 'Timer', 'should return a Timer object');
    test.done();
  }
};

exports.Timer = {
  'constructor' : function (test) {
    test.expect(4);
    var myTimer = new timer.Timer();
    test.ok(myTimer.constructor.name === 'Timer', 'should return a Timer object');
    test.ok(Array.isArray(myTimer._segments), 'should initialize empty segments array');
    test.ok(myTimer._segments.length === 0, 'should initialize empty segments array');
    test.ok(myTimer._start === null, 'start time should be null');
    test.done();
  },
  'start' : function (test) {
    test.expect(3);
    var myTimer = new timer.Timer();
    myTimer.start();
    test.ok(myTimer.total() >= 0, 'should start the timer');
    var total = myTimer.total();
    test.ok(myTimer.total() >= total, 'should not restart timer if called twice');
    test.ok(myTimer.start().constructor.name === 'Timer', 'should be chainable');
    test.done();
  },
  'stop' : function (test) {
    test.expect(2);
    var myTimer = new timer.Timer();
    myTimer.start();
    myTimer.stop();
    test.ok(myTimer._start === null, 'should reset the current segment');
    myTimer.start();
    setTimeout(function () {
      myTimer.stop();
      test.ok(myTimer.total() > 0, 'should record non-zero time')
      test.done();
    }, 10);
  },
  'total' : function (test) {
    test.expect(2);
    var myTimer = new timer.Timer();
    test.ok(myTimer.total() === 0, 'should return 0 if timer hasn\'t been started');
    myTimer.start();
    setTimeout(function () {
      var seg1 = myTimer.stop();
      myTimer.start();
      setTimeout(function () {
        var seg2 = myTimer.stop();
        test.ok(seg1 + seg2 === myTimer.total(), 'should sum all segments');
        test.done();
      }, 10);
    }, 10)
  },
  'clear' : function (test) {
    test.expect(2);
    var myTimer = new timer.Timer();
    myTimer.start();
    setTimeout(function () {
      myTimer.stop();
      myTimer.clear();
      test.ok(myTimer.total() === 0, 'should set time to 0');
      test.ok(myTimer.clear().constructor.name === 'Timer', 'should be chainable');
      test.done();
    }, 10);
  },
  'reset' : function (test) {
    test.expect(2);
    var myTimer = new timer.Timer();
    test.ok(myTimer.reset().constructor.name === 'Timer', 'should be chainable');
    myTimer.start();
    setTimeout(function () {
      myTimer.stop();
      myTimer.start();
      setTimeout(function () {
        var total = myTimer.total();
        myTimer.reset();
        test.ok(myTimer.total() < total, 'should reset all segments');
        test.done();
      }, 10);
    }, 10)
  }
};

