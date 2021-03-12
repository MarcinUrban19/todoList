let $todoInput;// miejsce na tresc zadan uzytkownika
let $alertInfo;//info o braku zadan
let $addBtn;//dodaje nowe elementy do listy(przycisk)
let $ulList;//lista zadan ul
let $newTask;//nowe zadanie dodane do listy   
let $popup;// edytor zadan
let $popupInfo;//alert w popupie
let $editedTodo;//edytowany todo
let $popupInput;//teskt wpisywany w popup
let $addPopupBtn;//przycisk zatwierdzanie w popup
let $closeTodoBtn;//przycisk zamykajacy popup
let $idNumber = 0 ;
let $allTasks;



const main = () =>{
    prepereDOMElements();
    prepereDOMEvents();
};

//pobieramy elementy
const prepereDOMElements = () =>{
    $todoInput = document.querySelector('.todoInput');
    $alertInfo = document.querySelector('.alertInfo');
    $addBtn = document.querySelector('.addBtn');
    $ulList = document.querySelector('.todoList ul');
    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popupInfo');
    $popupInput = document.querySelector('.popupInput');
    $addPopupBtn = document.querySelector('.accept');
    $closeTodoBtn = document.querySelector('.cancel');
    $allTasks = $ulList.getElementsByTagName('li');

    
};


//nasluchujemy 
const prepereDOMEvents = () =>{
    $addBtn.addEventListener('click', addNewTask);
    $ulList.addEventListener('click',checkClick);
    $closeTodoBtn.addEventListener('click',closePopup);
    $addPopupBtn.addEventListener('click',changeTodo);
    $todoInput.addEventListener('keydown',enterCheck)
   
};

const addNewTask = () =>{
    if($todoInput.value !== '')
    {
        $idNumber++;
        $newTask = document.createElement('li');
        $newTask.innerText = $todoInput.value;
        $newTask.setAttribute('id', `todo-${$idNumber}`);
        $ulList.appendChild($newTask);

        $todoInput.value = '';
        $alertInfo.innerText = '';
        createToolsArea();

    }else
    {
        $alertInfo.innerText = 'Wpisz tresc zadania!'
    } 
};
const enterCheck = () =>{
    if(event.keyCode === 13){
        addNewTask();
    }
};

const createToolsArea = () =>{
    const toolsPanel = document.createElement('div');
    toolsPanel.classList.add('tools')
    $newTask.appendChild(toolsPanel);

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete');
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    toolsPanel.appendChild(completeBtn);

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.innerText = 'EDIT';
    toolsPanel.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
    toolsPanel.appendChild(deleteBtn);
}

const checkClick = (e) =>{
    if(e.target.closest('button').classList.contains('complete'))
    {
        e.target.closest('li').classList.toggle('completed')
        e.target.closest('button').classList.toggle('completed')

    }else if(e.target.closest('button').className ==='edit')
    {
        editTask(e);
    }
    else if(e.target.closest('button').className ==='delete'){
        deleteTask(e);
    }

};

const editTask = (e) => {
    const oldTodo = e.target.closest('li').id;
    $editedTodo = document.getElementById(oldTodo);
    console.log($editedTodo);
    $popup.style.display = 'flex';
    
    $popupInput.value = $editedTodo.firstChild.textContent; 

};

const changeTodo = () =>{
    if ($popupInput.value !==''){
        $editedTodo.firstChild.textContent = $popupInput.value;
        $popup.style.display = 'none';
        $popupInfo.innerText = '';
    }else{
        $popupInfo.innerText = 'Podaj treść zadania!';
    }
}

const closePopup = ()=>{
    $popup.style.display = 'none';
    $popupInfo.innerText = '';  
};
const deleteTask = (e) =>{
    const deleteTodo = e.target.closest('li');
    deleteTodo.remove();
    $popup.style.display = 'none';

    if($allTasks.length === 0) {
        $alertInfo.innerText = 'Brak zadań na liście.';
    }
}




document.addEventListener('DOMContentLoaded', main);
