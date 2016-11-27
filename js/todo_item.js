'use strict';

function TodoItem(text) {
  var complete = false;
  var observers = new ObserversList();
  var parent;

  this.text = function() {
    return text;
  }

  this.isCompleted = function() {
    return complete;
  }

  this.complete = function(isComplete) {
    complete = isComplete;
    observers.notify(this)
  }

  this.rename = function(newText) {
    if (text == newText)
      return;
    text = newText.trim();
    observers.notify(this)
  }

  this.setParent = function(p) {
    parent = p;
  }

  this.destroy = function() {
    parent.destroy(this);
  }

  this.addObserver = function(observer) {
    observers.add(observer);
  }

  this.removeObserver = function(observer) {
    observers.remove(observer);
  }
}
