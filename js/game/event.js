class Event {

    static startGame(event) {
        const mousePos = Controls.getMousePos(canvas, event)
        if (isInside(mousePos, startBtn)) {
            console.log("clicked start")
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            startLoop()
        }
    }

    static resetGame(event) {
        const mousePos = Controls.getMousePos(canvas, event)
        if (isInside(mousePos, startBtn)) {
            console.log("clicked reset")
            interval = 0
            x = canvas.width/2
            y = canvas.height-30
            ballDX = 2
            ballDY = -2
            paddleX = (canvas.width-paddleWidth)/2
            resetBricks()
            startLoop()
        }
    }

    static setupNextLevel(event) {
        const mousePos = Controls.getMousePos(canvas, event)
        if (isInside(mousePos, startBtn)) {
            console.log("clicked next")
            interval = 0
            ballX = canvas.width/2
            ballY = canvas.height-30
            ballDX = 2
            ballDY = -2
            paddleX = (canvas.width-paddleWidth)/2
            console.log("Next Level!") // Actually need to iterate through levels
            resetBricks()
            startLoop()
        }
    }

    static triggerLevelEditor(event) {  
        const mousePos = Controls.getMousePos(canvas, event)
        if (isInside(mousePos, startBtn)) {
            console.log("clicked new")
            editorBricks = []
            interval = 0
            ballX = canvas.width/2
            ballY = canvas.height-30
            ballDX = 2
            ballDY = -2
            paddleX = (canvas.width-paddleWidth)/2
            Level.setupEditor()
        }
    }

    static clearEvents() {
        canvas.removeEventListener('click', Event.startGame)
        canvas.removeEventListener('click', Event.resetGame)
        canvas.removeEventListener('click', Event.setupNextLevel)
        canvas.removeEventListener('click', Event.triggerLevelEditor)
    }
}