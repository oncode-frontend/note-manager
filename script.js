const $ = document
const containerElem = $.querySelector('.container'),
addNewElemHandle = $.querySelector('.add-new-note'),
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
let updateId = null
let notesArray = []

const openModal = (noteId, editnoteTitle, editnoteDesc) => {
    modalElem.style.display = "flex"
    overlayElem.style.display = "flex"
    
    if (isUpdate) {
        noteTitle.textContent = "Update Note"
        noteButton.textContent = "Update Note"
        inputTitleElem.value = editnoteTitle
        inputDescElem.value = editnoteDesc
    }else{
        noteTitle.textContent = "Add a New Note"
        noteButton.textContent = "Add Note"
        inputTitleElem.placeholder = "enter title"
        inputDescElem.placeholder = "enter description"
    }
    inputTitleElem.focus()
}

const generateNotes = (notes) => {

    modalElem.style.display = "none"
    overlayElem.style.display = "none"
        
    $.querySelectorAll('.note').forEach(note => note.remove())
    
    notes.forEach((note, index) => { containerElem.insertAdjacentHTML("beforeend" ,`<div class="box note">
            <div class="head-box">
                <h2>${note.title}</h2>
                <p>${note.desc}</p>
            </div>
            <div class="foot-box">
                <p class="date">${note.date}</p>
                <img class="menu-svg" onclick="showMenu(this)" src="assets/ellipsis-solid.svg" width="40px" alt="menu-icon">
                <div class="menu-extend">
                    <span onclick="editNoteFromDom(${index}, '${note.title}', '${note.desc}')" class="flex btn-edit">
                        <img src="./assets/pen-solid.svg" width="15px" alt="">
                        <h4>Edit</h4>
                    </span>
                    <span onclick="deleteNoteFromDom(${index})" class="flex btn-delete">
                        <img src="./assets/trash-solid.svg" width="15px" alt="">
                        <h4>Delete</h4>
                    </span>
                </div>
            </div>
        </div>`
        )
    })

}

const showMenu = (el) => {
    el.nextElementSibling.classList.add("show")
    $.addEventListener('click', ev => {
        if (ev.target !== el) {
            el.nextElementSibling.classList.remove("show")
        }
    })
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

const clearInput = () => {
    inputTitleElem.value = ""
    inputDescElem.value = ""
}

const editNoteFromDom = (noteId, noteTitle, noteDesc) => {
    isUpdate = true
    openModal(noteId, noteTitle, noteDesc)
    updateId = noteId
}

const deleteNoteFromDom = (noteIndex) => {

    let deleted = confirm("Are you sure to delete note?")

    if (deleted) {
        let localNotes = getLocalStorage()
        localNotes.splice(noteIndex, 1)
        setLocalStorage(localNotes)
        generateNotes(localNotes)
    }
}

window.addEventListener('keyup', event => {
    if (event.key === "Escape") {
        closeModal()
    }
})

btnAddElem.addEventListener('click', () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentData = new Date()
    
    if (isUpdate) {
        let allNotes = getLocalStorage()

        allNotes.some((note, index) => {
            if (index === updateId) {
                note.title = inputTitleElem.value
                note.desc = inputDescElem.value
            }
        })
        setLocalStorage(allNotes)
        generateNotes(allNotes)
        closeModal()
        clearInput()
        isUpdate = false

    } else {
        let newNoteObj = {
                id: notesArray.length + 1,
                title: inputTitleElem.value.trim(),
                desc: inputDescElem.value.trim(),
                date: currentData.toLocaleString('default', {month: 'long'}) 
                + ' ' + currentData.getDate() + ', ' 
                + currentData.getFullYear() + ' '
                + '('+ days[currentData.getDay()] +')'
        }
        notesArray.push(newNoteObj)
        setLocalStorage(notesArray)
        generateNotes(notesArray)
        clearInput()
    }
})
addNewElemHandle.addEventListener('click', openModal)
closeModalElem.addEventListener('click', closeModal)