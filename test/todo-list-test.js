'use strict';

describe('the todolist view', function() {
  var fixture;
  var $, $all;

  beforeEach(function() {
    fixture = document.createElement('div');
    $ = function(selector) { return fixture.querySelector(selector); }
    $all = function(selector) { return fixture.querySelectorAll(selector); }
  })

  describe('an empty todo list', function() {
    it('returns an empty html list', function() {
      expect(new TodoListView([]).render()).to.equal('<ul class="todo-list"></ul>');
    });
  });

  describe('a list of one element', function() {
    it('renders as html', function() {
      fixture.innerHTML = new TodoListView(['Pippo']).render();
      expect($('ul.todo-list li label').textContent).equal('Pippo');
      expect($('ul.todo-list input.edit').value).equal('Pippo');
    });
  });

  describe('a list of two elements', function() {
    it('renders as html', function() {
      fixture.innerHTML = new TodoListView(['Foo', 'Bar']).render();
      expect($all('ul.todo-list li label')[0].textContent).equal('Foo');
      expect($all('ul.todo-list li label')[1].textContent).equal('Bar');
    });
  });
});


