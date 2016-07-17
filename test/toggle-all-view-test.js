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

      expect($('.toggle-all').style.display).equal('none');
    });

    it('is visible when todolist is non-empty', function() {
      todoList.push('x');

      new ToggleAllView(todoList, fakeDocument).render();

      expect($('.toggle-all').style.display).equal('block');
    });

  });



  function $(selector) { return fakeDocument.querySelector(selector); }
});
