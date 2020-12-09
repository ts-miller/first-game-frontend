class Draw {
    static ball() {
        ctx.beginPath()
        ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2)
        ctx.fillStyle = "#2740cf"
        ctx.fill()
        ctx.closePath()
    }

    static bricks() {
        for(const brick of level.bricks) {
            if (brick.status) {
                ctx.beginPath()
                ctx.fillStyle = "#c29f3e"
                ctx.fillRect(brick.x-3, brick.y-3, brickWidth+6, brickHeight+6) // border
                ctx.fillStyle = "#fac637"
                ctx.fillRect(brick.x, brick.y, brickWidth, brickHeight)
                ctx.closePath()
            }
        }
    }

    static paddle() {
        ctx.beginPath()
        ctx.fillStyle = "#174157"
        ctx.fillRect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight)
        ctx.closePath()
    }

    static editorGrid(x, y) {
        ctx.beginPath()
        ctx.fillStyle = "#c29f3e"
        ctx.fillRect(x-3, y-3, brickWidth+6, brickHeight+6)
        ctx.fillStyle = "#f7ebdc"
        ctx.fillRect(x, y, brickWidth, brickHeight)
        ctx.closePath()
    }
}