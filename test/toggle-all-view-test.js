'use strict';

describe('the toggle all view', function() {
  var todoList, fakeDocument;

  beforeEach(function() {
    todoList = new TodoList();
    var html = '<input type="checkbox" class="toggle-all">';
    fakeDocument = createFakeDocument(html)
  })

  describe('visibility', function() {
    it('is hidden when todolist is empty', function() {
      new ToggleAllView(todoList, fakeDocument).render();

      expectHidden($('.toggle-all'));
    });

    it('is visible when todolist is non-empty', function() {
      todoList.push('x');

      new ToggleAllView(todoList, fakeDocument).render();

      expectVisible($('.toggle-all'));
    });

    it('updates when todoList changes', function() {
      new ToggleAllView(todoList, fakeDocument).render();

      todoList.push('x');

      expectVisible($('.toggle-all'));
    });

  });



  function $(selector) { return fakeDocument.querySelector(selector); }
});
