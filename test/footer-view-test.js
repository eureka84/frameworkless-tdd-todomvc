'use strict';

describe('the footer view', function() {
  var $, $all, todoList, view;

  beforeEach(function() {
    var fixture = document.createElement('div');
    fixture.innerHTML = '<footer class="footer"><span class="todo-count">AAA</span></footer>';
    $ = function(selector) { return fixture.querySelector(selector); }
    $all = function(selector) { return fixture.querySelectorAll(selector); }
    todoList = new TodoList();
    view = new FooterView(todoList, fixture);
  })

  it('is hidden when the list is empty', function() {
    view.render();
    expect($('footer.footer').style.display).equal('none');
  });

  it('is shown when the list is not empty', function() {
    todoList.push(aTodoItem())
    view.render();
    expect($('footer.footer').style.display).equal('block');
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
    todoList.complete(2, true);

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