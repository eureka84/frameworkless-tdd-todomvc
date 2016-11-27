'use strict';

describe('the filter persistence', function() {
  var repository, document;

  beforeEach(function() {
    fakeLocalStorage.clear();
    document = { location: {}};
    repository = new FilterPersistence(fakeLocalStorage, document);
  })

  it('saves the filter when it changes', function() {
    document.location.hash = 'frotz';
    window.onpopstate();

    document.location.hash = undefined;
    repository.restore();

    expect(document.location.hash).equal('frotz');
  });

  it('does nothing when no filter was saved', function() {
    document.location.hash = 'previous';

    repository.restore();

    expect(document.location.hash).equal('previous');
  });

});
