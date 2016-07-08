'use strict';

describe('the todolist view', function() {
  var $, $all, todoList, view, fixture;

  beforeEach(function() {
    fixture = document.createElement('div');
    fixture.innerHTML = '<ul class="todo-list"></ul>';
    $ = function(selector) { return fixture.querySelector(selector); }
    $all = function(selector) { return fixture.querySelectorAll(selector); }
    todoList = new TodoList();
    view = new TodoListView(todoList, fixture);
  })

  it('renders an empty todo list', function() {
    view.render();
    expect($('ul.todo-list').children.length).to.equal(0);
  });

  it('renders a list of one element', function() {
    todoList.push(aTodoItem('Pippo'));
    view.render();
    expect($('li label').textContent).equal('Pippo');
    expect($('input.edit').value).equal('Pippo');
  });

  it('renders a completed todoItem', function() {
    todoList.push('Something');
    todoList.complete(0, true);

    view.render();

    expect($('li.completed')).not.equal(null, 'added class');
    expect($('li.completed input.toggle').checked).equal(true, 'checked box');
  });

  it('renders a list of two elements', function() {
    todoList.push(aTodoItem('Foo'), aTodoItem('Bar'));

    view.render();

    var actualLabels = $all('li label');
    expect(actualLabels[0].textContent).equal('Foo');
    expect(actualLabels[1].textContent).equal('Bar');
  });

  it('renders automatically when list changes', function() {
    todoList.push('ohilala');

    expect($('li label').textContent).equal('ohilala');
  });

  it('responds when user completes an item', function() {
    todoList.push(aTodoItem(), aTodoItem(), aTodoItem());
    view.render();

    // user clicks on second item
    var secondItem = $('li:nth-child(2) input.toggle');
    secondItem.checked = true;
    secondItem.onchange({target: secondItem});

    expect(todoList.at(1).isCompleted()).equal(true, 'model is changed');
    expect($('li:nth-child(2)').attributes['class'].value).equal('completed', 'html is updated');
    expect($('li:nth-child(1)').attributes['class']).to.be.undefined;
    expect($('li:nth-child(3)').attributes['class']).to.be.undefined;
  });

  it('allows user to delete an item', function() {
    todoList.push(aTodoItem(), aTodoItem(), aTodoItem());
    view.render();
    expect(todoList.length).equal(3);
    expect($all('li').length).equal(3);

    // user deletes first item
    var item = $('li:nth-child(1) button.destroy');
    item.onclick({target: item});

    expect(todoList.length).equal(2, 'model is changed');
    expect($all('li').length).equal(2, 'html is updated');
  });

  describe('editing an item', function() {
    var listItem;

    beforeEach(function() {
      todoList.push('aaa', 'bbb');

      // user double clicks
      listItem = $('li:nth-child(1)');
      var target = $('li:nth-child(1) label');
      listItem.ondblclick({target: target});
    })

    it('allows user to start editing an item', function() {
      expect(listItem.className).equal('editing');
      expect($('li:nth-child(1) .view').style.display).equal('none');
      expect($('li:nth-child(1) input.edit').style.display).equal('block');
      // does not work expect(fixture.activeElement).equal($('li:nth-child(1) input.edit'))
    });

    it('goes back to non-editing mode on blur', function() {
      // user clicks elsewhere
      var editField = $('li:nth-child(1) input.edit');
      editField.onblur({target: editField})

      expect(listItem.className).equal('');
      expect($('li:nth-child(1) input.edit').style.display).equal('');
      expect($('li:nth-child(1) .view').style.display).equal('');
    });

    it('saves the new name', function() {
      // user clicks elsewhere
      var editField = $('li:nth-child(1) input.edit');
      editField.value = 'DDD'
      editField.onblur({target: editField})

      expect(todoList.at(0).text()).equal('DDD');
    });
  });
});


describe('the footer view', function() {
  var $, $all, todoList, view;

  beforeEach(function() {
    var fixture = document.createElement('div');
    fixture.innerHTML = '<footer class="footer"><span class="todo-count">AAA</span></footer>';
    $ = function(selector) { return fixture.querySelector(selector); }
    $all = function(selector) { return fixture.querySelectorAll(selector); }
    todoList = new TodoList();
    view = new FooterView(todoList, fixture);
  })

  it('is hidden when the list is empty', function() {
    view.render();
    expect($('footer.footer').style.display).equal('none');
  });

  it('is shown when the list is not empty', function() {
    todoList.push(aTodoItem())
    view.render();
    expect($('footer.footer').style.display).equal('block');
  });

  it('reports no outstanding items', function() {
    view.render();
    expect($('.todo-count').textContent).equal('0 items left');
  });

  it('reports 1 item left, singular', function() {
    todoList.push(aTodoItem());
    view.render();
    expect($('.todo-count').textContent).equal('1 item left');
  });

  it('reports 2 items left', function() {
    todoList.push(aTodoItem(), aTodoItem(), aTodoItem());
    todoList.complete(2, true);

    view.render();

    expect($('.todo-count').textContent).equal('2 items left');
  });

  it('updates html when the list changes', function() {
    todoList.push(aTodoItem(), aTodoItem());
    view.render();
    expect($('.todo-count').textContent).equal('2 items left');

    todoList.push(aTodoItem());

    expect($('.todo-count').textContent).equal('3 items left');
  });
});


describe('input for new todo', function() {
  var $,todoList, view;

  beforeEach(function() {
    var fixture = document.createElement('div');
    fixture.innerHTML = '<input class="new-todo">';
    $ = function(selector) { return fixture.querySelector(selector); }
    todoList = new TodoList();
    view = new NewTodoView(todoList, fixture);
  })

  it('allows user to add an item', function() {
    view.render();

    // user inputs new item
    var input = $('input.new-todo');
    input.value = 'fee foo fum'
    input.onchange({target: input});

    expect(todoList.length).equal(1, 'model is changed');
    expect(todoList.at(0).text()).equal('fee foo fum', 'text was copied');
  });

  it('clears the input field after change', function() {
    view.render();

    // user inputs new item
    var input = $('input.new-todo');
    input.value = 'what ever'
    input.onchange({target: input});

    expect(input.value).equal('', 'input field was cleared');
  });
});


function aTodoItem(text) {
  return text || 'Anything';
}
