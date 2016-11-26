function todoItemHtml(todoItem, index) {
  var text = escapeEntities(todoItem.text());
  var checked = todoItem.isCompleted() ? 'checked="checked"' : '';
  return `<div class="view">
            <input class="toggle" type="checkbox" ${checked}>
            <label>${text}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="${text}">`;
}

function TodoItemView(todoItem, element, index) {
  var self = this;

  function attachHandlerForEditing(listItem) {
    var ESC_KEY = 27, RETURN_KEY = 13;

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
      editField.selectionStart = editField.selectionEnd = todoItem.text().length;
      editField.focus();
    }

    function rename() {
      if (editField.value.trim() == '')
        todoItem.destroy();
      else
        todoItem.rename(editField.value);
    }

    function cancelEdit() {
      editField.value = todoItem.text();
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
  }

  this.render = function() {
    element.innerHTML = todoItemHtml(todoItem, index);
    if (todoItem.isCompleted()) {
      element.setAttribute('class', 'completed')
    }
    element.setAttribute('data-index', index)

    element.querySelector('input.toggle').onchange = function(event) {
      todoItem.complete(event.target.checked);
      self.render();
    };

    element.querySelector('button.destroy').onclick = function(event) {
      todoItem.destroy();
    };

    attachHandlerForEditing(element);
  }
}