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
        ctx.fillStyle = paddleColor
        ctx.strokeStyle = paddleColor
        ctx.lineJoin = "round";
        ctx.lineWidth = paddleRadius;
        ctx.strokeRect(paddleX+(paddleRadius/2), canvas.height-paddleHeight-paddleFloat-hudHeight+(paddleRadius/2), 
                            paddleWidth-paddleRadius, paddleHeight-paddleRadius);
        ctx.fillRect(paddleX+(paddleRadius/2), canvas.height-paddleHeight-paddleFloat-hudHeight+(paddleRadius/2), 
                            paddleWidth-paddleRadius, paddleHeight-paddleRadius);
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

    static hud() {
        ctx.beginPath()
        ctx.fillStyle = "#0f0f0f"
        ctx.fillRect(0, canvas.height-hudHeight, canvas.width, hudHeight)
        ctx.fillStyle = "#ffffff"
        ctx.font = '30px Veranda'
        ctx.fillText(`Score: ${score}`, 8, canvas.height-8)
        ctx.closePath
    }
}