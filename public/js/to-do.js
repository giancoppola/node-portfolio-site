import { deleteGoogleUserData, googleUser, updateGoogleUserData } from "./to-do-firebase.js";

export let obj;
let dragged = null;
let localUser = false;

export function updateObj(data){
    console.log(data);
    if (data.todo === ''){
        data.todo = {};
    }
    if (data.doing === ''){
        data.doing = {};
    }
    if (data.done === ''){
        data.done = {};
    }
    console.log(data);
    obj = data;
    console.log(obj);
}

// onload function reads local storage to determine if object exists,
// if it does it runs the recoverItems function for all three columns,
// if it doesn't it creates an empty object ready to populate
export function usingLocal() {
    console.log('here');
    localUser = true;
    if (localStorage.getItem('obj')){
        obj = localStorage.getItem('obj');
        obj = JSON.parse(obj);
        console.log('file exists');
        console.log(obj);
        for (let key of Object.keys(obj.todo)){
            recoverItems('local', 'todo', key, obj.todo[key]);
        }
        for (let key of Object.keys(obj.doing)){
            recoverItems('local', 'doing', key, obj.doing[key]);
        }
        for (let key of Object.keys(obj.done)){
            recoverItems('local', 'done', key, obj.done[key]);
        }
    }
    else {
        obj = {
            todo : {},
            doing : {},
            done : {},
        };
        console.log('no local file');
        console.log(obj);
    }
};

// new item create button elements
const todoNew = document.querySelector('#todo-new');
const doingNew = document.querySelector('#doing-new');
const doneNew = document.querySelector('#done-new');

// new item input field elements
const todoInput = document.querySelector('#todo-new-input');
const doingInput = document.querySelector('#doing-new-input');
const doneInput = document.querySelector('#done-new-input');

// adds event to the create buttons that calls the addNewItem function
// passing the input value along with the type of new item
todoNew.addEventListener('click', function () {
    let value = todoInput.value;
    addNewItem('todo', value);
});
doingNew.addEventListener('click', function () {
    let value = doingInput.value;
    addNewItem('doing', value);
});
doneNew.addEventListener('click', function () {
    let value = doneInput.value;
    addNewItem('done', value);
});
// same as above but allows user to just hit enter after text input
todoInput.addEventListener('keypress', (event) => {
    if (event.code == 'Enter') {
        let value = todoInput.value;
        addNewItem('todo', value);
    }
})
doingInput.addEventListener('keypress', (event) => {
    if (event.code == 'Enter') {
        let value = doingInput.value;
        addNewItem('doing', value);
    }
})
doneInput.addEventListener('keypress', (event) => {
    if (event.code == 'Enter') {
        let value = doneInput.value;
        addNewItem('done', value);
    }
})


// list column parent elements
const todo = document.querySelector('#main-grid-to-do');
const doing = document.querySelector('#main-grid-doing');
const done = document.querySelector('#main-grid-done');

// drag event handlers based on above elements
todo.addEventListener('dragover', function(event){
    event.preventDefault();
})
todo.addEventListener('drop', function(event){
    event.preventDefault();
    let data = event.dataTransfer.getData('text');
    addNewItem('todo', data);
    dragged.querySelector('button').click();
})

doing.addEventListener('dragover', function(event){
    event.preventDefault();
})
doing.addEventListener('drop', function(event){
    event.preventDefault();
    let data = event.dataTransfer.getData('text');
    addNewItem('doing', data);
    dragged.querySelector('button').click();
})

done.addEventListener('dragover', function(event){
    event.preventDefault();
})
done.addEventListener('drop', function(event){
    event.preventDefault();
    let data = event.dataTransfer.getData('text');
    addNewItem('done', data);
    dragged.querySelector('button').click();
})

// elements for each column
const todoList = document.querySelector('#main-grid-to-do-list');
const doingList = document.querySelector('#main-grid-doing-list');
const doneList = document.querySelector('#main-grid-done-list');

