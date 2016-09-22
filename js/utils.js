
function ObserversList() {
  var observers = [];
  
  this.notify = function(subject) {
    observers.forEach(function(observer) {
      observer.notify(subject);
    })
  }
  
  this.subscribe = function(observer) {
    observers.push(observer);
  }    
}

function registerHandler(element, handlerName, handler) {
  var previous = element[handlerName] || function() {};
  element[handlerName] = function(x) {
    previous(x);
    handler(x);
  };
}
