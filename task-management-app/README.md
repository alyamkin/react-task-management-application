# react-task-management-application

## How to run the app localy

Clone the repo.

In the project directory run:

### `npm install`

### `npm start`

In the web browser you will see the app.

## Limitations

The solution does not support any DB, localstorage or any BE. When browser reloads, all data will be lost.

There are no users control. In that demo, only current user supported.

Demo not supported unit tests. This area for the future improvements.

## Brief code structure

There are 7 components:

CreateTaskForm - responsible for collecting input data, validation for the new task.
Header - boilplate for the hesder.
SearchBar - responsible for collecting search input as well as debounce when input.
Sort - implements sorting options.
Task - implements task card, displays task data and collects inputs when edit.
TaskList - implements tasks list. Filtering and sorting before display.
App - main component. Contains tasks array. Major handlers for delete, update, create etc.

## Used technologies and libraries

MUI React, React, lodash, Day.js, Javascript, CSS,

## Areas to improve

Implement unit tests

Implement user login

Implement Multipage and routing

Use Context for central state storage

Implement live DB or JSONDB
