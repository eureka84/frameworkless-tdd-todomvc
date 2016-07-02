
function FakeGui() {
  this.calls = [];
  this.callArguments = {};
  this.showFooter = function() {
    this.calls.push('showFooter');
  }
  this.hideFooter = function() {
    this.calls.push('hideFooter');
  }
  this.clearTodoList = function() {
    this.calls.push('clearTodoList');
  }
  this.onNewTodoItem = function(closure) {
    this.callArguments['onNewTodoItem'] = closure;
  }
  this.addListElement = function(item) {
    this.callArguments['addListElement'] =  item;
  }
  this.clearInputField = function() {
    this.calls.push('clearInputField');
  }
  this.showTodoCount = function(count) {
    this.calls.push('showTodoCount ' + count);
  }
}

describe('the todo app', function() {
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
      gui.callArguments['onNewTodoItem']('pippo');

      expect(gui.callArguments['addListElement']).to.have.property('text', 'pippo');
    });

    it('a newly inserted todo is not checked', function() {
      todoApp.addTodoItem('zot');
      expect(todoApp.todoItems()[0].checked).to.equal(false);
    });

    it('can be checked via its id', function() {
      todoApp.addTodoItem('aaa');
      todoApp.addTodoItem('bbb');

      var firstItem = todoApp.todoItems()[0];
      var secondItem = todoApp.todoItems()[1];

      expect(firstItem.checked).equal(false, 'before check');
      expect(secondItem.checked).equal(false, 'before check');

      todoApp.check(firstItem.id)

      expect(firstItem.checked).equal(true, 'after check');
      expect(secondItem.checked).equal(false, 'before check');
      expect(view.to.be.updated.too);
    });

    it('shows the footer', function() {
      todoApp.addTodoItem('anything');
      expect(gui.calls).include('showFooter');
    });

    it('clears the input field', function() {
      todoApp.addTodoItem('foo');
      expect(gui.calls).include('clearInputField');
    });
  });

  it('clears the todoitems list', function() {
    todoApp.bind();

    expect(gui.calls).to.include('clearTodoList');
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
