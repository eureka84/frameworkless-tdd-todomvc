'use strict';

describe('filtering by status', function() {
  it('applies the active filter', function() {
    var filterName;
    var filterableModel = {
      filter: function(name) {
        filterName = name;
      }
    }

    var fakeDocument = {
      location: 'http://localhost:8081/#/foo'
    }

    new FilterByStatusView(filterableModel, fakeDocument).render();

    window.onpopstate();

    expect(filterName).equal('foo');
  });

});
