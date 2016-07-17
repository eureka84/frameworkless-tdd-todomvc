'use strict';

describe('the toggle all view', function() {
  var todoList, view, toggleAllCheckbox;

  beforeEach(function() {
    var html = '<input type="checkbox" class="toggle-all">';
    var fakeDocument = createFakeDocument(html);
    todoList = new TodoList();
    view = new ToggleAllView(todoList, fakeDocument);
    toggleAllCheckbox = fakeDocument.querySelector('.toggle-all');
  })

  describe('visibility', function() {
    it('is hidden when todolist is empty', function() {
      view.render();

      expectHidden(toggleAllCheckbox);
    });

    it('becomes visible when todolist is non-empty', function() {
      todoList.push('x');

      expectVisible(toggleAllCheckbox);
    });
  });

  describe('checked status', function() {
    it('is unchecked when some elements are unchecked', function() {
      todoList.push('a');

      expect(toggleAllCheckbox.checked).equal(false, 'unchecked');
    });

    it('is checked when all elements are checked', function() {
      todoList.push('a');
      todoList.at(0).complete(true);

      expect(toggleAllCheckbox.checked).equal(true, 'checked when all items are checked');
    });
  });

  it('toggles all when clicked', function() {
    todoList.push('a');

    toggleAllCheckbox.onclick();

    expect(todoList.at(0).isCompleted()).equal(true);
  });
});
