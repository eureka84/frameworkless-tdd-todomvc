
function TodoListView(todoList) {

  function todoItem(todo, index) {
    var template =
      '<li {{completed}}>' +
        '<div class="view">' +
          '<input class="toggle" type="checkbox" data-index="{{index}}">' +
          '<label>{{text}}</label>' +
          '<button class="destroy"></button>' +
        '</div>' +
        '<input class="edit" value="{{text}}">' +
      '</li>';
    return template.
      replace(/{{text}}/g, todo.text).
      replace(/{{index}}/, index).
      replace(/{{completed}}/, todo.completed ? 'class="completed"' : '');
  }

  this.render = function() {
    var result = '<ul class="todo-list">';
    todoList.forEach(function(todo, index) {
      result += todoItem(todo, index);
    });
    return result + '</ul>';
  }

  this.onTodoItemChecked = function(event) {
    var index = event.target.attributes['data-index'].value;
    todoList[index].completed = true;
  }
}

