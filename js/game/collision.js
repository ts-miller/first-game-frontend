class Collision {

    static checkBallBrick() {
        currentLevel.bricks.some( b => {
            if (!!b.status) {
                if (this.collisionY(b)) {
                    ballDY = -ballDY
                    b.status--
                    currentUser.score += pointIncrement
                    currentUser.checkFor1Up()
                    ballVel += brickHitVelInc
                    brickHitSound.sound.cloneNode(true).play()
                } else if (this.collisionX(b)) {
                    ballDX = -ballDX
                    b.status--
                    score += pointIncrement
                    ballVel += brickHitVelInc
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
            if (currentUser.lives) {
                currentUser.lives--
                deathSound.play()
                clearInterval(gameInterval)
                setTimeout(() => Event.retryLevel(), 2500)
            } else {
                gameOverSound.play()
                Draw.gameOver()
                clearInterval(gameInterval)
                Button.start()
                if (currentUser.highScore < currentUser.score) {
                    fetch(`${BASE_URL}/users/${currentUser.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({user: {
                            id: currentUser.id,
                            high_score: currentUser.score
                        }
                        })
                    })
                    .then(resp => resp.json())
                    .then(user => {
                        debugger
                        currentUser = new User()
                    })
                }
            }
        }
    }

    static checkBallPaddle() {
        if (ballY + ballDY > canvas.height-ballRadius-paddleHeight-paddleFloat-hudHeight && ballY < canvas.height-ballRadius-paddleFloat-hudHeight) {
            if (ballX > paddleX && ballX < paddleX+paddleWidth) {
                ballAngle = ((ballX-paddleX)/paddleWidth-0.5)/2*Math.PI
                ballDX = Math.sin(ballAngle) * ballVel
                ballDY = -Math.cos(ballAngle) * ballVel
                paddleHitSound.sound.cloneNode(true).play()
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