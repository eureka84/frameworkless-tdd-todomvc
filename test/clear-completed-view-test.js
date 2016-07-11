'use strict';

describe('the view for the clear complete button', function() {
  var todoList, fakeDocument, view;

  beforeEach(function() {
    todoList = new TodoList();
    todoList.push('x', 'y', 'z');
    fakeDocument = document.createElement('div');
    fakeDocument.innerHTML = '<button class="clear-completed">Clear completed</button>';
    view = new ClearCompletedView(todoList, fakeDocument);
  })

  it('does not appear when there are no completed', function() {
    view.render();
    expect($('.clear-completed').style.display).equal('none');
  });

  it('appears when there are any completed', function() {
    todoList.at(0).complete(true);

    view.render();

    expect($('.clear-completed').style.display).equal('block');
  });

  xit('clears completed', function() {

  });

  function $(selector) { return fakeDocument.querySelector(selector); }
});
