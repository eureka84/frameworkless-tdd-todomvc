'use strict';

describe('the toggle all view', function() {
  var todoList, fakeDocument, view;

  beforeEach(function() {
    todoList = new TodoList();
    var html = '<input type="checkbox" class="toggle-all">';
    fakeDocument = createFakeDocument(html);
    view = new ToggleAllView(todoList, fakeDocument);
  })

  describe('visibility', function() {
    it('is hidden when todolist is empty', function() {
      view.render();

      expectHidden($('.toggle-all'));
    });

    it('becomes visible when todolist is non-empty', function() {
      todoList.push('x');

      expectVisible($('.toggle-all'));
    });
  });

  describe('checked status', function() {
    it('is unchecked when some elements are unchecked', function() {
      todoList.push('a');

      expect($('.toggle-all').checked).equal(false, 'unchecked');
    });

    it('is checked when all elements are checked', function() {
      todoList.push('a');
      todoList.at(0).complete(true);

      expect($('.toggle-all').checked).equal(true, 'checked when all items are checked');
    });
  });

  it('toggles all when clicked', function() {
    todoList.push('a');

    $('.toggle-all').onclick();

    expect(todoList.at(0).isCompleted()).equal(true);
  });

  function $(selector) { return fakeDocument.querySelector(selector); }
});
