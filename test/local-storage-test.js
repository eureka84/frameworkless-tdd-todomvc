'use strict';

describe('local storage', function() {
  var todoList;
  var actualStorage;
  var fakeLocalStorage = {
    setItem: function(key, value) {
      actualStorage[key] = value;
    }
  }

  beforeEach(function() {
    todoList = new TodoList();
    actualStorage = {};
  })

  it('saves the state of the todoList', function() {
    todoList.push('foo', 'bar');
    todoList.at(0).complete(true);
    var expectedItems = [
      { text: 'foo', completed: true},
      { text: 'bar', completed: false}];

    new TodoMvcRepository(fakeLocalStorage).save(todoList);

    expect(actualStorage['it.xpug.todomvc'].items).deep.equal(expectedItems);
  });

  // subscribe then save when notified

  // save items
  // save items completed status

  // restore from storage

});
