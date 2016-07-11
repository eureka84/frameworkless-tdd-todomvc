'use strict';

describe('the todoItem model', function() {
  var todoItem;

  beforeEach(function() {
    todoItem = new TodoItem('aaa');
  })

  it('returns its text', function() {
    expect(todoItem.text()).equal('aaa')
  });

  it('can be completed and uncompleted', function() {
    expect(todoItem.isCompleted()).equal(false)

    todoItem.complete(true);

    expect(todoItem.isCompleted()).equal(true)

    todoItem.complete(false);

    expect(todoItem.isCompleted()).equal(false)
  });

  it('can be renamed', function() {
    todoItem.rename('bbb');

    expect(todoItem.text()).equal('bbb')
  });

  it('trims before renaming', function() {
    todoItem.rename('  x  ');

    expect(todoItem.text()).equal('x')
  });
});
