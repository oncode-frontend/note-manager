const $ = document
const containerElem = $.querySelector('.container')
const addNewElemHandle = $.querySelector('.add-new-note')
const iconElemHandle = $.querySelector('.menu-svg')
const menuElemHandle = $.querySelector('.menu-extend')
const modalElem = $.querySelector('.modal')
const overlayElem = $.querySelector('.overlay')
const btnAddElem = $.querySelector('.btn-add')
const inputTitleElem = $.querySelector('.input-title')
const inputDescElem = $.querySelector('.input-desc')

let isMenu = false
const menuHandler = () => {
    if (!isMenu) {
        menuElemHandle.style.display = "flex"
        isMenu = true
    } else{
        menuElemHandle.style.display = "none"
        isMenu = false
    }
}

const openModal = () => {
        modalElem.style.display = "flex"
        overlayElem.style.display = "flex"

    }
    
const addNewNote = () => {
    const inputTitle = inputTitleElem.value
    const inputDesc = inputDescElem.value
    const currentData = new Date()

    let addNewNoteBox = `<div class="box">
            <div class="head-box">
                <h2>${inputTitle}</h2>
                <p>${inputDesc}</p>
            </div>
            <div class="foot-box">
                <p class="date">${currentData.toLocaleString('default', {month: 'long'}) + ' ' + currentData.getDate() + ', ' + currentData.getFullYear()}</p>
                <img class="menu-svg" src="assets/ellipsis-solid.svg" width="40px" alt="menu-icon">
                <div class="menu-extend">
                    <span class="flex btn-edit">
                        <img src="./assets/pen-solid.svg" width="15px" alt="">
                        <h4>Edit</h4>
                    </span>
                    <span class="flex btn-delete">
                        <img src="./assets/trash-solid.svg" width="15px" alt="">
                        <h4>Delete</h4>
                    </span>
                </div>
            </div>
        </div>`

    containerElem.insertAdjacentHTML("beforeend" ,addNewNoteBox)
    modalElem.style.display = "none"
    overlayElem.style.display = "none"
}

iconElemHandle.addEventListener('click', menuHandler)
addNewElemHandle.addEventListener('click', openModal)
btnAddElem.addEventListener('click', addNewNote)