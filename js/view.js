function TodoView($) {
  this.hide = function(selector) {
    $(selector).style.display = 'none';
  }

  this.show =  function(selector) {
    $(selector).style.display = 'block';
  }

  this.clear = function(selector) {
    var root = $(selector);
    while( root.firstChild ) {
      root.removeChild( root.firstChild );
    }
  }

  this.onchange =  function(selector, closure) {
    $(selector).onchange = function(event) {
      closure(event.target.value);
    };
  }

  this.addListElement = function(selector, todo) {
    var self = this;
    var li = document.createElement("li");
    li.innerHTML
      = '<div class="view">'
			+ '  <input class="toggle" type="checkbox">'
			+ '  <label>' + todo + '</label>'
			+ '  <button class="destroy"></button>'
		  + '</div>'
		  + '<input class="edit" value="' + todo + '">'
    $(selector).appendChild(li);
  }

  this.setValue =  function(selector, value) {
    $(selector).value = value;
  }

  this.showItemsLeftCount =  function(count) {
    var plural = (count === 1) ? "" : "s";
    $('.todo-count').innerHTML = '<strong>COUNT</strong> itemPLURAL left'.replace('COUNT', count).replace('PLURAL', plural);
  }
}

