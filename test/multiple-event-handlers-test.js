function registerHandler(element, handlerName, handler) {
  element[handlerName] = handler;
}

describe('multiple event handlers', function() {
  it('', function() {
    var element = {}, callLog = "";

    registerHandler(element, 'onsomething', function() { callLog += "foo "});
    element.onsomething();

    expect(callLog).equal("foo ");
  });

});


// two funcs

// pass args