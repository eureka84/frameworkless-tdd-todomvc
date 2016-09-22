
#### In the middle of: break the main view into hierarchical subview

 - make each todoItemView subscribe to changes in its todoItem
 - avoid passing the index to the todoItemView (they will be out of sync if
   one of the elements is deleted)
 - stop redrawing the whole list every time there is a change

break the code in multiple files

find a way to compute debug information while doing the above

can we make editing simpler by using built-in browser element editing?


bug: TodoItemHtml has a bug: if the text contains {{index}} it fails 


extract filtering to a separate class

move deserialization to list
move ser/deserialize to item

simplify fragment from location