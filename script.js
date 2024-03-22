const $ = document
const containerElem = $.querySelector('.container')
const addNewElemHandle = $.querySelector('.add-new-note')
const iconElemHandle = $.querySelector('.menu-svg')
const menuElemHandle = $.querySelector('.menu-extend')


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

const addNewNote = () => {
    let addNewNoteBox = `<div class="box">
            <div class="head-box">
                <h2>Learn Js</h2>
                <p>I'll learn js from w3school</p>
            </div>
            <div class="foot-box">
                <p class="date">April 12, 2024</p>
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
}

iconElemHandle.addEventListener('click', menuHandler)
addNewElemHandle.addEventListener('click', addNewNote)