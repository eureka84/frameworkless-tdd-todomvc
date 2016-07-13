'use strict';

function TodoItem(text, observer) {
  var complete = false;

  this.text = function() {
    return text;
  }

  this.isCompleted = function() {
    return complete;
  }

  this.complete = function(isComplete) {
    complete = isComplete;
    if (observer) observer.notify()
  }

  this.rename = function(newText) {
    if (text == newText)
      return;
    text = newText.trim();
    if (observer) observer.notify()
  }
}

function TodoList() {
  var todoItems = [];
  var observers = [];
  var self = this;
  var filterAll = function(el) { return true; };
  var filterActive = function(el) { return !el.isCompleted(); }
  var filterCompleted = function(el) { return el.isCompleted(); }
  var selectedFilter = filterAll;

  this.length = 0;

  this.notify = function() {
    observers.forEach(function(observer) {
      observer.notify(self);
    })
  }

  this.subscribe = function(observer) {
    observers.push(observer);
  }

  this.push = function() {
    for (var i=0; i<arguments.length; i++)
      todoItems.push(new TodoItem(arguments[i], this));
    this.length = todoItems.length;
    this.notify();
  }

  this.at = function(index) {
    return todoItems.filter(selectedFilter)[index];
  }

  this.forEach = function(f) {
    todoItems.filter(selectedFilter).forEach(f);
  }

  this.complete = function(index, isCompleted) {
    todoItems[index].complete(isCompleted);
    this.notify();
  }

  this.clearCompleted = function() {
    todoItems = todoItems.filter(filterActive);
    this.length = todoItems.length;
    this.notify();
  }

  this.destroy = function(index) {
    todoItems.splice(index, 1);
    this.length = todoItems.length
    this.notify();
  }

  this.itemsLeft = function() {
    return todoItems.filter(function(todo) { return !todo.isCompleted(); }).length
  }

  this.filter = function(filterName) {
    var filtersByName = {
      'active': filterActive,
      'completed': filterCompleted
    }
    selectedFilter = filtersByName[filterName] || filterAll;
    this.notify();
  }

  this.containsCompletedItems = function() {
    return todoItems.length > todoItems.filter(filterActive).length;
  }

  this.serializeTo = function(storage) {
    todoItems.forEach(function(item, index) {
      storage[index] = { text: item.text(), completed: item.isCompleted() };
    });
  }
}


function TodoListView(todoList, document) {
  var self = this;
  todoList.subscribe(self);

  function todoItem(todo, index) {
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
      replace(/{{text}}/g, todo.text()).
      replace(/{{index}}/g, index).
      replace(/{{checked}}/, todo.isCompleted() ? 'checked="checked"' : '').
      replace(/{{completed}}/, todo.isCompleted() ? 'class="completed"' : '');
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
    return match[1];
  }

  function syncSelectedClassOnLinks(fragment) {
    document.querySelectorAll('.filters a').forEach(function(element) {
      if (element.attributes.href.value == '#/' + fragment)
        element.className = 'selected';
      else
        element.className = '';
    })
  }

  this.render = function() {
    window.onpopstate = function() {
      var fragment = fragmentFromLocation();
      model.filter(fragment);
      syncSelectedClassOnLinks(fragment);
    }

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

function TodoMvcRepository(storage) {
  var STORAGE_KEY = 'it.xpug.todomvc'

  this.save = function(todoList) {
    var serialized = [];
    todoList.serializeTo(serialized);
    storage.setItem(STORAGE_KEY, {items: serialized});
  }

  this.restore = function() {
    var saved = storage.getItem(STORAGE_KEY);
    var todoList = new TodoList();
    if (!saved) return todoList;
    saved.items.forEach(function(item) {
      todoList.push(item.text);
    })
    return todoList;
  }
}
