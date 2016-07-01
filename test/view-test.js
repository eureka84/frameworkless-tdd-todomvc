describe('how the view works', function() {
  var html;
  var view;
  var $;

  beforeEach(function() {
    html = document.createElement('div');

    $ = function(selector) { return html.querySelector(selector); }
    view = new TodoView($);
  });

  it('changes the value of an input element', function() {
    html.innerHTML = '<input type="text">';
    expect($('input').type).equal('text');
    expect($('input').value).equal('');

    view.setValue('input', 'abc');

    expect($('input').value).equal('abc');
  });

  // This test sucks... it's just a copy of the production code
  // I found no way to have the browser actually
  it('onchange', function() {
    html.innerHTML = '<input type="text">';
    var actual;
    view.onchange('input', function(value) {
      actual = value;
    });
    var input = $('input');
    view.setValue('input', 'pippo');
    input.onchange({ target: $('input')});
    expect(actual).equal('pippo');
  });

  it('clears all elements of a list', function() {
    html.innerHTML = '<ul><li>one</li><li>two</li></ul>';
    expect($('ul').children.length).to.equal(2);

    view.clear('ul');

    expect($('ul').children.length).to.equal(0);
  });

  it('shows how many items left', function() {
    html.innerHTML = '<span class="todo-count"><strong>0</strong> item left</span>';

    view.showTodoCount(3);
    expect($('.todo-count').innerHTML).equal('<strong>3</strong> items left')

    view.showTodoCount(1);
    expect($('.todo-count').innerHTML).equal('<strong>1</strong> item left')
  });

  describe('manipulating the footer', function() {
    beforeEach(function() {
      html.innerHTML = '<footer class="footer"></footer>';
    })
    it('shows the footer', function() {
      view.showFooter();
      expect($('footer').style.display).equal('block');
    });
    it('hides the footer', function() {
      view.hideFooter();
      expect($('footer').style.display).equal('none');
    });
  });


});