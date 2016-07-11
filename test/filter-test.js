'use strict';

describe('filtering', function() {
  var todoList;

  beforeEach(function() {
    todoList = new TodoList();
    todoList.push('ACT', 'INACT', 'OTHER ACT')
    todoList.at(1).complete(true);
  })

  it('filters active items', function() {
    todoList.filter('active');

    expectMembers(todoList, ['ACT', 'OTHER ACT']);
  });

  it('filters all items', function() {
    todoList.filter('');

    expectMembers(todoList, ['ACT', 'INACT', 'OTHER ACT']);
  });

  it('filters all items in sequence', function() {
    todoList.filter('');
    todoList.filter('active');
    todoList.filter('');

    expectMembers(todoList, ['ACT', 'INACT', 'OTHER ACT']);
  });

  it('indexing is consistent with filtering', function() {
    todoList.filter('active');

    expect(todoList.at(1).text()).equal('OTHER ACT');
  });


  function expectMembers(array, expectedMembers) {
    var actualMembers = [];
    array.forEach(function(member) {
      actualMembers.push(member.text());
    });
    expect(actualMembers).deep.equal(expectedMembers)
  }
});
