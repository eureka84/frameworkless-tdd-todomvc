'use strict';

function TodoListView(todoList, document) {
  var self = this;

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

  function attachChangeListenerForToggles() {
    document.querySelectorAll('input.toggle').forEach(function(checkbox) {
	    checkbox.onchange = function(event) {
        var index = event.target.attributes['data-index'].value;
        todoList[index].completed = true;
        self.render();
	    };
    });
  }

  function replaceListInDocument() {
    document.querySelector('ul.todo-list').outerHTML = html();
  }

  this.render = function() {
    replaceListInDocument();
    attachChangeListenerForToggles();
  }
}

function FooterView(todoList, document) {
  function html() {
    var template = '<footer class="footer">' +
      '<span class="todo-count"><strong>{{count}}</strong> items left</span>' +
      '</footer>';
    return template.replace(/{{count}}/, todoList.length);
  }

  this.notify = function(todoList) {
    this.render();
  }

  this.render = function() {
    document.querySelector('footer.footer').outerHTML = html();
    document.querySelector('footer.footer').style.display =
      (todoList.length == 0) ? 'none' : 'block';
  }
}


