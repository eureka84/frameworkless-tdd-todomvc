'use strict';

describe('local storage', function() {
  var todoList;
  var actualStorage;
  var fakeLocalStorage = {
    setItem: function(key, value) {
      actualStorage[key] = value;
    },
    getItem: function(key) {
      return actualStorage[key];
    }
  }

  beforeEach(function() {
    todoList = new TodoList();
    todoList.push('foo', 'bar');
    todoList.at(0).complete(true);
    actualStorage = {};
  })

  it('saves the state of the todoList', function() {
    var expectedItems = [
      { text: 'foo', completed: true},
      { text: 'bar', completed: false}];

    new TodoMvcRepository(fakeLocalStorage).save(todoList);

    expect(actualStorage['it.xpug.todomvc'].items).deep.equal(expectedItems);
  });

  it('restore a new TodoList when no save info present', function() {
    var restored = new TodoMvcRepository(fakeLocalStorage).restore();
    expect(restored.length).equal(0);
  });


  // subscribe then save when notified

  // save items
  // save items completed status

  // restore from storage

});
