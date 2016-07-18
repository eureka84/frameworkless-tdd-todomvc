'use strict';

describe('local storage', function() {
  var todoList, actualStorage, repository, document;

  var fakeLocalStorage = {
    setItem: function(key, value) {
      actualStorage[key] = escape(value);
    },
    getItem: function(key) {
      if (actualStorage.hasOwnProperty(key))
        return unescape(actualStorage[key]);
      return null;
    }
  }

  beforeEach(function() {
    todoList = new TodoList();
    todoList.push('foo', 'bar');
    todoList.at(0).complete(true);
    actualStorage = {};
    document = { location: {}};
    repository = new TodoMvcRepository(fakeLocalStorage, document);
  })

  it('restores a new TodoList when no save info present', function() {
    var restored = repository.restore();
    expect(restored.length).equal(0);
  });

  it('restores a previosly saved TodoList', function() {
    repository.notify(todoList);

    var restored = repository.restore();

    expect(restored.length).equal(2);
    expect(restored.at(0).text()).equal('foo');
    expect(restored.at(1).text()).equal('bar');
    expect(restored.at(0).isCompleted()).equal(true, 'completed first');
    expect(restored.at(1).isCompleted()).equal(false, 'completed second');
  });

  it('saves the fragment', function() {
    document.location.hash = 'frotz';
    repository.notifyFragment();

    document.location.hash = undefined;
    repository.restoreFragment();

    expect(document.location.hash).equal('frotz');
  });

});
