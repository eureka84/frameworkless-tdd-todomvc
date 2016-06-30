
function FakeGui() {
  this.calls = [];
  this.callbacks = {};
  this.show = function(selector) {
    this.calls.push('show ' + selector);
  }
  this.hide = function(selector) {
    this.calls.push('hide ' + selector);
  }
  this.clear = function(selector) {
    this.calls.push('clear ' + selector);
  }
  this.onchange = function(selector, closure) {
    this.callbacks['onchange ' + selector] = closure;
  }
  this.addListElement = function(selector, item) {
    this.calls.push('addListElement ' + selector + ' ' + item);
  }
}

describe('visibility of main and footer', function() {
  var gui;
  var todoApp;

  beforeEach(function() {
    gui = new FakeGui();
    todoApp = new TodoApp(gui);
  });

  it('binds to changes in the input field', function() {
    todoApp.bind();

    // simulate changing the input element
    gui.callbacks['onchange input.new-todo']('pippo');

    expect(todoApp.todoItems()).to.include('pippo');
    expect(gui.calls).to.include('addListElement ul.todo-list pippo');
  });

  it('clears the todoitems list', function() {
    todoApp.bind();

    expect(gui.calls).to.include('clear ul.todo-list');
  });


  it('hides the footer', function() {
    todoApp.bind();
    expect(gui.calls).include('hide footer.footer');
  });

  it('adding one todo', function() {
    todoApp.addTodoItem('anything');
    expect(gui.calls).include('show footer.footer');
  });
});
