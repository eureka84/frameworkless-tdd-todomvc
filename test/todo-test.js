
function TodoApp(gui) {
  var items = [];

  this.addItem = function(item) {
    items.push(item);
  }

  this.render = function() {
    if (items.length === 0)
      gui.querySelector('footer.footer').style.display = 'none';
    else
      gui.querySelector('footer.footer').style.display = 'block';
  }
}

describe('visibility of main and footer', function() {
  var html;
  var todoApp;

  beforeEach(function() {
    fixture.load('/test/fixture.html');
    html = fixture.el.querySelector('.todoapp');
    todoApp = new TodoApp(html);
  });

  it('hides the footer', function() {
    todoApp.render();
    expect(html.querySelector('footer.footer').style.display).equal('none')
  });

  it('shows the footer', function() {
    todoApp.addItem('anything');
    todoApp.render();
    expect(html.querySelector('footer.footer').style.display).equal('block')
  });

});
