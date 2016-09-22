
function todoItemHtml(todo, index) {
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
