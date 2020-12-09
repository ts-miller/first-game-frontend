class Button {

    static start() {
        ctx.fillStyle = '#61aac2'
        ctx.fillRect(startBtn.x, startBtn.y, 100, 50)
        ctx.fillStyle = '#2a4c57'
        ctx.font = "20pt sans-serif"
        ctx.fillText("START", canvas.width/2-43, canvas.height/2+9)
        canvas.addEventListener('click', Event.startGame)
    }

    static restart() {
        ctx.fillStyle = '#61aac2'
        ctx.fillRect(startBtn.x, startBtn.y, 100, 50)
        ctx.fillStyle = '#2a4c57'
        ctx.font = "20pt sans-serif"
        ctx.fillText("RETRY", canvas.width/2-43, canvas.height/2+9)
        canvas.addEventListener('click', Event.resetGame)
    }

    static newLevel() {
        ctx.fillStyle = '#53e05a'
        ctx.fillRect(startBtn.x, startBtn.y, 100, 50)
        ctx.fillStyle = '#2a4c57'
        ctx.font = "20pt sans-serif"
        ctx.fillText("NEW", canvas.width/2-32, canvas.height/2+9)
        canvas.addEventListener('click', Event.setupLevelEditor)
    }
    
    static nextLevel() {
        ctx.fillStyle = '#53e05a'
        ctx.fillRect(startBtn.x, startBtn.y, 100, 50)
        ctx.fillStyle = '#2a4c57'
        ctx.font = "20pt sans-serif"
        ctx.fillText("NEXT", canvas.width/2-43, canvas.height/2+9)
        canvas.addEventListener('click', Event.setupNextLevel)
    }
}