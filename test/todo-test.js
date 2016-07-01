
function FakeGui() {
  this.calls = [];
  this.callArguments = {};
  this.showFooter = function(selector) {
    this.calls.push('showFooter');
  }
  this.hideFooter = function(selector) {
    this.calls.push('hideFooter');
  }
  this.clear = function(selector) {
    this.calls.push('clear ' + selector);
  }
  this.onchange = function(selector, closure) {
    this.callArguments['onchange ' + selector] = closure;
  }
  this.addListElement = function(selector, item) {
    this.callArguments['addListElement'] =  item;
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
      gui.callArguments['onchange input.new-todo']('pippo');

      expect(gui.callArguments['addListElement']).to.deep.equal({ text: 'pippo', checked: false});
    });

    it('a newly inserted todo is not checked', function() {
      todoApp.addTodoItem('zot');
      expect(todoApp.todoItems()[0].text).to.equal('zot');
      expect(todoApp.todoItems()[0].checked).to.equal(false);
    });

    it('shows the footer', function() {
      todoApp.addTodoItem('anything');
      expect(gui.calls).include('showFooter');
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
    expect(gui.calls).include('hideFooter');
  });

  it('shows the todo count', function() {
    todoApp.bind();
    expect(gui.calls).include('showTodoCount 0');
    todoApp.addTodoItem('foo');
    todoApp.addTodoItem('bar');
    expect(gui.calls).include('showTodoCount 2');
  });

});
