class Level {

    constructor(name, user, bricks) {
        this.name = name
        this.user = user
        this.bricks = bricks
        allLevels.push(this)
    }

    static setupEditor() {
        Button.removeAllChildNodes(buttonBox)
        Button.editorControls()
        Event.clearEvents()
        gameControls.innerText = 'Tier 1 Brick: 1 Click \r\n Tier 2 Brick: 2 Clicks'
        gameInterval = 0
        editorBricks = []
        paddle.x = (canvas.width-paddleWidth)/2
        paddle.vel = 0
        this.createBrickField()
    }

    isLast() {
        return !!(this == allLevels[allLevels.length-1])
    }

    static clearBrickField() {
        for (const brick of editorBricks) {
            brick.status = 0
            Draw.clearBrick(brick)
        }
    }

    static fillBrickField() {
        for (const brick of editorBricks) {
            (brick.status) ? brick.status = 2 : brick.status = 1 // Turns on every brick
            Draw.fillBrick(brick)
        }
    }

    static createBrickField() {
        for(let r = 0; r < brickRows; r++) { // Iterate through each row
            for(let c = 0; c < brickColumns; c++) { // Iterate through each column
                const brickBox = {x: brickWidth*c, y: brickHeight*r}
                Draw.clearBrick(brickBox)
                const newBrick = {
                    x: brickWidth*c,
                    y: brickHeight*r,
                    status: 0
                }
                editorBricks.push(newBrick)
                canvas.addEventListener('click', e => {
                    Event.toggleBrick(e, newBrick)
                })
            }
        }
    }

    static resetBallAndPaddle() {
        ball.x = canvas.width/2
        ball.y = canvas.height-ball.radius-paddleHeight-paddleFloat-hudHeight
        ball.dx = Math.cos(0.5/2*Math.PI)*ball.vel  // X and Y to launch at 45 degree angle at ballVel(velocity)
        ball.dy = -(Math.sin(0.5/2*Math.PI)*ball.vel)
        paddle.x = (canvas.width-paddle.width)/2
        paddle.vel = 0
    }

    static checkWin() {
        if (currentLevel.bricks.every(brick => !brick.status)) {
            if (testingNewLevel) {
                Event.clearEvents() // This method doesn't seem to be working here but Imma leave it here JIC.
                Button.removeAllChildNodes(buttonBox)
                Button.confirmationButtons()
            } else if (currentLevel.isLast()) {
                Button.newLevel()
            } else {
                Button.nextLevel()
            }
            winLevelSound.play()
            clearInterval(gameInterval)
        }
    }

    static playtestNewLevel() {
        alert("Get ready to play your level!")
        gameControls.innerText = 'Paddle Movement: Arrow Left/Right \r\n Launch Ball: Space \r\n Pause: P'
        testingNewLevel = true
        gameInterval = 0
        const packedBricks = editorBricks.filter(brick => !!brick.status === true)
        currentLevel = new Level(levelNameField.value, currentUser, packedBricks)
        this.resetBallAndPaddle()
        startLoop()
    }
}