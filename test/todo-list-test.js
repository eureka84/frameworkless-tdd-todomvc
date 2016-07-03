'use strict';

describe('the todolist view', function() {
  var fixture, $, $all, todoList, view;

  beforeEach(function() {
    fixture = document.createElement('div');
    fixture.innerHTML = '<ul class="todo-list"></ul>';
    $ = function(selector) { return fixture.querySelector(selector); }
    $all = function(selector) { return fixture.querySelectorAll(selector); }
    todoList = [];
    view = new TodoListView(todoList, fixture);
  })

  it('renders an empty todo list', function() {
    view.render();
    expect($('ul.todo-list').children.length).to.equal(0);
  });

  it('renders a list of one element', function() {
    todoList.push(aTodoItem('Pippo'));
    view.render();
    expect($('ul.todo-list li label').textContent).equal('Pippo');
    expect($('ul.todo-list input.edit').value).equal('Pippo');
  });

  it('renders a completed todoItem', function() {
    todoList.push({ text: 'Something', completed: true });

    view.render();

    expect($('li.completed label').textContent).equal('Something');
    expect($('li.completed input.toggle').checked).equal(true);
  });

  it('renders a list of two elements', function() {
    todoList.push(aTodoItem('Foo'), aTodoItem('Bar'));

    view.render();

    var actualLabels = $all('ul.todo-list li label');
    expect(actualLabels[0].textContent).equal('Foo');
    expect(actualLabels[1].textContent).equal('Bar');
  });

  it('responds when user completes an item', function() {
    todoList.push(aTodoItem(), aTodoItem(), aTodoItem());
    view.render();

    // user clicks on second item
    var secondItem = $('li:nth-child(2) input.toggle');
    secondItem.onchange({target: secondItem});

    expect(todoList[1].completed).equal(true, 'model is changed');
    expect($('li:nth-child(2)').attributes['class'].value).equal('completed', 'html is updated');
  });

  function aTodoItem(text) {
    return {
      text: text || 'Anything'
    };
  }
});


