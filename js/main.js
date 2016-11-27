
var repository = new TodoMvcRepository(localStorage);
var todoList = repository.restore();
new TodoListView(todoList, document).render();
new FooterView(todoList, document).render();
new NewTodoView(todoList, document).render();
new FilterByStatusView(todoList, document).render();
new ClearCompletedView(todoList, document).render();
new ToggleAllView(todoList, document).render();
new FilterPersistence(localStorage, document).restore();
todoList.addObserver(repository);
