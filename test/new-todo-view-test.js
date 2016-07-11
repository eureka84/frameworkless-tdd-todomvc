'use strict';

describe('input for new todo', function() {
  var $,todoList, view;

  beforeEach(function() {
    var fixture = document.createElement('div');
    fixture.innerHTML = '<input class="new-todo">';
    $ = function(selector) { return fixture.querySelector(selector); }
    todoList = new TodoList();
    view = new NewTodoView(todoList, fixture);
  })

  it('allows user to add an item', function() {
    view.render();

    // user inputs new item
    var input = $('input.new-todo');
    input.value = 'fee foo fum'
    input.onchange({target: input});

    expect(todoList.length).equal(1, 'model is changed');
    expect(todoList.at(0).text()).equal('fee foo fum', 'text was copied');
  });

  it('clears the input field after change', function() {
    view.render();

    // user inputs new item
    var input = $('input.new-todo');
    input.value = 'what ever'
    input.onchange({target: input});

    expect(input.value).equal('', 'input field was cleared');
  });
});

