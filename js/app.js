function TodoApp(gui) {
  var todos = [];

  this.addTodoItem = function(todo) {
    var item = {
      text: todo,
      checked: false
    };
    todos.push(item);
    gui.showFooter();
    gui.addListElement(item)
    gui.clearInputField();
    updateView();
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
