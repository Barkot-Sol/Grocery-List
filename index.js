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

formEL.addEventListener('submit', addItem)

function addItem(e){
    e.preventDefault();
    const value = inputEL.value;
    const id = new Date().getTime().toString();
    if(value && !editFlag){
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
        listEL.appendChild(element);
        containerEL.classList.add("show-container");
        displayAlert("item Successfully added", "success");
        localStorage(id,value);
        setDefault();
    }
    else if(value && editFlag){

    }
    else{
        displayAlert("Please Enter an Item", "danger");
    }

}

function displayAlert(text,action){
    alertEL.textContent = text;
    alertEL.classList.add(`alert-${action}`);   

    setTimeout(function(){
        alertEL.textContent = "";
        alertEL.classList.remove(`alert-${action}`);
    },1000);
}

function setDefault(){
    
}

function localStorage(){

}