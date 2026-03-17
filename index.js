const alertEL = document.querySelector('.alert');
const formEL = document.querySelector('.grocery-form');
const inputEL = document.getElementById('grocery');
const addBtn = document.querySelector(".add");
const containerEL = document.querySelector('.grocery-container');
const listEL = document.querySelector('.list');
const clearBtn = document.querySelector('.clear');

let editEL;
let editFlag = false;
let editID = "";

formEL.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItem);
window.addEventListener("DOMContentLoaded", loadItems);

function addItem(e){
    e.preventDefault();
    const value = inputEL.value;
    const id = new Date().getTime().toString();

    if(value && !editFlag){
        createItems(id,value);
        containerEL.classList.add("show-container");
        displayAlert("item Successfully added", "success");
        intolocalStorage(id,value);
        setDefault();
    }
    else if(value && editFlag){
        editEL.innerHTML = value
        displayAlert("Item Edited", "success");
        editLocalStorage(editID,value);
        setDefault();
    }
    else{
        displayAlert("Please Enter an Item", "danger");
    }

}

function deleteItems(e){
    const target = e.currentTarget.parentElement.parentElement;
    const id = target.dataset.id;
    listEL.removeChild(target);

    if(listEL.children.length === 0) {
        containerEL.classList.remove("show-container");
    }
    displayAlert("Item Deleted", "danger")
    setDefault();
    removeFromLocalStorage(id);
}

function editItems(e){
    const target = e.currentTarget.parentElement.parentElement;
    editEL = e.currentTarget.parentElement.previousElementSibling;
    inputEL.value = editEL.innerHTML;
    editFlag = true;
    editID = target.dataset.id;
    addBtn.textContent = "Edit"
}

function displayAlert(text,action){
    alertEL.textContent = text;
    alertEL.classList.add(`alert-${action}`);   

    setTimeout(function(){
        alertEL.textContent = "";
        alertEL.classList.remove(`alert-${action}`);
    },1000);
}

function clearItem(){
    const itemsEL = document.querySelectorAll(".items"); 
    if(itemsEL.length>0){
        itemsEL.forEach(function(itemsEL){
            listEL.removeChild(itemsEL);
        });
    }
    containerEL.classList.remove("show-container");
    displayAlert("Items Cleared", "success");
    setDefault();
    localStorage.removeItem("list");
}

function setDefault(){
    inputEL.value = '';
    editFlag = false;
    editID = '';
    addBtn.textContent = "Add";
}

function intolocalStorage(id, value){
    const grocery = {id,value}
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem("list", JSON.stringify(items));
}

function removeFromLocalStorage(id){
    let items = getLocalStorage();
    items = items.filter(function(items){
        if(items.id !== id){
            return items;
        }
    });
    localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(id, value){
    let items = getLocalStorage();
    items = items.map(function(item){
        if(item.id === id){
            item.value = value;
        }
        return item;
    });
    localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage(){
    return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")): [];
}

function loadItems(){
    let items = getLocalStorage();
    if(items.length>0){
        items.forEach(function(items){
            createItems(items.id, items.value)
        })
        containerEL.classList.add('show-container');
    }
}

function createItems(id,value){
    let element = document.createElement("article");
    element.classList.add("items");
    let attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML=`<p class="item">${value}</p>
                <div class="buttons">
                    <button type="button" class="edit-btn">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button type="button" class="delete-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>`;
    const deleteEL = element.querySelector(".delete-btn");
    const editEL = element.querySelector(".edit-btn");
    deleteEL.addEventListener("click", deleteItems);
    editEL.addEventListener("click", editItems)
    listEL.appendChild(element);
}
