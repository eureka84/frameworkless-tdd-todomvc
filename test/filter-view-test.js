'use strict';

describe('filtering by status', function() {
  var filterName;
  var filterableModel = {
    filter: function(name) {
      filterName = name;
    }
  }
  var fakeDocument;

  beforeEach(function() {
    filterName = undefined;
    fakeDocument = document.createElement("div");
    fakeDocument.innerHTML = '<a href="#/" class="selected">All</a> <a href="#/bar">bar</a>';
    new FilterByStatusView(filterableModel, fakeDocument).render();
  })

  it('applies the active filter', function() {
    fakeDocument.location = 'http://localhost:8081/#/foo';

    window.onpopstate();

    expect(filterName).equal('foo');
  });

  it('highlights the filter button when filter is active', function() {
    fakeDocument.location = 'http://localhost:8081/#/bar';

    window.onpopstate();

    expect($('a[href="#/"]').className).equal('');
    expect($('a[href="#/bar"]').className).equal('selected');
  });

  function $(selector) { return fakeDocument.querySelector(selector); }
});
