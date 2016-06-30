
function FakeGui() {
  this.calls = [];
  this.callbacks = {};
  this.show = function(element) {
    this.calls.push('show ' + element);
  }
  this.hide = function(element) {
    this.calls.push('hide ' + element);
  }
  this.onChange = function(element, closure) {
    this.callbacks['onChange ' + element] = closure;
  }
}

function TodoApp(gui) {
  var todos = [];

  this.addTodoItem = function(todo) {
    todos.push(todo);
    this.render();
  }

  this.render = function() {
    if (todos.length === 0)
      gui.hide('footer.footer');
    else
      gui.show('footer.footer');
  }

  this.bind = function() {
    var self = this;
    gui.onChange('input.new-todo', function(todo) { self.addTodoItem(todo) });
  }

  this.todoItems = function() {
    return todos;
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
    gui.callbacks['onChange input.new-todo']('pippo');

    expect(todoApp.todoItems()).to.include('pippo');
  });

  it('hides the footer', function() {
    todoApp.render();
    expect(gui.calls).include('hide footer.footer');
  });

  it('adding one todo', function() {
    todoApp.addTodoItem('anything');
    expect(gui.calls).include('show footer.footer');
  });
});
