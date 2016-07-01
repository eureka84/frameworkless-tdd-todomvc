function TodoView($) {
  this.hideFooter = function() {
    $('footer.footer').style.display = 'none';
  }

  this.showFooter =  function() {
    $('footer.footer').style.display = 'block';
  }

  this.clearTodoList = function() {
    var root = $('ul.todo-list');
    while( root.firstChild ) {
      root.removeChild( root.firstChild );
    }
  }

  this.onNewTodoItem =  function(doSomethingWith) {
    $('input.new-todo').onchange = function(event) {
      doSomethingWith(event.target.value);
    };
  }

  this.addListElement = function(todo) {
    var self = this;
    var li = document.createElement("li");
    li.innerHTML
      = '<div class="view">'
			+ '  <input class="toggle" type="checkbox">'
			+ '  <label>' + todo.text + '</label>'
			+ '  <button class="destroy"></button>'
		  + '</div>'
		  + '<input class="edit" value="' + todo.text + '">'
    $('ul.todo-list').appendChild(li);
  }

  this.setValue =  function(selector, value) {
    $(selector).value = value;
  }

  this.showTodoCount =  function(count) {
    var plural = (count === 1) ? "" : "s";
    $('.todo-count').innerHTML = '<strong>COUNT</strong> itemPLURAL left'.replace('COUNT', count).replace('PLURAL', plural);
  }
}

