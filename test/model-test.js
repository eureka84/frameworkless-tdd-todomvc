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
});


describe('the todolist model', function() {
  var todoList;

  beforeEach(function() {
    todoList = new TodoList();
  });

  it('is initially empty', function() {
    expect(todoList.length).equal(0);
  });

  it('can contain one element', function() {
    todoList.push('pippo');

    expect(todoList.length).equal(1);
    expect(todoList.at(0).text()).equal('pippo');
  });

  it('can contain more than one element', function() {
    todoList.push(aTodoItem(), aTodoItem());

    expect(todoList.length).equal(2);
  });

  it('declares items completed', function() {
    todoList.push(aTodoItem(), aTodoItem());

    todoList.complete(1, true);

    expect(!!todoList.at(0).isCompleted()).equal(false);
    expect(todoList.at(1).isCompleted()).equal(true);

    todoList.complete(1, false);

    expect(!!todoList.at(0).isCompleted()).equal(false);
    expect(todoList.at(1).isCompleted()).equal(false);
  });

  it('counts items left', function() {
    todoList.push(aTodoItem(), aTodoItem());
    expect(todoList.itemsLeft()).equal(2);

    todoList.complete(1, true);

    expect(todoList.itemsLeft()).equal(1);
  });

  it('destroys an item', function() {
    todoList.push('zero', 'one');

    todoList.destroy(0);

    expect(todoList.length).equal(1);
    expect(todoList.itemsLeft()).equal(1);
    expect(todoList.at(0).text()).equal('one');
  });


  describe('observer notification', function() {
    var notificationCalls;

    beforeEach(function() {
      notificationCalls = 0;

      todoList.subscribe({
        notify: function(subject) {
          notificationCalls++;
        }
      });
    });

    it('notifies when adding an item', function() {
      todoList.push(aTodoItem());

      expect(notificationCalls).equal(1);
    });

    it('notifies when checked', function() {
      todoList.push(aTodoItem());

      todoList.at(0).complete(true);

      expect(notificationCalls).equal(2);
    });

    it('notifies when renamed', function() {
      todoList.push('abc');

      todoList.at(0).rename('def');

      expect(notificationCalls).equal(2);
    });
  });
});
