'use strict';

describe('the todolist view', function() {
  var fixture;
  var $, $all;

  beforeEach(function() {
    fixture = document.createElement('div');
    fixture.innerHTML = '<ul class="todo-list"></ul>';
    $ = function(selector) { return fixture.querySelector(selector); }
    $all = function(selector) { return fixture.querySelectorAll(selector); }
  })

  it('renders an empty todo list', function() {
    new TodoListView([], fixture).render();
    expect($('ul.todo-list').children.length).to.equal(0);
  });

  it('renders a list of one element', function() {
    var todoList = [aTodoItem('Pippo')];
    new TodoListView(todoList, fixture).render();
    expect($('ul.todo-list li label').textContent).equal('Pippo');
    expect($('ul.todo-list input.edit').value).equal('Pippo');
  });

  it('renders a completed todoItem', function() {
    var todoList = [{ text: 'Something', completed: true }];

    new TodoListView(todoList, fixture).render();

    expect($('ul.todo-list li.completed label').textContent).equal('Something');
  });

  it('renders a list of two elements', function() {
    var todoList = [aTodoItem('Foo'), aTodoItem('Bar')];

    new TodoListView(todoList, fixture).render();

    var actualLabels = $all('ul.todo-list li label');
    expect(actualLabels[0].textContent).equal('Foo');
    expect(actualLabels[1].textContent).equal('Bar');
  });

  it('responds when user completes an item', function() {
    var todoList = [aTodoItem(), aTodoItem(), aTodoItem()];
    var view = new TodoListView(todoList, fixture);

    new TodoListView(todoList, fixture).render();

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


