class Button {

    static start() {
        ctx.fillStyle = '#61aac2'
        ctx.fillRect(startBtn.x, startBtn.y, 100, 50)
        ctx.fillStyle = '#2a4c57'
        ctx.font = "20pt sans-serif"
        ctx.fillText("START", canvas.width/2-43, canvas.height/2+9)
        canvas.addEventListener('click', evt => {
            const mousePos = Controls.getMousePos(canvas, evt)
            if (isInside(mousePos, startBtn)) {
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                ctx.fillStyle = '#ffffff'
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                Draw.editorGrid()
                // startGame()
            }
        })
    }

    static restart() {
        ctx.fillStyle = '#61aac2'
        ctx.fillRect(startBtn.x, startBtn.y, 100, 50)
        ctx.fillStyle = '#2a4c57'
        ctx.font = "20pt sans-serif"
        ctx.fillText("RETRY", canvas.width/2-43, canvas.height/2+9)
        canvas.addEventListener('click', evt => {
            const mousePos = Controls.getMousePos(canvas, evt)
            if (isInside(mousePos, startBtn)) {
                interval = 0
                x = canvas.width/2
                y = canvas.height-30
                moveX = 2
                moveY = -2
                paddleX = (canvas.width-paddleWidth)/2
                resetBricks()
                startGame()
            }
        })
    }

    static newLevel() {
        ctx.fillText("NEW", canvas.width/2-32, canvas.height/2+9)
        canvas.addEventListener('click', evt => {
            const mousePos = Controls.getMousePos(canvas, evt)
            if (isInside(mousePos, startBtn)) {
                interval = 0
                x = canvas.width/2
                y = canvas.height-30
                moveX = 2
                moveY = -2
                paddleX = (canvas.width-paddleWidth)/2
                console.log("Next Level!")
                resetBricks()
                startGame()
            }
        }) 
    }
    
    static nextLevel() {
        ctx.fillText("NEXT", canvas.width/2-43, canvas.height/2+9)
        canvas.addEventListener('click', evt => {
            const mousePos = Controls.getMousePos(canvas, evt)
            if (isInside(mousePos, startBtn)) {
                interval = 0
                x = canvas.width/2
                y = canvas.height-30
                moveX = 2
                moveY = -2
                paddleX = (canvas.width-paddleWidth)/2
                console.log("Next Level!") // Actually need to iterate through levels
                resetBricks()
                startGame()
            }
        })
    }
}