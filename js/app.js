'use strict';

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

