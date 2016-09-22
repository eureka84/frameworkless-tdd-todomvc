function todoItemHtml(todoItem, index) {
  var template =
      '<div class="view">' +
        '<input class="toggle" type="checkbox" {{checked}}>' +
        '<label>{{text}}</label>' +
        '<button class="destroy"></button>' +
      '</div>' +
      '<input class="edit" value="{{text}}">';
  return template.
    replace(/{{text}}/g, escapeEntities(todoItem.text())).
    replace(/{{checked}}/, todoItem.isCompleted() ? 'checked="checked"' : '');
}

function TodoItemView(todoItem, element, index) {  
  var self = this;
  
  this.render = function() {
    element.innerHTML = todoItemHtml(todoItem, index);
    if (todoItem.isCompleted()) {
      element.setAttribute('class', 'completed')
    }
    element.setAttribute('data-index', index)
    
    element.querySelector('input').onchange = function(event) {
      todoItem.complete(event.target.checked);
      self.render();
    };
  }
}