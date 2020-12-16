class User {
    constructor(id, name, highScore) {
        this.id = id
        this.name = name
        this.highScore = highScore
        this.lives = startingLives
        this.score = 0
    }

    checkFor1Up() {
        (this.score % oneUpIncrement === 0) ? this.lives++ : false
    }
}