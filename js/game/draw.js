class Draw {
    static ball() {
        ctx.beginPath()
        ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2)
        ctx.fillStyle = "#2740cf"
        ctx.fill()
        ctx.closePath()
    }

    static bricks() {
        for(const brick of currentLevel.bricks) {
            if (brick.status) {
                this.fillBrick(brick.x, brick.y)
            }
        }
    }

    static paddle() {
        ctx.beginPath()
        ctx.fillStyle = "#174157"
        ctx.fillRect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight)
        ctx.closePath()
    }

    static clearBrick(x, y) {
        ctx.beginPath()
        ctx.fillStyle = '#856d2a'
        ctx.fillRect(x, y, brickWidth, brickHeight)
        ctx.fillStyle = "#f7ebdc"
        ctx.fillRect(x+1.5, y+1.5, brickWidth-3, brickHeight-3)
        ctx.closePath()
    }

    static fillBrick(x, y) {
        ctx.beginPath()
        ctx.fillStyle = "#856d2a"
        ctx.fillRect(x, y, brickWidth, brickHeight)
        ctx.fillStyle = "#fac637"
        ctx.fillRect(x+1.5, y+1.5, brickWidth-3, brickHeight-3)
        ctx.closePath()
    }
}