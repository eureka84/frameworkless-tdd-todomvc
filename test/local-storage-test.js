'use strict';

describe('local storage', function() {
  var todoList, actualStorage, repository;
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
    repository = new TodoMvcRepository(fakeLocalStorage);
  })

  it('saves the state of the todoList', function() {
    var expectedItems = [
      { text: 'foo', completed: true},
      { text: 'bar', completed: false}];

    repository.save(todoList);

    expect(actualStorage['it.xpug.todomvc'].items).deep.equal(expectedItems);
  });

  it('restores a new TodoList when no save info present', function() {
    var restored = repository.restore();
    expect(restored.length).equal(0);
  });

  it('restores a previosly saved TodoList', function() {
    repository.save(todoList);
    var restored = repository.restore();
    expect(restored.length).equal(2);
  });


  // subscribe then save when notified

  // save items
  // save items completed status

  // restore from storage

});
