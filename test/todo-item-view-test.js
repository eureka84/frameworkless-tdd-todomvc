'use strict';

describe('the todoItem view', function() {
  var todoItem, view, fixture;

  beforeEach(function() {
    fixture = createFakeDocument('<ul><li></li></ul>');
    todoItem = new TodoItem("do something");
    view = new TodoItemView(todoItem, $('li'));
  })
  
  it('responds when user completes an item', function() {    
    view.render();

    // user clicks on checkbox
    var checkbox = $('input.toggle');
    checkbox.checked = true;
    checkbox.onchange({target: checkbox});

    expect(todoItem.isCompleted()).equal(true, 'model is changed');
    expect($('li').attributes['class'].value).equal('completed', 'html is updated');
  });

  function $(selector) { return fixture.querySelector(selector); }
});

