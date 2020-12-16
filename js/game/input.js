class Input {

    static keyDownHandler(e) {
        if (e.key == "ArrowRight") {
            rightPressed = true
        } else if (e.key == "ArrowLeft") {
            leftPressed = true
        }
        if (e.code == "Space") {
            if (e.target.tagName !== 'INPUT') {
                e.preventDefault()
            }
            if (gameInterval) {
                launched = true
            }
        }
        if (e.key == "p" && gameInterval) {
            paused = !paused
            if (paused) {
                gameMusic.sound.volume = 0.1
            } else {
                gameMusic.sound.volume = 0.5
            }
        }
    }
    
    static keyUpHandler(e) {
        if (e.key == "ArrowRight") {
            rightPressed = false
        } else if (e.key == "ArrowLeft") {
            leftPressed = false
        }
    }

    static getMousePos(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        }
    }

    static checkForArrowPress() {
        if (rightPressed) {
            if (paddleX + paddleWidth > canvas.width) {
                paddleX = canvas.width - paddleWidth
                paddleVel = 0
            } else {
                (paddleVel <= paddleVelMax) ? paddleVel += paddleAcc : paddleVel = paddleVelMax
            }
        } else if (leftPressed) {
            if (paddleX < 0) {
                paddleX = 0
                paddleVel = 0
            } else {
                (paddleVel >= -paddleVelMax) ? paddleVel -= paddleAcc : paddleVel = -paddleVelMax
            }
        } else {
            if (paddleVel > 0) {
                paddleVel -= paddleAcc
            } else if (paddleVel < 0) {
                paddleVel += paddleAcc
            }
        }
    }
}