class Event {

    static startGame(event) {
        const mousePos = Input.getMousePos(canvas, event)
        if (isInside(mousePos, startBtn)) {
            console.log("clicked start")
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            levelNum = 0
            currentLevel = Level.all[levelNum]
            testingNewLevel = false
            startLoop()
        }
    }

    static resetGame(event) {
        const mousePos = Input.getMousePos(canvas, event)
        if (isInside(mousePos, startBtn)) {
            console.log("clicked reset")
            gameInterval = 0
            ballX = canvas.width/2
            ballY = canvas.height-paddleHeight-ballRadius
            ballDX = Math.cos(0.5/2*Math.PI)*ballVel+(levelNum/2)
            ballDY = -(Math.sin(0.5/2*Math.PI)*ballVel)-(levelNum/2)
            paddleX = (canvas.width-paddleWidth)/2
            paddleVel = 0
            Level.resetBricks()
            startLoop()
        }
    }

    static setupNextLevel(event) {
        const mousePos = Input.getMousePos(canvas, event)
        if (isInside(mousePos, startBtn)) {
            console.log("clicked next")
            gameInterval = 0
            ballX = canvas.width/2
            ballY = canvas.height-30
            ballVel += 0.5 // Increase difficulty by increasing ball speed
            ballDX = Math.cos(0.5/2*Math.PI)*ballVel  // X and Y to launch at 45 degree angle at ballVel(velocity)
            ballDY = -(Math.sin(0.5/2*Math.PI)*ballVel)
            paddleX = (canvas.width-paddleWidth)/2
            paddleVel = 0
            levelNum++
            currentLevel = Level.all[levelNum]
            startLoop()
        }
    }

    static triggerLevelEditor(event) {  
        const mousePos = Input.getMousePos(canvas, event)
        if (isInside(mousePos, startBtn)) {
            console.log("clicked new")
            editorBricks = []
            gameInterval = 0
            ballX = canvas.width/2
            ballY = canvas.height-30
            ballVel += 0.5
            ballDX = Math.cos(0.5/2*Math.PI)*ballVel  // X and Y to launch at 45 degree angle at ballVel(velocity)
            ballDY = -(Math.sin(0.5/2*Math.PI)*ballVel)
            paddleX = (canvas.width-paddleWidth)/2
            paddleVel = 0
            Level.setupEditor()
        }
    }

    static setupSubmitLevel(event) {
        const mousePos = Input.getMousePos(canvas, event)
        if (isInside(mousePos, startBtn)) {
            document.querySelector('#button-box').remove()
            API.submitLevel()
        }
    }

    static clearEvents() {
        canvas.removeEventListener('click', Event.startGame)
        canvas.removeEventListener('click', Event.resetGame)
        canvas.removeEventListener('click', Event.setupNextLevel)
        canvas.removeEventListener('click', Event.triggerLevelEditor)
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
        }
    }
}