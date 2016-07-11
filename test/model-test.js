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

  describe('filtering', function() {
    beforeEach(function() {
      todoList.push('ACT', 'INACT')
      todoList.at(1).complete(true);
      expectMembers(todoList, ['ACT', 'INACT']);
    })

    it('filters active items', function() {
      todoList.filter('active');

      expectMembers(todoList, ['ACT']);
    });

    it('filters all items', function() {
      todoList.filter('');

      expectMembers(todoList, ['ACT', 'INACT']);
    });

    it('filters all items in sequence', function() {
      todoList.filter('active');
      todoList.filter('');

      expectMembers(todoList, ['ACT', 'INACT']);
    });

    function expectMembers(array, expectedMembers) {
      var actualMembers = [];
      array.forEach(function(member) {
        actualMembers.push(member.text());
      });
      expect(actualMembers).deep.equal(expectedMembers)
    }
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
