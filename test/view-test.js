describe('how the view works', function() {
  var html;
  var view;
  var $;

  beforeEach(function() {
    html = document.createElement('div');
    html.innerHTML = '<input type="text">';

    $ = function(selector) { return html.querySelector(selector); }
    view = new TodoView($);
  });

  it('changes the value of an input element', function() {
    expect($('input').type).equal('text');
    expect($('input').value).equal('');

    view.setValue('input', 'abc');

    expect($('input').value).equal('abc');
  });

  // This test sucks... it's just a copy of the production code
  // I found no way to have the browser actually
  it('onchange', function() {
    var actual;
    view.onchange('input', function(value) {
      actual = value;
    });
    var input = $('input');
    input.value = 'pippo';
    input.onchange({ target: input});
    expect(actual).equal('pippo');
  });

  it('clears all elements of a list', function() {

  });
});