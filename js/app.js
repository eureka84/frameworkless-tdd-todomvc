function TodoApp(gui) {
  var todos = [];

  this.addTodoItem = function(todo) {
    todos.push(todo);
    gui.show('footer.footer');
    gui.addListElement('ul.todo-list', todo)
  }

  this.bind = function() {
    var self = this;
    gui.onchange('input.new-todo', function(todo) { self.addTodoItem(todo) });
    gui.hide('footer.footer');
    gui.clear('ul.todo-list');
  }

  this.todoItems = function() {
    return todos;
  }
}
