'use strict';

describe('the todolist view', function() {
  var todoList, view, fixture;

  beforeEach(function() {
    fixture = createFakeDocument('<ul class="todo-list"></ul>');
    todoList = new TodoList();
    view = new TodoListView(todoList, fixture);
  })

  it('renders an empty todo list', function() {
    view.render();
    expect($('ul.todo-list').children.length).to.equal(0);
  });

  it('renders a list of one element', function() {
    todoList.push(aTodoItem('Pippo'));
    view.render();
    expect($('li label').textContent).equal('Pippo');
    expect($('input.edit').value).equal('Pippo');
  });

  it('renders a completed todoItem', function() {
    todoList.push('Something');
    todoList.at(0).complete(true);

    view.render();

    expect($('li.completed')).not.equal(null, 'added class');
    expect($('li.completed input.toggle').checked).equal(true, 'checked box');
  });

  it('renders a list of two elements', function() {
    todoList.push(aTodoItem('Foo'), aTodoItem('Bar'));

    view.render();

    var actualLabels = $all('li label');
    expect(actualLabels[0].textContent).equal('Foo');
    expect(actualLabels[1].textContent).equal('Bar');
  });

  it('renders automatically when list changes', function() {
    todoList.push('ohilala');

    expect($('li label').textContent).equal('ohilala');
  });

  it('allows user to delete an item', function() {
    todoList.push(aTodoItem(), aTodoItem(), aTodoItem());
    view.render();
    expect(todoList.length).equal(3);
    expect($all('li').length).equal(3);

    // user deletes first item
    var item = $('li:nth-child(1) button.destroy');
    item.onclick({target: item});

    expect(todoList.length).equal(2, 'model is changed');
    expect($all('li').length).equal(2, 'html is updated');
  });

  describe('editing an item', function() {
    var listItem, editField;

    beforeEach(function() {
      todoList.push('aaa', 'bb');
      editField = $('li:nth-child(1) input.edit');

      // user double clicks on first item
      listItem = $('li:nth-child(1)');
      var target = $('li:nth-child(1) label');
      listItem.ondblclick({target: target});
    })

    it('destroys the element when editText is empty', function() {
      editField.value = ''

      listItem.onkeyup({keyCode: 13});

      expect(todoList.length).equal(1, 'element count')
      expect(todoList.at(0).text()).equal('bb', 'destroyed the wrong element')
    });
  });

  function $(selector) { return fixture.querySelector(selector); }
  function $all(selector) { return fixture.querySelectorAll(selector); }
});

function aTodoItem(text) {
  return text || 'Anything';
}
