class Draw {
    static ball() {
        ctx.beginPath()
        ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2)
        ctx.fillStyle = ballColor
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
        ctx.fillStyle = paddleColor
        ctx.fillRect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight)
        ctx.closePath()
    }

    static clearBrick(x, y) {
        ctx.beginPath()
        ctx.fillStyle = brickBorderColor
        ctx.fillRect(x, y, brickWidth, brickHeight)
        ctx.fillStyle = "#f7ebdc"
        ctx.fillRect(x+1.5, y+1.5, brickWidth-3, brickHeight-3)
        ctx.closePath()
    }

    static fillBrick(x, y) {
        ctx.beginPath()
        ctx.fillStyle = brickBorderColor
        ctx.fillRect(x, y, brickWidth, brickHeight)
        ctx.fillStyle = brickFillColor
        ctx.fillRect(x+1.5, y+1.5, brickWidth-3, brickHeight-3)
        ctx.closePath()
    }
}