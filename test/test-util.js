
function createFakeDocument(html) {
  var fakeDocument = document.createElement('div');
  fakeDocument.innerHTML = html;
  return fakeDocument;
}

var fakeLocalStorage = {
  setItem: function(key, value) {
    actualStorage[key] = escape(value);
  },
  getItem: function(key) {
    if (actualStorage.hasOwnProperty(key))
      return unescape(actualStorage[key]);
    return null;
  },
  clear: function() {
    actualStorage = {};
  }
}

function expectVisible(element) {
  var message = 'expected ELEMENT to be visible'.replace(/ELEMENT/, element);
  expect(element.style.display).equal('block', message);
}

function expectDefaultVisibility(element) {
  var message = 'expected ELEMENT to be default (inherited)'.replace(/ELEMENT/, element);
  expect(element.style.display).equal('', message);
}

function expectHidden(element) {
  var message = 'expected ELEMENT to be hidden'.replace(/ELEMENT/, element);
  expect(element.style.display).equal('none', message);
}

