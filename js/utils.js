
function ObserversList() {
  var observers = [];

  this.notify = function(subject) {
    observers.forEach(function(observer) {
      observer.notify(subject);
    })
  }

  this.add = function(observer) {
    observers.push(observer);
  }

  this.contains = function(observer) {
    return observers.indexOf(observer) >= 0;
  }

  this.remove = function(observer) {
    if (!this.contains(observer))
      throw new Error(`Observer ${observers} not found`)
    observers.splice(observers.indexOf(observer), 1)
  }
}

function registerHandler(element, handlerName, handler) {
  var previous = element[handlerName] || function() {};
  element[handlerName] = function(x) {
    previous(x);
    handler(x);
  };
}

function escapeEntities(text) {
  return text.
    replace(/&/g, '&amp;').
    replace(/</g, '&lt;').
    replace(/>/g, '&gt;').
    replace(/"/g, '&quot;').
    replace(/'/g, '&#x27;')
    ;
}

