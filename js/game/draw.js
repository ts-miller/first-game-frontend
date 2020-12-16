class Draw {
    static ball() {
        ctx.beginPath()
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2)
        ctx.fillStyle = ballColor
        ctx.fill()
        ctx.closePath()
    }

    static bricks() {
        for(const brick of currentLevel.bricks) {
            if (brick.status) {
                this.fillBrick(brick)
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

    static pause() {
        ctx.textAlign = 'center'
        ctx.font = '50px monospace'
        ctx.fillText('Paused', canvas.width/2, canvas.height/2)
    }

    static gameOver() {
        ctx.textAlign = 'center'
        ctx.font = '50px monospace'
        ctx.fillText('Game Over', canvas.width/2, canvas.height/2)
    }

    static clearBrick(brick) {
        ctx.beginPath()
        ctx.fillStyle = brickBorderColor1
        ctx.fillRect(brick.x, brick.y, brickWidth, brickHeight)
        ctx.fillStyle = "#f7ebdc"
        ctx.fillRect(brick.x+1.5, brick.y+1.5, brickWidth-3, brickHeight-3)
        ctx.closePath()
    }

    static fillBrick(brick) {
        ctx.beginPath()
        ctx.fillStyle = (brick.status === 1) ? brickBorderColor1 : brickBorderColor2
        ctx.fillRect(brick.x, brick.y, brickWidth, brickHeight)
        ctx.fillStyle = (brick.status === 1) ? brickFillColor1 : brickFillColor2
        ctx.fillRect(brick.x+1.5, brick.y+1.5, brickWidth-3, brickHeight-3)
        ctx.closePath()
    }

    static hud() {
        ctx.beginPath()
        ctx.textAlign = 'start'
        ctx.fillStyle = "#0f0f0f"
        ctx.fillRect(0, canvas.height-hudHeight, canvas.width, hudHeight)
        ctx.fillStyle = "#ffffff"
        ctx.font = "30px monospace"
        ctx.fillText(`Lives: ${currentUser.lives}`, canvas.width/2+100, canvas.height-8)
        ctx.font = "14px monospace"
        ctx.fillText(`Score: ${currentUser.score}`, 8, canvas.height-21)
        ctx.fillText(`High-Score: ${currentUser.highScore}`, 8, canvas.height-5)
        ctx.textAlign = 'center'
        ctx.fillText(`"${currentLevel.name}"`, canvas.width/2, canvas.height-21)
        ctx.fillText(`Author: ${currentLevel.user.name}`, canvas.width/2, canvas.height-5)
        ctx.closePath()
    }
}