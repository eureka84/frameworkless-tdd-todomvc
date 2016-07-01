function TodoApp(gui) {
  var todos = [];
  var nextId = 0;

  this.addTodoItem = function(todo) {
    var item = {
      text: todo,
      checked: false,
      id: nextId++
    };
    todos.push(item);
    gui.showFooter();
    gui.addListElement(item)
    gui.clearInputField();
    updateView();
  }

  this.check = function(itemId) {
    for(var i=0; i<todos.length; i++) {
      if (todos[i].id === itemId)
        todos[i].checked = true;
    }
  }

  this.bind = function() {
    var self = this;
    gui.onNewTodoItem(function(todo) { self.addTodoItem(todo) });
    gui.hideFooter();
    gui.clearTodoList();
    updateView();
  }

  this.todoItems = function() {
    return todos;
  }

  function updateView() {
    gui.showTodoCount(todos.length);
  }

}
