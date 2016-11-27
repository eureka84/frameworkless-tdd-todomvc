'use strict';

describe('the todoItem view', function() {
  var todoItem, view, fixture, listItemElement;

  beforeEach(function() {
    fixture = createFakeDocument('<ul><li></li></ul>');
    todoItem = new TodoItem("ABC");
    listItemElement = $('li');
    view = new TodoItemView(todoItem, listItemElement);
  })

  it('responds when user completes an item', function() {
    view.render();

    // user clicks on checkbox
    var checkbox = $('input.toggle');
    checkbox.checked = true;
    checkbox.onchange({target: checkbox});

    expect(todoItem.isCompleted()).equal(true, 'model is changed');
    expect(listItemElement.attributes['class'].value).equal('completed', 'html is updated');
  });

  it('escapes entities', function() {
    var html = todoItemHtml(new TodoItem('<><>&&"\''));
    var expected = '&lt;&gt;&lt;&gt;&amp;&amp;&quot;&#x27;';
    expect(html).contain('<label>' + expected + '</label>');
    expect(html).contain('value="' + expected + '"');
  });

  describe('editing an item', function() {
    var editField;

    beforeEach(function() {
      view.render();

      editField = $('li input.edit');

      // user double clicks
      var target = $('li label');
      listItemElement.ondblclick({target: target});
    })

    it('starts editing an item', function() {
      expect(listItemElement.className).equal('editing');
      expectHidden($('li .view'));
      expectVisible(editField);
      // does not work expect(fixture.activeElement).equal($('li input.edit'))
    });

    it('moves insertion point at end of text', function() {
      expect(editField.selectionStart).equal(3);
      expect(editField.selectionEnd).equal(3);
    });

    it('goes back to non-editing mode on blur', function() {
      // user clicks elsewhere
      editField.value = 'changed text';
      editField.onblur({target: editField});

      expect(listItemElement.className).equal('');
      expectHidden($('li input.edit'));
      expectVisible($('li .view'));
    });

    it('stops editing on RETURN key and saves', function() {
      editField.value = 'edited'

      listItemElement.onkeyup({keyCode: 13})

      expect(listItemElement.className).equal('', 'stopped editing')
      expect(todoItem.text()).equal('edited', 'did save')
      expect(editField.value).equal('edited', 'did save')
    });

    it('stops editing when user clicks elsewhere and saves', function() {
      editField.value = 'DDD'

      // user clicks elsewhere
      editField.onblur({target: editField})

      expect(editField.value).equal('DDD', 'did save')
      expect(todoItem.text()).equal('DDD', 'did save')
    });

    it('stops editing and does not save on ESC key', function() {
      editField.value = 'something else'

      listItemElement.onkeyup({keyCode: 27});

      expect(listItemElement.className).equal('', 'stopped editing')
      expect(editField.value).equal('ABC', 'edit field is back to original value')
      expect(todoItem.text()).equal('ABC', 'did not save')
    });

    describe('destroying the element', function() {
      var parent;

      beforeEach(function() {
        parent = {
          destroyed: null,
          destroy: function(item) {
            this.destroyed = item
          },
        }
        todoItem.setParent(parent)
      })

      it('destroys the element when editText is empty', function() {
        editField.value = ''

        listItemElement.onkeyup({keyCode: 13})

        expect(parent.destroyed).equal(todoItem)
      });

      it('destroys the element when editText is spaces', function() {
        editField.value = '   '

        listItemElement.onkeyup({keyCode: 13})

        expect(parent.destroyed).equal(todoItem)
      });

      it('does not destroy the element when editText is nonempty', function() {
        editField.value = 'X'

        listItemElement.onkeyup({keyCode: 13})

        expect(parent.destroyed).to.be.null
      })
    })
  })

  function $(selector) { return fixture.querySelector(selector); }
});