// on page load this function is called to recover the to do list items
// that are held within local storage
export function recoverItems(userType, listType, key, value){
    if (userType === "local") {
        if (listType === 'todo'){
            // creating new elements to populate with info from localStorage
            let item = document.createElement('div');
            let text = document.createElement('p');
            let close = document.createElement('button');
            // close button just has an x in, and event listener to play a delete
            // animation and delete said item from local storage
            close.classList.add('main-grid-to-do-list-item-close');
            close.innerHTML = 'X';
            close.addEventListener('click', function() {
                document.querySelector(`div[data="${key}"]`).style.animation = 'deleteItem 0.4s linear';
                setTimeout(function() {
                    document.querySelector(`div[data="${key}"]`).remove();
                    delete obj.todo[`${key}`];
                    updateLocalStorage();
                }, 390);
            });
            // set item class, data value to determine its relation to the object,
            // text, and sets it to be draggable to move from list to list
            item.classList.add('main-grid-to-do-list-item');
            item.setAttribute('data', `${key}`);
            // enables dragging for the item, and sets the data as the text
            item.setAttribute('draggable', 'true');
            item.addEventListener('dragstart', function(event){
                event.dataTransfer.setData('text', event.target.querySelector('p').innerHTML);
                dragged = event.target;
            })
            if (value === ''){
                text.innerHTML = 'Untitled';
            }
            else{
                text.innerHTML = value;
            }
            item.appendChild(text);
            item.appendChild(close);
            todoList.appendChild(item);
            // adds to JS object to be referenced easily
            obj.todo[`${key}`] = text.innerHTML;
            todoInput.value = '';
        }
        else if (listType === 'doing'){
            // creating new elements to populate with info from localStorage
            let item = document.createElement('div');
            let text = document.createElement('p');
            let close = document.createElement('button');
            // close button just has an x in, and event listener to play a delete
            // animation and delete said item from local storage
            close.classList.add('main-grid-doing-list-item-close');
            close.innerHTML = 'X';
            close.addEventListener('click', function() {
                document.querySelector(`div[data="${key}"]`).style.animation = 'deleteItem 0.4s linear';
                setTimeout(function() {
                    document.querySelector(`div[data="${key}"]`).remove();
                    delete obj.doing[`${key}`];
                    updateLocalStorage();
                }, 390);
            });
            // set item class, data value to determine its relation to the object,
            // text, and sets it to be draggable to move from list to list
            item.classList.add('main-grid-doing-list-item');
            item.setAttribute('data', `${key}`);
            // enables dragging for the item, and sets the data as the text
            item.setAttribute('draggable', 'true');
            item.addEventListener('dragstart', function(event){
                event.dataTransfer.setData('text', event.target.querySelector('p').innerHTML);
                dragged = event.target;
            })
            if (value === ''){
                text.innerHTML = 'Untitled';
            }
            else{
                text.innerHTML = value;
            }
            item.appendChild(text);
            item.appendChild(close);
            doingList.appendChild(item);
            // adds to JS object to be referenced easily
            obj.doing[`${key}`] = text.innerHTML;
            doingInput.value = '';
        }
        else if (listType === 'done'){
            // creating new elements to populate with info from localStorage
            let item = document.createElement('div');
            let text = document.createElement('p');
            let close = document.createElement('button');
            // close button just has an x in, and event listener to play a delete
            // animation and delete said item from local storage
            close.classList.add('main-grid-done-list-item-close');
            close.innerHTML = 'X';
            close.addEventListener('click', function() {
                document.querySelector(`div[data="${key}"]`).style.animation = 'deleteItem 0.4s linear';
                setTimeout(function() {
                    document.querySelector(`div[data="${key}"]`).remove();
                    delete obj.done[`${key}`];
                    updateLocalStorage();
                }, 390);
            });
            // set item class, data value to determine its relation to the object,
            // text, and sets it to be draggable to move from list to list
            item.classList.add('main-grid-done-list-item');
            item.setAttribute('data', `${key}`);
            // enables dragging for the item, and sets the data as the text
            item.setAttribute('draggable', 'true');
            item.addEventListener('dragstart', function(event){
                event.dataTransfer.setData('text', event.target.querySelector('p').innerHTML);
                dragged = event.target;
            })
            if (value === ''){
                text.innerHTML = 'Untitled';
            }
            else{
                text.innerHTML = value;
            }
            item.appendChild(text);
            item.appendChild(close);
            doneList.appendChild(item);
            // adds to JS object to be referenced easily
            obj.done[`${key}`] = text.innerHTML;
            doneInput.value = '';
        }
    }
    else if (userType === "google"){
        if (listType === 'todo'){
            // creating new elements to populate with info from localStorage
            let item = document.createElement('div');
            let text = document.createElement('p');
            let close = document.createElement('button');
            // close button just has an x in, and event listener to play a delete
            // animation and delete said item from local storage
            close.classList.add('main-grid-to-do-list-item-close');
            close.innerHTML = 'X';
            close.addEventListener('click', function() {
                document.querySelector(`div[data="${key}"]`).style.animation = 'deleteItem 0.4s linear';
                setTimeout(function() {
                    document.querySelector(`div[data="${key}"]`).remove();
                    delete obj.todo[`${key}`];
                    deleteGoogleUserData('todo', key);
                }, 390);
            });
            // set item class, data value to determine its relation to the object,
            // text, and sets it to be draggable to move from list to list
            item.classList.add('main-grid-to-do-list-item');
            item.setAttribute('data', `${key}`);
            // enables dragging for the item, and sets the data as the text
            item.setAttribute('draggable', 'true');
            item.addEventListener('dragstart', function(event){
                event.dataTransfer.setData('text', event.target.querySelector('p').innerHTML);
                dragged = event.target;
            })
            if (value === ''){
                text.innerHTML = 'Untitled';
            }
            else{
                text.innerHTML = value;
            }
            item.appendChild(text);
            item.appendChild(close);
            todoList.appendChild(item);
            // adds to JS object to be referenced easily
            obj.todo[`${key}`] = text.innerHTML;
            todoInput.value = '';
        }
        else if (listType === 'doing'){
            // creating new elements to populate with info from localStorage
            let item = document.createElement('div');
            let text = document.createElement('p');
            let close = document.createElement('button');
            // close button just has an x in, and event listener to play a delete
            // animation and delete said item from local storage
            close.classList.add('main-grid-doing-list-item-close');
            close.innerHTML = 'X';
            close.addEventListener('click', function() {
                document.querySelector(`div[data="${key}"]`).style.animation = 'deleteItem 0.4s linear';
                setTimeout(function() {
                    document.querySelector(`div[data="${key}"]`).remove();
                    delete obj.doing[`${key}`];
                    deleteGoogleUserData('doing', key);
                }, 390);
            });
            // set item class, data value to determine its relation to the object,
            // text, and sets it to be draggable to move from list to list
            item.classList.add('main-grid-doing-list-item');
            item.setAttribute('data', `${key}`);
            // enables dragging for the item, and sets the data as the text
            item.setAttribute('draggable', 'true');
            item.addEventListener('dragstart', function(event){
                event.dataTransfer.setData('text', event.target.querySelector('p').innerHTML);
                dragged = event.target;
            })
            if (value === ''){
                text.innerHTML = 'Untitled';
            }
            else{
                text.innerHTML = value;
            }
            item.appendChild(text);
            item.appendChild(close);
            doingList.appendChild(item);
            // adds to JS object to be referenced easily
            obj.doing[`${key}`] = text.innerHTML;
            doingInput.value = '';
        }
        else if (listType === 'done'){
            // creating new elements to populate with info from localStorage
            let item = document.createElement('div');
            let text = document.createElement('p');
            let close = document.createElement('button');
            // close button just has an x in, and event listener to play a delete
            // animation and delete said item from local storage
            close.classList.add('main-grid-done-list-item-close');
            close.innerHTML = 'X';
            close.addEventListener('click', function() {
                document.querySelector(`div[data="${key}"]`).style.animation = 'deleteItem 0.4s linear';
                setTimeout(function() {
                    document.querySelector(`div[data="${key}"]`).remove();
                    delete obj.done[`${key}`];
                    deleteGoogleUserData('done', key);
                }, 390);
            });
            // set item class, data value to determine its relation to the object,
            // text, and sets it to be draggable to move from list to list
            item.classList.add('main-grid-done-list-item');
            item.setAttribute('data', `${key}`);
            // enables dragging for the item, and sets the data as the text
            item.setAttribute('draggable', 'true');
            item.addEventListener('dragstart', function(event){
                event.dataTransfer.setData('text', event.target.querySelector('p').innerHTML);
                dragged = event.target;
            })
            if (value === ''){
                text.innerHTML = 'Untitled';
            }
            else{
                text.innerHTML = value;
            }
            item.appendChild(text);
            item.appendChild(close);
            doneList.appendChild(item);
            // adds to JS object to be referenced easily
            obj.done[`${key}`] = text.innerHTML;
            doneInput.value = '';
        }
    }
}

