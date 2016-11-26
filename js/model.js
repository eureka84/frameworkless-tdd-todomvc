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

function TodoList() {
  var todoItems = [];
  var observers = new ObserversList();
  var self = this;
  var filterAll = function(el) { return true; };
  var filterActive = function(el) { return !el.isCompleted(); }
  var filterCompleted = function(el) { return el.isCompleted(); }
  var selectedFilter = filterAll;

  this.length = 0;

  this.notify = function() {
    observers.notify(self);
  }

  this.addObserver = function(observer) {
    observers.add(observer);
  }

  this.push = function() {
    for (var i=0; i<arguments.length; i++) {
      var todoItem = new TodoItem(arguments[i])
      todoItem.addObserver(self);
      todoItem.setParent(self);
      todoItems.push(todoItem);
    }

    this.length = todoItems.length;
    observers.notify(self);
  }

  this.at = function(index) {
    return todoItems.filter(selectedFilter)[index];
  }

  this.forEach = function(f) {
    todoItems.filter(selectedFilter).forEach(f);
  }

  this.clearCompleted = function() {
    todoItems = todoItems.filter(filterActive);
    this.length = todoItems.length;
    observers.notify(self);
  }

  this.destroy = function(item) {
    var index = todoItems.indexOf(item);
    if (index < 0) throw new Error(`item not found: ${item}`)
    todoItems.splice(index, 1);
    this.length = todoItems.length
    item.removeObserver(this)
    observers.notify(self);
  }

  this.itemsLeft = function() {
    return todoItems.filter(function(todo) { return !todo.isCompleted(); }).length
  }

  this.filter = function(filterName) {
    var filtersByName = {
      'active': filterActive,
      'completed': filterCompleted
    }
    selectedFilter = filtersByName[filterName] || filterAll;
    observers.notify(self);
  }

  this.containsCompletedItems = function() {
    return todoItems.length > todoItems.filter(filterActive).length;
  }

  this.containsUncompletedItems = function() {
    return todoItems.length > todoItems.filter(filterCompleted).length;
  }

  this.allItemsAreCompleted = function() {
    return todoItems.length == todoItems.filter(filterCompleted).length;
  }

  this.serializeTo = function(storage) {
    todoItems.forEach(function(item, index) {
      storage[index] = { text: item.text(), completed: item.isCompleted() };
    });
  }

  this.toggleAll = function() {
    var shouldComplete = self.containsUncompletedItems();
    todoItems.forEach(function(item) {
      item.complete(shouldComplete);
    })
  }
}
