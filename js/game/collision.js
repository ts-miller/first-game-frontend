class Collision {

    static checkBallBrick() {
        currentLevel.bricks.some( b => {
            if (!!b.status) {
                if (this.collisionY(b)) {
                    ballDY = -ballDY
                    b.status = 0
                    return true
                } else if (this.collisionX(b)) {
                    ballDX = -ballDX
                    b.status = false
                    return 0
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
                Button.restart()
                clearInterval(gameInterval)
            }
        }
    }

    static collisionX(brick) {
        if (ballY+ballRadius > brick.y && ballY-ballRadius < brick.y+brickHeight) {
            return ballX+ballRadius > brick.x && ballX-ballRadius < brick.x+brickWidth
        } else {
            return false
        }
    }
    
    static collisionY(brick) {
        if (ballX+ballRadius > brick.x && ballX-ballRadius < brick.x+brickWidth) {
            return ballY+ballRadius > brick.y && ballY-ballRadius < brick.y+brickHeight
        } else {
            return false
        }
    }
}