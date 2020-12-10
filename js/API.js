const BASE_URL = "http://localhost:3000"

class API {

    static submitUserForm(){
        fetch(`${BASE_URL}/users`, {
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
    }

    static loadUsersInForm() {
        fetch(`${BASE_URL}/users`)
        .then(resp => resp.json())
        .then(users => {
            for(const user of users) {
                addUserToSelect(user)
            }
        })
    }

    static submitLevel() {
        debugger
        fetch(`${BASE_URL}/levels`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(currentLevel)
        })
        .then(resp => resp.json())
        .then(level => {
            debugger
        })
    }
}