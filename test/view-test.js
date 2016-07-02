describe('how the view works', function() {
  var html;
  var view;
  var $;

  beforeEach(function() {
    html = document.createElement('div');

    $ = function(selector) { return html.querySelector(selector); }
    view = new TodoView($);
  });

  describe('manipulating the input field', function() {
    beforeEach(function() {
      html.innerHTML = '<input class="new-todo" type="text" value="something">';
    })

    it('clears the input field', function() {
      view.clearInputField();

      expect($('input').value).equal('');
    });

    // This test sucks... it's just a copy of the production code
    // I found no way to have the browser actually
    it('on new todo item', function() {
      var actual;
      view.onNewTodoItem(function(value) {
        actual = value;
      });
      var input = $('input');
      input.onchange({ target: $('input')});
      expect(actual).equal('something');
    });
  });

  describe('manipulating the todo list', function() {
    beforeEach(function() {
      html.innerHTML = '<ul class="todo-list"><li>one</li><li>two</li></ul>';
    })

    it('clears all elements of a list', function() {
      expect($('ul').children.length).to.equal(2);

      view.clearTodoList();

      expect($('ul').children.length).to.equal(0);
    });

    it('adds an element to the list', function() {
      view.addListElement({text: 'blah'});
      expect($('ul').children.length).to.equal(3);
    });

    TODO: bind the check box to the check command in the controller
    TODO: and do it in a way that we pass the id to the controller
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