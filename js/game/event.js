class Event {

    static startGame(event) {
        console.log("clicked start")
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        levelNum = 0
        currentLevel = allLevels[levelNum]
        currentLives = startingLives
        testingNewLevel = false
        ballVel = defBallVel
        score = 0
        currentLevel.resetBricks()
        gameInterval = 0
        Level.resetBallAndPaddle()
        Button.removeAllChildNodes(buttonBox)
        startLoop()
    }

    static retryLevel(event) {
        console.log("clicked reset")
        gameInterval = 0
        currentLevel.resetBricks
        Level.resetBallAndPaddle()
        Button.removeAllChildNodes(buttonBox)
        startLoop()
    }

    static setupNextLevel(event) {
        console.log("clicked next")
        gameInterval = 0
        levelNum++
        ballVel += defBallVel + (levelNum*difIncrement)
        Level.resetBallAndPaddle()
        currentLevel = allLevels[levelNum]
        Button.removeAllChildNodes(buttonBox)
        startLoop()
    }

    static triggerLevelEditor(event) {  
        console.log("clicked new")
        ballVel += difIncrement
        Level.setupEditor()
    }

    static setupSubmitLevel(event) {
        document.querySelector('#button-box').remove()
        API.submitLevel()
    }

    static toggleBrick(event, newBrick) {
        const mousePos = Input.getMousePos(canvas, event)
        if (isInside(mousePos, {x: newBrick.x, y: newBrick.y, width: brickWidth, height: brickHeight})) {
            if (!!newBrick.status) {                 // CREATE CASE FOR DIFFERENT BLOCKS
                Draw.clearBrick(newBrick.x, newBrick.y)
                newBrick.status = 0
            } else {
                Draw.fillBrick(newBrick.x, newBrick.y)
                newBrick.status = 1
            }
        }
    }

    static clearEvents() {
        for (const brick of editorBricks) {
            canvas.removeEventListener('click', e => {
                Event.toggleBrick(e, brick)
            })
        }
    }

    static controlsHandler(e) {
        switch (e.target.innerText) {
            case "CLEAR":
                Level.clearBrickField()
                break
            case "FILL":
                Level.fillBrickField()
                break
            case "SUBMIT":
                Level.playtestNewLevel()
                break
            case "YES":
                API.submitLevel()
                break
            case "NO":
                Level.setupEditor()
        }
    }
}