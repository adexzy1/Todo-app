//Variables
const form = document.querySelector('form');
const todos = document.querySelector('.todos');

//event listener
eventListeners();

function eventListeners() {
  //Add todos to the todo list
  form.addEventListener('submit', addTodo);

  //Dom content Loaded
  document.addEventListener('DOMContentLoaded', localStorageOnLoad);

  //Delete todo
  todos.addEventListener('click', deleteTodo);

  //completed todo
  document.addEventListener('click', completedTodo);
}

//delete todo

function deleteTodo(e) {
  if (e.target.classList.contains('trash')) {
    e.target.parentElement.parentElement.remove();
    let removedTodo =
      e.target.parentElement.parentElement.children[0].textContent;

    //remove from local storage
    removeTodoFromlocalStorage(removedTodo);
  }
}

//completed todo
function completedTodo(e) {
  if (e.target.classList.contains('done')) {
    const strike = e.target.parentElement.parentElement.children[0];

    if (strike.classList.contains('completed')) {
      strike.classList.remove('completed');
    } else {
      strike.classList.add('completed');
    }
  }
}

//functions

function addTodo(e) {
  //prevent default
  e.preventDefault();

  //add todo to the dom
  updateTodos();

  //reset form input
  form.reset();
}

//update the dom with the todos added
function updateTodos() {
  //grad the input value
  const inputValue = document.querySelector('form input').value;

  //check if the form is empty

  if (inputValue == '') {
    //display error message
    const error = document.querySelector('.error');
    error.style.display = 'block';

    //remove error message after 3sec

    setTimeout(() => {
      error.style.display = 'none';
    }, 3000);
  } else {
    createTodoHtmlElement(inputValue);
    //add to local Todos to local storge
    addToLocalStorage(inputValue);
  }
}
//Create the todo html UI
function createTodoHtmlElement(inputValue) {
  let HTMLUI = document.createElement('div');
  HTMLUI.classList = 'todo';

  //create template litereals
  HTMLUI.innerHTML = `
        <p>${inputValue}</p>
        <div>
            <i class="uil uil-trash-alt trash"></i>
            <i class="uil uil-check done"></i>
        </div>
  `;

  //append each todo inside the dom
  todos.appendChild(HTMLUI);
}

//add todos to local storage
function addToLocalStorage(inputValue) {
  let Todos = getTodosFromLocalStorage();

  Todos.push(inputValue);

  localStorage.setItem('todos', JSON.stringify(Todos));
}

//Get todos from local storage
function getTodosFromLocalStorage() {
  let Todos;
  let todosLs = localStorage.getItem('todos');

  if (todosLs === null) {
    Todos = [];
  } else {
    Todos = JSON.parse(todosLs);
  }
  return Todos;
}

//Prints todo to the dom
function localStorageOnLoad() {
  let Todos = getTodosFromLocalStorage();

  Todos.forEach((todo) => {
    let HTMLUI = document.createElement('div');
    HTMLUI.classList = 'todo';

    //create template litereals
    HTMLUI.innerHTML = `
        <p>${todo}</p>
        <div>
            <i class="uil uil-trash-alt trash"></i>
            <i class="uil uil-check done"></i>
        </div>
  `;

    //append each todo inside the dom
    todos.appendChild(HTMLUI);
  });
}

//remove from local storage
function removeTodoFromlocalStorage(removedTodo) {
  //get todos from local storage
  let todosls = getTodosFromLocalStorage('todos');
  todosls.forEach((todo, index) => {
    if (removedTodo === todo) {
      todosls.splice(index, 1);

      localStorage.setItem('todos', JSON.stringify(todosls));
    }
  });
}
