const $ = document

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


iconElemHandle.addEventListener('click', menuHandler)