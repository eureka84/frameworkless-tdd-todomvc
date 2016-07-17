'use strict';

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

  it('notifies when adding an item', function() {
    expectNotification(todoList, function() {
      todoList.push(aTodoItem());
    })
  });

  it('notifies when checked', function() {
    todoList.push(aTodoItem());

    expectNotification(todoList, function() {
      todoList.at(0).complete(true);
    });
  });

  it('notifies when renamed', function() {
    todoList.push('abc');

    expectNotification(todoList, function() {
      todoList.at(0).rename('def');
    });
  });

  it('does not notify when renamed to the same text', function() {
    todoList.push('abc');

    dontExpectAnyNotification(todoList, function() {
      todoList.at(0).rename('abc');
    });
  });

  it('notifies when filtered', function() {
    expectNotification(todoList, function() {
      todoList.filter('anything');
    });
  });

  it('clears completed', function() {
    todoList.push('a', 'b', 'c');
    todoList.at(0).complete(true);
    todoList.at(2).complete(true);

    expectNotification(todoList, function() {
      todoList.clearCompleted();
    })

    expect(todoList.length).equal(1);
    expect(todoList.at(0).text()).equal('b');
  });

  it('knows when it contains completed items', function() {
    todoList.push('a', 'b', 'c');
    expect(todoList.containsCompletedItems()).equal(false);

    todoList.at(0).complete(true);
    expect(todoList.containsCompletedItems()).equal(true);
  });

  describe('toggling all', function() {
    beforeEach(function() {
      todoList.push('0', '1', '2');
    })

    it('completes all when any is not completed', function() {
      todoList.at(1).complete(true);

      todoList.toggleAll();

      expect(todoList.at(0).isCompleted()).equal(true);
      expect(todoList.at(1).isCompleted()).equal(true);
      expect(todoList.at(2).isCompleted()).equal(true);
    });

    it('uncompletes all when all are completed', function() {
      todoList.at(0).complete(true);
      todoList.at(1).complete(true);
      todoList.at(2).complete(true);

      todoList.toggleAll();

      expect(todoList.at(0).isCompleted()).equal(false);
      expect(todoList.at(1).isCompleted()).equal(false);
      expect(todoList.at(2).isCompleted()).equal(false);
    });
  });


  function expectNotification(subject, testAction) {
    expectSomeNotifications(subject, 1, testAction);
  }

  function dontExpectAnyNotification(subject, testAction) {
    expectSomeNotifications(subject, 0, testAction);
  }

  function expectSomeNotifications(subject, expectedNumberOfNotifications, testAction) {
    var notificationCalls = 0;
    subject.subscribe({
      notify: function(subject) {
        notificationCalls++;
      }
    });
    testAction();
    expect(notificationCalls).equal(expectedNumberOfNotifications, 'unexpected number of notifications')
  }
});

