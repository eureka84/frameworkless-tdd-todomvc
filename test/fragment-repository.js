'use strict';

describe('the fragment repository', function() {
  var todoList, repository, document;

  beforeEach(function() {
    todoList = new TodoList();
    todoList.push('foo', 'bar');
    todoList.at(0).complete(true);
    fakeLocalStorage.clear();
    document = { location: {}};
    repository = new FragmentRepository(fakeLocalStorage, document);
  })

  it('saves the fragment', function() {
    document.location.hash = 'frotz';
    repository.notifyFragment();

    document.location.hash = undefined;
    repository.restoreFragment();

    expect(document.location.hash).equal('frotz');
  });

  xit('saves the fragment when it changes', function() {
    document.location.hash = 'frotz';
    window.onpopstate();

    document.location.hash = undefined;
    repository.restoreFragment();

    expect(document.location.hash).equal('frotz');
  });

});
