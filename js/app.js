
function TodoListView(todoList, document) {

  function todoItem(todo, index) {
    var template =
      '<li {{completed}}>' +
        '<div class="view">' +
          '<input class="toggle" type="checkbox" {{checked}} data-index="{{index}}">' +
          '<label>{{text}}</label>' +
          '<button class="destroy"></button>' +
        '</div>' +
        '<input class="edit" value="{{text}}">' +
      '</li>';
    return template.
      replace(/{{text}}/g, todo.text).
      replace(/{{index}}/, index).
      replace(/{{checked}}/, todo.completed ? 'checked="checked"' : '').
      replace(/{{completed}}/, todo.completed ? 'class="completed"' : '');
  }

  function html() {
    var result = '<ul class="todo-list">';
    todoList.forEach(function(todo, index) {
      result += todoItem(todo, index);
    });
    return result + '</ul>';
  }

  this.render = function() {
    var self = this;
    document.querySelector('ul.todo-list').outerHTML = html();
    document.querySelectorAll('input.toggle').forEach(function(checkbox) {
	    checkbox.onchange = function(event) {
        var index = event.target.attributes['data-index'].value;
        todoList[index].completed = true;
        self.render();
	    };
    });
  }
}

