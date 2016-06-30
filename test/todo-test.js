
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
  this.setValue = function(selector, value) {
    this.calls.push('setValue ' + selector + ' "' + value + '"');
  }
  this.showTodoCount = function(count) {
    this.calls.push('showTodoCount ' + count);
  }
}

describe('visibility of main and footer', function() {
  var gui;
  var todoApp;

  beforeEach(function() {
    gui = new FakeGui();
    todoApp = new TodoApp(gui);
  });

  describe('adding one todo', function() {
    it('binds to changes in the input field', function() {
      todoApp.bind();

      // simulate changing the input element
      gui.callbacks['onchange input.new-todo']('pippo');

      expect(todoApp.todoItems()).to.include('pippo');
      expect(gui.calls).to.include('addListElement ul.todo-list pippo');
    });

    it('shows the footer', function() {
      todoApp.addTodoItem('anything');
      expect(gui.calls).include('show footer.footer');
    });

    it('clears the input field', function() {
      todoApp.addTodoItem('foo');
      expect(gui.calls).include('setValue input.new-todo ""');
    });

  });

  it('clears the todoitems list', function() {
    todoApp.bind();

    expect(gui.calls).to.include('clear ul.todo-list');
  });

  it('hides the footer', function() {
    todoApp.bind();
    expect(gui.calls).include('hide footer.footer');
  });

  it('shows the todo count', function() {
    todoApp.bind();
    expect(gui.calls).include('showTodoCount 0');
    todoApp.addTodoItem('foo');
    todoApp.addTodoItem('bar');
    expect(gui.calls).include('showTodoCount 2');
  });

});
