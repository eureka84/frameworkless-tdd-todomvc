
function TodoListView(todoList) {

  function todoItem(todo) {
    var template =
      '<li {{completed}}>' +
        '<div class="view">' +
          '<input class="toggle" type="checkbox">' +
          '<label>{{text}}</label>' +
          '<button class="destroy"></button>' +
        '</div>' +
        '<input class="edit" value="{{text}}">' +
      '</li>';
    return template.
      replace(/{{text}}/g, todo.text).
      replace(/{{completed}}/, todo.completed ? 'class="completed"' : '');
  }

  this.render = function() {
    var result = '<ul class="todo-list">';
    todoList.forEach(function(todo) {
      result += todoItem(todo);
    });
    return result + '</ul>';
  }
}

