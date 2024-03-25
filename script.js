const $ = document
const containerElem = $.querySelector('.container'),
addNewElemHandle = $.querySelector('.add-new-note'),
iconElemHandle = $.querySelector('.menu-svg'),
menuElemHandle = $.querySelector('.menu-extend'),
modalElem = $.querySelector('.modal'),
overlayElem = $.querySelector('.overlay'),
btnAddElem = $.querySelector('.btn-add'),
inputTitleElem = $.querySelector('.input-title'),
inputDescElem = $.querySelector('.input-desc'),
closeModalElem = $.querySelector('.close-modal'),
btnEditElem = $.querySelector('.btn-edit'),
btnDeleteElem = $.querySelector('.btn-delete'),
noteElem = $.querySelector('.note'),
noteTitle = $.querySelector('.note-title'),
noteButton = $.querySelector('.note-button');

let isUpdate = false
let isMenu = false
let notesArray = []

// const menuHandler = () => {
//     if (!isMenu) {
//         menuElemHandle.style.display = "flex"
//         isMenu = true
//     } else{
//         menuElemHandle.style.display = "none"
//         isMenu = false
//     }
// }

const openModal = () => {
    modalElem.style.display = "flex"
    overlayElem.style.display = "flex"
    inputTitleElem.focus()

}

const generateNotes = (notes) => {

    modalElem.style.display = "none"
    overlayElem.style.display = "none"
        
    
    
    notes.forEach(note => { containerElem.insertAdjacentHTML("beforeend" ,`<div class="box note">
            <div class="head-box">
                <h2>${note.title}</h2>
                <p>${note.desc}</p>
            </div>
            <div class="foot-box">
                <p class="date">${note.date}</p>
                <img class="menu-svg" onclick="showMenu(this)" src="assets/ellipsis-solid.svg" width="40px" alt="menu-icon">
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
        )
    })

    if (isUpdate) {
        noteTitle.textContent = "Update Note"
        noteButton.textContent = "Update Note"
    }else{
        noteTitle.textContent = "Add a New Note"
        noteButton.textContent = "Add Note"
    }
}

const showMenu = (el) => {
    el.nextElementSibling.classList.add("show")
}

const getLocalStorage = () => {
    let localStorageNotes = localStorage.getItem('notes')
    
    if (localStorageNotes) {
        notesArray = JSON.parse(localStorageNotes)
    } else {
        notesArray = []
    }
    
    return notesArray
}

const setLocalStorage = (notesList) => {
    localStorage.setItem('notes', JSON.stringify(notesList))
}

window.addEventListener('load', () => {
    let notes = getLocalStorage()
    console.log(notes);
    generateNotes(notes)
})

const closeModal = () => {
    modalElem.style.display = "none"
    overlayElem.style.display = "none"
}

const deleteFromDom = () => {
    noteElem.style.display = "none"
}

window.addEventListener('keyup', event => {
    if (event.key === "Escape") {
        closeModal()
    }
})

btnAddElem.addEventListener('click', () => {
    const currentData = new Date()
    let newNoteObj = {
        id: notesArray.length + 1,
        title: inputTitleElem.value.trim(),
        desc: inputDescElem.value.trim(),
        date: currentData.toLocaleString('default', {month: 'long'}) + ' ' + currentData.getDate() + ', ' + currentData.getFullYear()
    }

    notesArray.push(newNoteObj)
    setLocalStorage(notesArray)
    generateNotes(notesArray)
})
addNewElemHandle.addEventListener('click', openModal)
closeModalElem.addEventListener('click', closeModal)
// btnDeleteElem.addEventListener('click', deleteFromDom)
