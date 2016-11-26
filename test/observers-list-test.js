'use strict';

describe('observer list', function() {
  var observers;

  beforeEach(function() {
    observers = new ObserversList();
  })

  it('removes elements', function() {
    var obs0 = {}, obs1 = {}

    observers.add(obs0)
    observers.add(obs1)

    expect(observers.contains(obs0)).equal(true);
    expect(observers.contains(obs1)).equal(true);

    observers.remove(obs0)

    expect(observers.contains(obs0)).equal(false);
    expect(observers.contains(obs1)).equal(true);
  })

  it('complains when trying to remove non-existing observer', function() {
    var obs = {}
    observers.add(obs)

    expect(() => {
      observers.remove(42)
    }).to.throw(Error)

    expect(observers.contains(obs)).equal(true);
  })

});
