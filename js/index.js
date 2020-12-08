const BASE_URL = "http://localhost:3000"
const userForm = document.getElementById('form-container')
let userSelect = document.querySelector('#user-select')
let newUser = document.querySelector('#new-user')
let currentUser

function loadFormListener() {
    userForm.addEventListener('submit', e => {
        e.preventDefault()
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(getInfo())
        })
        .then(resp => resp.json())
        .then(user => {
            currentUser = user
            if (user.errors) {
                alert('Select or create a user')
            } else {
                userForm.remove()
                loadGame()
            }
        })
        .catch( error => {
            console.log('Error', error)
        })
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

function loadUsersInForm() {
    fetch(`${BASE_URL}/users`)
        .then(resp => resp.json())
        .then(users => {
            for(const user of users) {
                addUserToSelect(user)
            }
        })
}

function addUserToSelect(user) {
    const newOption = document.createElement('option')
    newOption.value = user.name
    newOption.innerText = user.name
    userSelect.appendChild(newOption)
}

loadFormListener()
loadUsersInForm()