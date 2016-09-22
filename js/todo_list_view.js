function TodoListView(todoList, document) {
  var self = this;
  todoList.subscribe(self);

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
    var myDocument = document.querySelector('ul.todo-list');
    myDocument.innerHTML = '';

    todoList.forEach(function(todoItem, index) {
      var li = myDocument.ownerDocument.createElement(li);
      myDocument.appendChild(li);
      var view = new TodoItemView(todoItem, li, index);
      view.render();
    });    
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
