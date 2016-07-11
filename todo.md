

rename "abc" -> no notification
test that when ESC is pressed, input.edit goes back to previous content


on return: save
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

can we make editing simpler by using built-in browser element editing?
simplify notification tests with a custom assertion
