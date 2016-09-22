'use strict';

function todoItemHtml(todo, index) {
  function escapeEntities(text) {
    return text.
      replace(/&/g, '&amp;').
      replace(/</g, '&lt;').
      replace(/>/g, '&gt;').
      replace(/"/g, '&quot;').
      replace(/'/g, '&#x27;')
      ;
  }

  var template =
    '<li {{completed}} data-index="{{index}}">' +
      '<div class="view">' +
        '<input class="toggle" type="checkbox" {{checked}}>' +
        '<label>{{text}}</label>' +
        '<button class="destroy"></button>' +
      '</div>' +
      '<input class="edit" value="{{text}}">' +
    '</li>';
  return template.
    replace(/{{text}}/g, escapeEntities(todo.text())).
    replace(/{{index}}/, index).
    replace(/{{checked}}/, todo.isCompleted() ? 'checked="checked"' : '').
    replace(/{{completed}}/, todo.isCompleted() ? 'class="completed"' : '');
}

function TodoListView(todoList, document) {
  var self = this;
  todoList.subscribe(self);

  function html() {
    var result = '<ul class="todo-list">';
    todoList.forEach(function(todo, index) {
      result += todoItemHtml(todo, index);
    });
    return result + '</ul>';
  }

  function attachChangeListenerForToggles() {
    document.querySelectorAll('input.toggle').forEach(function(checkbox) {
	    checkbox.onchange = function(event) {
        var index = event.target.parentNode.parentNode.attributes['data-index'].value;
        todoList.complete(index, event.target.checked);
        self.render();
	    };
    });
  }

  function attachListenerForDestroyButtons() {
    document.querySelectorAll('button.destroy').forEach(function(button) {
	    button.onclick = function(event) {
        var index = event.target.parentNode.parentNode.attributes['data-index'].value;
        todoList.destroy(index);
        self.render();
	    };
    });
  }

  function attachListenersForEditing() {
    var ESC_KEY = 27, RETURN_KEY = 13;

    document.querySelectorAll('ul.todo-list li').forEach(function(listItem) {
      var index = listItem.attributes['data-index'].value;
      var view = listItem.querySelector('.view');
      var editField = listItem.querySelector('input.edit');

      function stopEditing() {
        listItem.className = '';
        view.style.display = 'block';
        editField.style.display = 'none';
      }

      function startEditing() {
        listItem.className = 'editing';
        view.style.display = 'none';
        editField.style.display = 'block';
        editField.selectionStart = editField.selectionEnd = todoList.at(index).text().length;
        editField.focus();
      }

      function rename() {
        if (editField.value.trim() == '')
          todoList.destroy(index);
        else
          todoList.at(index).rename(editField.value);
      }

      function cancelEdit() {
        editField.value = todoList.at(index).text();
      }

      listItem.onkeyup = function(event) {
        if (event.keyCode == ESC_KEY) {
          editField.onblur = undefined;
          cancelEdit();
          stopEditing();
        }
        else if (event.keyCode == RETURN_KEY) {
          editField.onblur = undefined;
          rename();
          stopEditing();
        }
      }

	    listItem.ondblclick = function(event) {
	      startEditing();
        editField.onblur = function(ev) {
          stopEditing();
          rename();
        }
	    };
    });
  }

  function replaceListInDocument() {
    document.querySelector('ul.todo-list').outerHTML = html();
  }

  this.notify = function() {
    this.render();
  }

  this.render = function() {
    replaceListInDocument();
    attachChangeListenerForToggles();
    attachListenerForDestroyButtons();
    attachListenersForEditing();
  }
}

function FooterView(todoList, document) {
  todoList.subscribe(this)

  function html() {
    var template =
      '<span class="todo-count"><strong>{{count}}</strong> item{{plural}} left</span>';
    return template.
      replace(/{{count}}/, todoList.itemsLeft()).
      replace(/{{plural}}/, todoList.itemsLeft() == 1 ? '' : 's')
      ;
  }

  this.notify = function() {
    this.render();
  }

  this.render = function() {
    document.querySelector('.todo-count').outerHTML = html();
    document.querySelector('footer.footer').style.display =
      (todoList.length == 0) ? 'none' : 'block';
  }
}

function NewTodoView(todoList, document) {
  this.render = function() {
    document.querySelector('input.new-todo').onchange = function(event) {
      todoList.push(event.target.value);
      event.target.value = '';
    }
  }
}

function FilterByStatusView(model, document) {
  function fragmentFromLocation() {
    var match = /#\/([a-z]*)$/.exec(document.location);
    return match && match[1];
  }

  function filterLinkFor(fragment) {
    var selector = '.filters a[href="#/FRAGMENT"]'.replace(/FRAGMENT/, fragment);
    return document.querySelector(selector);
  }

  function syncSelectedClassOnLinks(fragment) {
    document.querySelectorAll('.filters a').forEach(function(element) {
        element.className = '';
    });
    (filterLinkFor(fragment) || filterLinkFor('')).className = 'selected';
  }

  this.render = function() {
    registerHandler(window, 'onpopstate', function() {
      var fragment = fragmentFromLocation();
      model.filter(fragment);
      syncSelectedClassOnLinks(fragment);
    });

    window.onpopstate();
  }
}

function ClearCompletedView(todoList, document) {
  todoList.subscribe(this);

  this.notify = function() {
    this.render();
  }

  this.render = function() {
    var button = document.querySelector('.clear-completed');
    button.style.display = (todoList.containsCompletedItems()) ? 'block' : 'none';
    button.onclick = function() {
      todoList.clearCompleted();
    }
  }
}

function FragmentRepository(storage, document) {
  var KEY_FRAGMENT   = 'it.xpug.todomvc.fragment';

  registerHandler(window, 'onpopstate', function() {
    storage.setItem(KEY_FRAGMENT, document.location.hash);
  });

  this.restore = function() {
    var fragment = storage.getItem(KEY_FRAGMENT);
    if (fragment)
      document.location.hash = fragment;
  }
}

function TodoMvcRepository(storage, document) {
  var KEY_TODO_ITEMS = 'it.xpug.todomvc.items';

  this.notify = function(todoList) {
    var serialized = [];
    todoList.serializeTo(serialized);
    storage.setItem(KEY_TODO_ITEMS, JSON.stringify(serialized));
  }

  this.restore = function() {
    var saved = storage.getItem(KEY_TODO_ITEMS);
    var todoList = new TodoList();
    if (!saved) return todoList;
    JSON.parse(saved).forEach(function(item, index) {
      todoList.push(item.text);
      todoList.at(index).complete(item.completed)
    })
    return todoList;
  }
}

function ToggleAllView(todoList, document) {
  todoList.subscribe(this);

  this.notify = function() { this.render(); }

  this.render = function() {
    var toggleAll = document.querySelector('.toggle-all');
    toggleAll.style.display = (todoList.length == 0) ? 'none' : 'block';
    toggleAll.checked = todoList.allItemsAreCompleted();
    toggleAll.onclick = function() {
      todoList.toggleAll();
    }
  }
}

