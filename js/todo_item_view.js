
function todoItemHtml(todoItem, index) {
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
    replace(/{{text}}/g, escapeEntities(todoItem.text())).
    replace(/{{index}}/, index).
    replace(/{{checked}}/, todoItem.isCompleted() ? 'checked="checked"' : '').
    replace(/{{completed}}/, todoItem.isCompleted() ? 'class="completed"' : '');
}

function TodoItemView(document, todoItem) {
  
}