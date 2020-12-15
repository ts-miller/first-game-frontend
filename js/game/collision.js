class Collision {

    static checkBallBrick() {
        currentLevel.bricks.some( b => {
            if (!!b.status) {
                if (this.collisionY(b)) {
                    ball.dy = -ball.dy
                    b.status--
                    // Add Powerup chance function
                    currentUser.score += pointIncrement
                    currentUser.checkFor1Up()
                    ball.vel += brickHitVelInc
                    brickHitSound.sound.cloneNode(true).play()
                } else if (this.collisionX(b)) {
                    ball.dx = -ball.dx
                    b.status--
                    // Add Powerup chance function
                    score += pointIncrement
                    ball.vel += brickHitVelInc
                    brickHitSound.sound.cloneNode(true).play()
                }
            }
        })
    }

    static checkBallWall() {
        if (ball.x + ball.dx + ball.radius > canvas.width || ball.x + ball.dx < ball.radius) {
            ball.dx = -ball.dx
            wallHitSound.sound.cloneNode(true).play()
        }
        if (ball.y + ball.dy < ball.radius) {
            ball.dy = -ball.dy
            wallHitSound.sound.cloneNode(true).play()
        }
        if (ball.y + ball.dy > canvas.height-ball.radius-hudHeight) {
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
        if (ball.y + ball.dy > canvas.height-ball.radius-paddleHeight-paddleFloat-hudHeight && ball.y < canvas.height-ball.radius-paddleFloat-hudHeight) {
            if (ball.x > paddleX && ball.x < paddleX+paddleWidth) {
                const ballAngle = ((ball.x-paddleX)/paddleWidth-0.5)/2*Math.PI
                ball.dx = Math.sin(ballAngle) * ball.vel
                ball.dy = -Math.cos(ballAngle) * ball.vel
                paddleHitSound.sound.cloneNode(true).play()
            }
        }
    }

    static collisionX(brick) {
        return (ball.y > brick.y &&
                ball.y < brick.y + brickHeight &&
                ball.x + ball.radius + ball.dx > brick.x &&
                ball.x - ball.radius + ball.dx < brick.x + brickWidth)
    }
    
    static collisionY(brick) {
        return (ball.x > brick.x &&
                ball.x < brick.x + brickWidth &&
                ball.y + ball.radius + ball.dy > brick.y &&
                ball.y - ball.radius + ball.dy < brick.y + brickHeight)
    }
}