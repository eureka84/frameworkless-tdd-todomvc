'use strict';

describe('filtering by status', function() {
  var filterName, fakeDocument, filterByStatusView;
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
    filterByStatusView = new FilterByStatusView(filterableModel, fakeDocument);
  })

  it('applies the active filter', function() {
    fakeDocument.location = 'http://localhost:8081/#/foo';

    filterByStatusView.render();
    window.onpopstate();

    expect(filterName).equal('foo');
  });

  it('highlights the filter button when filter is active', function() {
    fakeDocument.location = 'http://localhost:8081/#/bar';

    filterByStatusView.render();
    window.onpopstate();

    expect($('a[href="#/"]').className).equal('');
    expect($('a[href="#/bar"]').className).equal('selected');
  });

  it('applies the active filter on page load', function() {
    fakeDocument.location = 'http://localhost:8081/#/zot';

    filterByStatusView.render();

    expect(filterName).equal('zot');
  });

  function $(selector) { return fakeDocument.querySelector(selector); }
});
