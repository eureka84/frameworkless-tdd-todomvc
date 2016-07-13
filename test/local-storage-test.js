'use strict';

describe('local storage', function() {
  it('saves the state of the model', function() {
    var model = new TodoList();
    model.push('foo');
    var expected = [{ text: 'foo'}];
    var actual = {};
    var storage = {
      setItem: function(key, value) {
        actual[key] = value;
      }
    }

    new TodoMvcRepository(storage).save(model);

    expect(actual['it.xpug.todomvc']).deep.equal(expected);
  });

  // subscribe then save when notified

  // save items
  // save items completed status

  // restore from storage

});
