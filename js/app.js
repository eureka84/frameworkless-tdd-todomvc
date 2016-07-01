function TodoApp(gui) {
  var todos = [];

  this.addTodoItem = function(todo) {
    var item = {
      text: todo,
      checked: false
    };
    todos.push(item);
    gui.showFooter();
    gui.addListElement('ul.todo-list', item)
    gui.setValue('input.new-todo', '');
    updateView();
  }

  this.bind = function() {
    var self = this;
    gui.onNewTodoItem(function(todo) { self.addTodoItem(todo) });
    gui.hideFooter();
    gui.clear('ul.todo-list');
    updateView();
  }

  this.todoItems = function() {
    return todos;
  }

  function updateView() {
    gui.showTodoCount(todos.length);
  }
}
