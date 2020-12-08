class API {

    static submitUserForm(){
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
}