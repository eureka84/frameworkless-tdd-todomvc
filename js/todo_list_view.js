function TodoListView(todoList, document) {
  var self = this;
  todoList.addObserver(self);

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
          todoList.destroy(todoList.at(index));
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
    attachListenersForEditing();
  }
}
