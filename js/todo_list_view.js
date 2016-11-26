function TodoListView(todoList, document) {
  var self = this;
  todoList.addObserver(self);

  function replaceListInDocument() {
    var target = document.querySelector('ul.todo-list');
    target.innerHTML = '';

    todoList.forEach(function(todoItem, index) {
      var li = target.ownerDocument.createElement('li');
      target.appendChild(li);
      var view = new TodoItemView(todoItem, li, index);
      view.render();
    });
  }

  this.notify = function() {
    this.render();
  }

  this.render = function() {
    replaceListInDocument();
  }
}
