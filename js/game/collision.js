class Collision {

    static checkBallBrick() {
        currentLevel.bricks.some( b => {
            if (!!b.status) {
                if (this.collisionY(b)) {
                    ballDY = -ballDY
                    b.status = 0
                    score += 100
                    brickHitSound.sound.cloneNode(true).play()
                } else if (this.collisionX(b)) {
                    ballDX = -ballDX
                    b.status = 0
                    score += 100
                    brickHitSound.sound.cloneNode(true).play()
                }
            }
        })
    }

    static checkBallWall() {
        if (ballX + ballDX > canvas.width-ballRadius || ballX + ballDX < ballRadius) {
            ballDX = -ballDX
            wallHitSound.sound.cloneNode(true).play()
        }
        if (ballY + ballDY < ballRadius) {
            ballDY = -ballDY
            wallHitSound.sound.cloneNode(true).play()
        }
        if (ballY + ballDY > canvas.height-ballRadius-hudHeight) {
            if (currentLives) {
                currentLives--
                deathSound.play()
                clearInterval(gameInterval)
                setTimeout(() => Event.retryLevel(), 2500)
            } else {
                alert("GAME OVER!")
                deathSound.play()
                clearInterval(gameInterval)
                Button.start()
            }
        }
    }

    static checkBallPaddle() {
        if (ballY + ballDY > canvas.height-ballRadius-paddleHeight-paddleFloat-hudHeight && ballY + ballDY < canvas.height-paddleFloat) {
            if (ballX > paddleX && ballX < paddleX+paddleWidth) {
                ballAngle = ((ballX-paddleX)/paddleWidth-0.5)/2*Math.PI
                ballDX = Math.sin(ballAngle) * ballVel
                ballDY = -Math.cos(ballAngle) * ballVel
                paddleHitSound.play()
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