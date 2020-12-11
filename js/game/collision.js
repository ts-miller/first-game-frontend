class Collision {

    static checkBallBrick() {
        currentLevel.bricks.some( b => {
            if (!!b.status) {
                if (this.collisionY(b)) {
                    ballDY = -ballDY
                    b.status = 0
                } else if (this.collisionX(b)) {
                    ballDX = -ballDX
                    b.status = 0
                }
            }
        })
    }

    static checkBallWall() {
        if (ballX + ballDX > canvas.width-ballRadius || ballX + ballDX < ballRadius) {
            ballDX = -ballDX
        }
        if (ballY + ballDY < ballRadius) {
            ballDY = -ballDY
        }
    }

    static checkBallPaddle() {
        if (ballY + ballDY > canvas.height-ballRadius-paddleHeight) {
            if (ballX > paddleX && ballX < paddleX+paddleWidth) {
                ballAngle = ((ballX-paddleX)/paddleWidth-0.5)/2*Math.PI
                ballDX = Math.sin(ballAngle) * ballVel
                ballDY = -Math.cos(ballAngle) * ballVel
            } else if (ballY + ballDY > canvas.height-ballRadius) {
                Button.retry()
                clearInterval(gameInterval)
            }
        }
    }

    static collisionX(brick) {
        return (ballX + ballRadius + ballDX > brick.x &&
                ballX - ballRadius + ballDX < brick.x + brickWidth &&
                ballY + ballRadius > brick.y &&
                ballY < brick.y + brickHeight)
    }
    
    static collisionY(brick) {
        return (ballX + ballRadius > brick.x &&
                ballX < brick.x + brickWidth &&
                ballY + ballRadius + ballDY > brick.y &&
                ballY + ballDY < brick.y + brickHeight)
    }
}