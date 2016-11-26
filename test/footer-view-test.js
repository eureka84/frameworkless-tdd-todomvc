'use strict';

describe('the footer view', function() {
  var $, $all, todoList, view;

  beforeEach(function() {
    var fixture = createFakeDocument('<footer class="footer"><span class="todo-count">AAA</span></footer>');
    $ = function(selector) { return fixture.querySelector(selector); }
    $all = function(selector) { return fixture.querySelectorAll(selector); }
    todoList = new TodoList();
    view = new FooterView(todoList, fixture);
  })

  it('is hidden when the list is empty', function() {
    view.render();
    expectHidden($('footer.footer'));
  });

  it('is shown when the list is not empty', function() {
    todoList.push(aTodoItem())
    view.render();
    expectVisible($('footer.footer'));
  });

  it('reports no outstanding items', function() {
    view.render();
    expect($('.todo-count').textContent).equal('0 items left');
  });

  it('reports 1 item left, singular', function() {
    todoList.push(aTodoItem());
    view.render();
    expect($('.todo-count').textContent).equal('1 item left');
  });

  it('reports 2 items left', function() {
    todoList.push(aTodoItem(), aTodoItem(), aTodoItem());
    todoList.at(2).complete(true);

    view.render();

    expect($('.todo-count').textContent).equal('2 items left');
  });

  it('updates html when the list changes', function() {
    todoList.push(aTodoItem(), aTodoItem());
    view.render();
    expect($('.todo-count').textContent).equal('2 items left');

    todoList.push(aTodoItem());

    expect($('.todo-count').textContent).equal('3 items left');
  });
});
