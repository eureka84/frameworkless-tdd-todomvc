function TodoListView(todoList, document) {
  var self = this;
  todoList.addObserver(self);

  this.notify = function() {
    this.render();
  }

  this.render = function() {
    var target = document.querySelector('ul.todo-list');
    target.innerHTML = '';

    todoList.forEach(function(todoItem) {
      var li = target.ownerDocument.createElement('li');
      target.appendChild(li);
      var view = new TodoItemView(todoItem, li);
      view.render();
    });
  }
}
