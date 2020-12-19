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

function addLeaderBoard() {
    const div = document.createElement('DIV')
    div.id = 'leaderBoard'
    div.className = 'center'
    const ol = document.createElement('OL')
    const result = allUsers.sort((a, b) => b.highScore - a.highScore)
    for (const user of result) {
        const li = document.createElement('LI')
        li.id = user.id
        li.innerText = `${user.name} - Score: ${user.highScore}`
        ol.appendChild(li)
    }
    div.appendChild(ol)
    wrapper.appendChild(div)
}

loadFormListener()
API.loadUsersInForm()