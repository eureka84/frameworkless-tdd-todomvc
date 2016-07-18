describe('multiple event handlers', function() {
  var element, callLog;

  beforeEach(function() {
    element = {};
    callLog = '';
  })

  it('chains one handler', function() {
    registerHandler(element, 'onsomething', function() { callLog += 'foo '});
    element.onsomething();

    expect(callLog).equal('foo ');
  });

  it('chains two handlers', function() {
    registerHandler(element, 'onsomething', function() { callLog += 'foo '});
    registerHandler(element, 'onsomething', function() { callLog += 'bar '});
    element.onsomething();

    expect(callLog).equal('foo bar ');
  });

  it('passes along the first argument', function() {
    registerHandler(element, 'onsomething', function(a) { callLog += a });
    registerHandler(element, 'onsomething', function(a) { callLog += a });
    element.onsomething("x ");

    expect(callLog).equal('x x ');
  });
});
