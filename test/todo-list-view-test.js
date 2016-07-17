'use strict';

describe('the todolist view', function() {
  var todoList, view, fixture;

  beforeEach(function() {
    fixture = createFakeDocument('<ul class="todo-list"></ul>');
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
    var listItem, editField;

    beforeEach(function() {
      todoList.push('aaa', 'bbb');
      editField = $('li:nth-child(1) input.edit');

      // user double clicks on first item
      listItem = $('li:nth-child(1)');
      var target = $('li:nth-child(1) label');
      listItem.ondblclick({target: target});
    })

    it('allows user to start editing an item', function() {
      expect(listItem.className).equal('editing');
      expectHidden($('li:nth-child(1) .view'));
      expectVisible(editField);
      // does not work expect(fixture.activeElement).equal($('li:nth-child(1) input.edit'))
    });

    it('movoes insertion point at end of text', function() {
      expect(editField.selectionStart).equal(3);
      expect(editField.selectionEnd).equal(3);
    });

    it('goes back to non-editing mode on blur', function() {
      // user clicks elsewhere
      editField.value = 'changed text';
      editField.onblur({target: editField});

      // we expect the view to have been redrawn from scratch
      expect($('li:nth-child(1)').className).equal('');
      expectDefaultVisibility($('li:nth-child(1) input.edit'));
      expectDefaultVisibility($('li:nth-child(1) .view'));
    });

    it('stops editing on RETURN key and saves', function() {
      editField.value = 'edited'

      listItem.onkeyup({keyCode: 13});

      expect($('li:nth-child(1)').className).equal('', 'stopped editing')
      expect(todoList.at(0).text()).equal('edited', 'did save')
    });

    it('stops editing and does not save on ESC key', function() {
      editField.value = 'something else'

      listItem.onkeyup({keyCode: 27});

      expect($('li:nth-child(1)').className).equal('', 'stopped editing')
      expect(editField.value).equal('aaa', 'edit field is back to original value')
      expect(todoList.at(0).text()).equal('aaa', 'did not save')
    });

    it('saves the new name', function() {
      editField.value = 'DDD'

      // user clicks elsewhere
      editField.onblur({target: editField})

      expect(todoList.at(0).text()).equal('DDD');
    });

    it('escapes entities', function() {
      var html = todoItemHtml(new TodoItem('<><>&&"\''));
      var expected = '&lt;&gt;&lt;&gt;&amp;&amp;&quot;&#x27;';
      expect(html).contain('<label>' + expected + '</label>');
      expect(html).contain('value="' + expected + '"');
    });

    it('destroys the element when editText is empty', function() {
      editField.value = ''

      listItem.onkeyup({keyCode: 13});

      expect(todoList.length).equal(1, 'element count')
      expect(todoList.at(0).text()).equal('bbb', 'destroyed the wrong element')
    });

    it('destroys the element when editText is spaces', function() {
      editField.value = '   '

      listItem.onkeyup({keyCode: 13});

      expect(todoList.length).equal(1, 'element count')
    });
  });

  function $(selector) { return fixture.querySelector(selector); }
  function $all(selector) { return fixture.querySelectorAll(selector); }
});

function aTodoItem(text) {
  return text || 'Anything';
}
