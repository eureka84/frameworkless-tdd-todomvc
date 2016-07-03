'use strict';

describe('the todolist view', function() {
  var fixture;
  var $, $all;

  beforeEach(function() {
    fixture = document.createElement('div');
    $ = function(selector) { return fixture.querySelector(selector); }
    $all = function(selector) { return fixture.querySelectorAll(selector); }
  })

  it('renders an empty todo list', function() {
    expect(new TodoListView([]).render()).to.equal('<ul class="todo-list"></ul>');
  });

  it('renders a list of one element', function() {
    var todoList = [aTodoItem('Pippo')];
    fixture.innerHTML = new TodoListView(todoList).render();
    expect($('ul.todo-list li label').textContent).equal('Pippo');
    expect($('ul.todo-list input.edit').value).equal('Pippo');
  });

  it('renders a completed todoItem', function() {
    var todoList = [{ text: 'Something', completed: true }];

    fixture.innerHTML = new TodoListView(todoList).render();

    expect($('ul.todo-list li.completed label').textContent).equal('Something');
  });

  it('renders a list of two elements', function() {
    var todoList = [aTodoItem('Foo'), aTodoItem('Bar')];

    fixture.innerHTML = new TodoListView(todoList).render();

    var actualLabels = $all('ul.todo-list li label');
    expect(actualLabels[0].textContent).equal('Foo');
    expect(actualLabels[1].textContent).equal('Bar');
  });

  it('responds when user completes an item', function() {
    var todoList = [aTodoItem(), aTodoItem(), aTodoItem()];
    var view = new TodoListView(todoList);
    fixture.innerHTML = new TodoListView(todoList).render();

    view.onTodoItemChecked({target: $('li:nth-child(2) input.toggle')});

    expect(todoList[1].completed).equal(true, 'now it\'s completed');
  });

  function aTodoItem(text) {
    return {
      text: text || 'Anything'
    };
  }
});


