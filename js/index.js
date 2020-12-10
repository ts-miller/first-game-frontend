const userForm = document.getElementById('form-container')
let userSelect = document.querySelector('#user-select')
let newUser = document.querySelector('#new-user')
let currentUser

function loadFormListener() {
    userForm.addEventListener('submit', e => {
        e.preventDefault()
        API.submitUserForm()
    })
}

function getInfo() {
    let userName = ''
    if (newUser.value) {
        userName = newUser.value
    } else {
        userName = userSelect.value
    }
    return {
        user: {
            name: userName
        }
    }
}

function addUserToSelect(user) {
    const newOption = document.createElement('option')
    newOption.value = user.name
    newOption.innerText = user.name
    userSelect.appendChild(newOption)
}

loadFormListener()
API.loadUsersInForm()