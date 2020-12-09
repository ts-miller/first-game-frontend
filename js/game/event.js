class Event {

    static startGame(event) {
        const mousePos = Controls.getMousePos(canvas, event)
        if (isInside(mousePos, startBtn)) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            // ctx.fillStyle = '#ffffff'
            // ctx.fillRect(0, 0, canvas.width, canvas.height)
            // Draw.editorGrid()
            startLoop()
        }
    }

    static resetGame(event) {
        const mousePos = Controls.getMousePos(canvas, event)
        if (isInside(mousePos, startBtn)) {
            interval = 0
            x = canvas.width/2
            y = canvas.height-30
            moveX = 2
            moveY = -2
            paddleX = (canvas.width-paddleWidth)/2
            resetBricks()
            startLoop()
        }
    }

    static setupNextLevel(event) {
        const mousePos = Controls.getMousePos(canvas, event)
        if (isInside(mousePos, startBtn)) {
            interval = 0
            x = canvas.width/2
            y = canvas.height-30
            moveX = 2
            moveY = -2
            paddleX = (canvas.width-paddleWidth)/2
            console.log("Next Level!") // Actually need to iterate through levels
            resetBricks()
            startLoop()
        }
    }

    static setupLevelEditor(event) {
        const mousePos = Controls.getMousePos(canvas, event)
        if (isInside(mousePos, startBtn)) {
            interval = 0
            x = canvas.width/2
            y = canvas.height-30
            moveX = 2
            moveY = -2
            paddleX = (canvas.width-paddleWidth)/2
            Draw.editorGrid()
        }
    }
}