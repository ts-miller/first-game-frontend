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
            currentUser = new User(user.id, user.name, user.high_score)
            if (user.errors) {
                alert('Select or create a user')
            } else {
                userForm.remove()
                document.getElementById('leaderBoard').remove()
                gameContainer.appendChild(canvas)
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
                allUsers.push(new User(user.id, user.name, user.high_score))
            }
            addLeaderBoard()
        })
    }

    static fetchLevels() {
        fetch(`${BASE_URL}/levels`)
        .then(resp => resp.json())
        .then(lvls => {
            for(const l of lvls) {
                new Level(l.name, l.user, l.bricks)
            }
        })
    }

    static updateHighScore() {
        fetch(`${BASE_URL}/users/${currentUser.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: {
                id: currentUser.id,
                high_score: currentUser.score
            }
            })
        })
        .then(resp => resp.json())
        .then(user => {
            currentUser.highScore = currentUser.score
        })
    }

    static submitLevel() {
        for (const brick of currentLevel.bricks) {
            brick.status = 1
        }
        fetch(`${BASE_URL}/levels`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({level: {
                name: currentLevel.name,
                user_id: currentLevel.user.id
                }
            })
        })
        .then(resp => resp.json())
        .then(levelData => {
            for(const brick of currentLevel.bricks) {
                brick.level_id = levelData.id
            }
            fetch(`${BASE_URL}/bricks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({bricks: currentLevel.bricks})
            })
            .then(resp => resp.json())
            .then( brickData => {
                alert('Your Level has been submitted. Click Start to Play again!')
                Button.removeAllChildNodes(buttonBox)
                gameInterval = 0
                loadGame()
            })
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
    }
}