// this function is called to when user adds a new list item
function addNewItem(type, value){
    if (localUser){
        if (type === 'todo'){
            // figures out id based on length of keys in object section plus 1
            let number = Object.keys(obj.todo).length + 1;
            // creating new elements to populate with info from input field
            let item = document.createElement('div');
            let text = document.createElement('p');
            let close = document.createElement('button');
            // close button just has an x in, and event listener to play a delete
            // animation and delete said item from local storage
            close.classList.add('main-grid-to-do-list-item-close');
            close.innerHTML = 'X';
            close.addEventListener('click', function() {
                document.querySelector(`div[data="todo-${number}"]`).style.animation = 'deleteItem 0.4s linear';
                setTimeout(function() {
                    document.querySelector(`div[data="todo-${number}"]`).remove();
                    delete obj.todo[`todo-${number}`];
                    updateLocalStorage();
                }, 390);
            });
            // set item class, data value to determine its relation to the object,
            // text, and sets it to be draggable to move from list to list
            item.classList.add('main-grid-to-do-list-item');
            item.setAttribute('data', `todo-${number}`);
            // enables dragging for the item, and sets the data as the text
            item.setAttribute('draggable', 'true');
            item.addEventListener('dragstart', function(event){
                event.dataTransfer.setData('text', event.target.querySelector('p').innerHTML);
                dragged = event.target;
            })
            item.addEventListener('dragstart', function(event){
                event.dataTransfer.setData('text', event.target.innerHTML);
                dragged = event.target;
            })
            if (value === ''){
                text.innerHTML = 'Untitled';
            }
            else{
                text.innerHTML = value;
            }
            item.appendChild(text);
            item.appendChild(close);
            todoList.appendChild(item);
            // adds to JS object to be referenced easily
            obj.todo[`todo-${number}`] = text.innerHTML;
            // updates object within local storage
            updateLocalStorage();
            todoInput.value = '';
        }
        else if (type === 'doing'){
            // figures out id based on length of keys in object section plus 1
            let number = Object.keys(obj.todo).length + 1;
            // creating new elements to populate with info from input field
            let item = document.createElement('div');
            let text = document.createElement('p');
            let close = document.createElement('button');
            // close button just has an x in, and event listener to play a delete
            // animation and delete said item from local storage
            close.classList.add('main-grid-doing-list-item-close');
            close.innerHTML = 'X';
            close.addEventListener('click', function() {
                document.querySelector(`div[data="doing-${number}"]`).style.animation = 'deleteItem 0.4s linear';
                setTimeout(function() {
                    document.querySelector(`div[data="doing-${number}"]`).remove();
                    delete obj.doing[`doing-${number}`];
                    updateLocalStorage();
                }, 390);
            });
            // set item class, data value to determine its relation to the object,
            // text, and sets it to be draggable to move from list to list
            item.classList.add('main-grid-doing-list-item');
            item.setAttribute('data', `doing-${number}`);
            // enables dragging for the item, and sets the data as the text
            item.setAttribute('draggable', 'true');
            item.addEventListener('dragstart', function(event){
                event.dataTransfer.setData('text', event.target.querySelector('p').innerHTML);
                dragged = event.target;
            })
            if (value === ''){
                text.innerHTML = 'Untitled';
            }
            else{
                text.innerHTML = value;
            }
            item.appendChild(text);
            item.appendChild(close);
            doingList.appendChild(item);
            // adds to JS object to be referenced easily
            obj.doing[`doing-${number}`] = text.innerHTML;
            // updates object within local storage
            updateLocalStorage();
            doingInput.value = '';
        }
        else if (type === 'done'){
            // figures out id based on length of keys in object section plus 1
            let number = Object.keys(obj.todo).length + 1;
            // creating new elements to populate with info from input field
            let item = document.createElement('div');
            let text = document.createElement('p');
            let close = document.createElement('button');
            // close button just has an x in, and event listener to play a delete
            // animation and delete said item from local storage
            close.classList.add('main-grid-done-list-item-close');
            close.innerHTML = 'X';
            close.addEventListener('click', function() {
                document.querySelector(`div[data="done-${number}"]`).style.animation = 'deleteItem 0.4s linear';
                setTimeout(function() {
                    document.querySelector(`div[data="done-${number}"]`).remove();
                    delete obj.done[`done-${number}`];
                    updateLocalStorage();
                }, 390);
            });
            // set item class, data value to determine its relation to the object,
            // text, and sets it to be draggable to move from list to list
            item.classList.add('main-grid-done-list-item');
            item.setAttribute('data', `done-${number}`);
            // enables dragging for the item, and sets the data as the text
            item.setAttribute('draggable', 'true');
            item.addEventListener('dragstart', function(event){
                event.dataTransfer.setData('text', event.target.querySelector('p').innerHTML);
                dragged = event.target;
            })
            if (value === ''){
                text.innerHTML = 'Untitled';
            }
            else{
                text.innerHTML = value;
            }
            item.appendChild(text);
            item.appendChild(close);
            doneList.appendChild(item);
            // adds to JS object to be referenced easily
            obj.done[`done-${number}`] = text.innerHTML;
            // updates object within local storage
            updateLocalStorage();
            doneInput.value = '';
        }
    }
    else if (googleUser){
        if (type === 'todo'){
            let number = 1;
            // figures out id based on length of keys in object section plus 1
            if (Object.keys(obj.todo).length >= 1){
                number = Object.keys(obj.todo).length + 1;
            }
            // creating new elements to populate with info from input field
            let item = document.createElement('div');
            let text = document.createElement('p');
            let close = document.createElement('button');
            // close button just has an x in, and event listener to play a delete
            // animation and delete said item from local storage
            close.classList.add('main-grid-to-do-list-item-close');
            close.innerHTML = 'X';
            close.addEventListener('click', function() {
                document.querySelector(`div[data="todo-${number}"]`).style.animation = 'deleteItem 0.4s linear';
                setTimeout(function() {
                    document.querySelector(`div[data="todo-${number}"]`).remove();
                    delete obj.todo[`todo-${number}`];
                    deleteGoogleUserData('todo', `todo-${number}`);
                }, 390);
            });
            // set item class, data value to determine its relation to the object,
            // text, and sets it to be draggable to move from list to list
            item.classList.add('main-grid-to-do-list-item');
            item.setAttribute('data', `todo-${number}`);
            // enables dragging for the item, and sets the data as the text
            item.setAttribute('draggable', 'true');
            item.addEventListener('dragstart', function(event){
                event.dataTransfer.setData('text', event.target.querySelector('p').innerHTML);
                dragged = event.target;
            })
            item.addEventListener('dragstart', function(event){
                event.dataTransfer.setData('text', event.target.innerHTML);
                dragged = event.target;
            })
            if (value === ''){
                text.innerHTML = 'Untitled';
            }
            else{
                text.innerHTML = value;
            }
            item.appendChild(text);
            item.appendChild(close);
            todoList.appendChild(item);
            // adds to JS object to be referenced easily
            obj.todo[`todo-${number}`] = text.innerHTML;
            // updates object within local storage
            updateGoogleUserData('todo', `todo-${number}`, text.innerHTML);
            todoInput.value = '';
        }
        else if (type === 'doing'){
            let number = 1;
            // figures out id based on length of keys in object section plus 1
            if (Object.keys(obj.doing).length >= 1){
                number = Object.keys(obj.doing).length + 1;
            }
            // creating new elements to populate with info from input field
            let item = document.createElement('div');
            let text = document.createElement('p');
            let close = document.createElement('button');
            // close button just has an x in, and event listener to play a delete
            // animation and delete said item from local storage
            close.classList.add('main-grid-doing-list-item-close');
            close.innerHTML = 'X';
            close.addEventListener('click', function() {
                document.querySelector(`div[data="doing-${number}"]`).style.animation = 'deleteItem 0.4s linear';
                setTimeout(function() {
                    document.querySelector(`div[data="doing-${number}"]`).remove();
                    delete obj.doing[`doing-${number}`];
                    deleteGoogleUserData('doing', `doing-${number}`);
                }, 390);
            });
            // set item class, data value to determine its relation to the object,
            // text, and sets it to be draggable to move from list to list
            item.classList.add('main-grid-doing-list-item');
            item.setAttribute('data', `doing-${number}`);
            // enables dragging for the item, and sets the data as the text
            item.setAttribute('draggable', 'true');
            item.addEventListener('dragstart', function(event){
                event.dataTransfer.setData('text', event.target.querySelector('p').innerHTML);
                dragged = event.target;
            })
            if (value === ''){
                text.innerHTML = 'Untitled';
            }
            else{
                text.innerHTML = value;
            }
            item.appendChild(text);
            item.appendChild(close);
            doingList.appendChild(item);
            // adds to JS object to be referenced easily
            obj.doing[`doing-${number}`] = text.innerHTML;
            // updates object within local storage
            updateGoogleUserData('doing', `doing-${number}`, text.innerHTML);
            doingInput.value = '';
        }
        else if (type === 'done'){
            let number = 1;
            // figures out id based on length of keys in object section plus 1
            if (Object.keys(obj.done).length >= 1){
                number = Object.keys(obj.done).length + 1;
            }
            // creating new elements to populate with info from input field
            let item = document.createElement('div');
            let text = document.createElement('p');
            let close = document.createElement('button');
            // close button just has an x in, and event listener to play a delete
            // animation and delete said item from local storage
            close.classList.add('main-grid-done-list-item-close');
            close.innerHTML = 'X';
            close.addEventListener('click', function() {
                document.querySelector(`div[data="done-${number}"]`).style.animation = 'deleteItem 0.4s linear';
                setTimeout(function() {
                    document.querySelector(`div[data="done-${number}"]`).remove();
                    delete obj.done[`done-${number}`];
                    deleteGoogleUserData('done', `done-${number}`);
                }, 390);
            });
            // set item class, data value to determine its relation to the object,
            // text, and sets it to be draggable to move from list to list
            item.classList.add('main-grid-done-list-item');
            item.setAttribute('data', `done-${number}`);
            // enables dragging for the item, and sets the data as the text
            item.setAttribute('draggable', 'true');
            item.addEventListener('dragstart', function(event){
                event.dataTransfer.setData('text', event.target.querySelector('p').innerHTML);
                dragged = event.target;
            })
            if (value === ''){
                text.innerHTML = 'Untitled';
            }
            else{
                text.innerHTML = value;
            }
            item.appendChild(text);
            item.appendChild(close);
            doneList.appendChild(item);
            // adds to JS object to be referenced easily
            obj.done[`done-${number}`] = text.innerHTML;
            // updates object within local storage
            updateGoogleUserData('done', `done-${number}`, text.innerHTML);
            doneInput.value = '';
        }
    }
}

function updateLocalStorage() {
    localStorage.setItem('obj', JSON.stringify(obj));
}