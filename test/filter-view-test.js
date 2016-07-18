'use strict';

describe('filtering by status', function() {
  var selectedFilter, fakeDocument, filterByStatusView;
  var filterableModel = {
    filter: function(name) {
      selectedFilter = name;
    }
  }
  var fakeDocument;

  beforeEach(function() {
    selectedFilter = undefined;
    var html =
      '<p class="filters">' +
      '  <a href="#/" class="selected">All</a> <a href="#/bar">bar</a>' +
      '</p>';
    fakeDocument = createFakeDocument(html);
    filterByStatusView = new FilterByStatusView(filterableModel, fakeDocument);
  })

  it('applies the active filter', function() {
    fakeDocument.location = 'http://localhost:8081/#/foo';

    filterByStatusView.render();
    window.onpopstate();

    expect(selectedFilter).equal('foo');
  });

  it('highlights the filter button when filter is selected', function() {
    fakeDocument.location = 'http://localhost:8081/#/bar';

    filterByStatusView.render();
    window.onpopstate();

    expect($('a[href="#/"]').className).equal('');
    expect($('a[href="#/bar"]').className).equal('selected');
  });

  it('highlights the All filter when no other filter is selected', function() {
    fakeDocument.location = 'http://localhost:8081/#/zzz';

    filterByStatusView.render();

    expect($('a[href="#/"]').className).equal('selected', 'the All filter');
    expect($('a[href="#/bar"]').className).equal('', 'the "bar" filter');
  });

  it('applies the active filter on page load', function() {
    fakeDocument.location = 'http://localhost:8081/#/zot';

    filterByStatusView.render();

    expect(selectedFilter).equal('zot');
  });

  function $(selector) { return fakeDocument.querySelector(selector); }
});
