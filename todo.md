
When editing mode is activated it will hide the other controls and bring forward an input that contains the todo title, which should be focused (`.focus()`). The edit should be saved on both blur and enter, and the `editing` class should be removed. Make sure to `.trim()` the input and then check that it's not empty. If it's empty the todo should instead be destroyed. If escape is pressed during the edit, the edit state should be left and any changes be discarded.

DONE double click: start editing text of item
DONE on blur: end editing

on blur: save
return: end editing and save
on ESC key: end editing and redo
edit " abc " -> trim "abc"
edit "" -> delete item

todo item: notify parent
notify: no need to send "this"

filter: all
filter: active
filter: completed
clear completed
complete all
clear completed appears only if any completed
complete all disappears if list is empty
complete all items is bold if all completed

save to local storage
recover from local storage

if using .at(index).complete() it will not fire notifications

refactor names of composite method