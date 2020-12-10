class Input {

    static keyDownHandler(e) {
        if (e.key == "ArrowRight") {
            rightPressed = true
        } else if (e.key == "ArrowLeft") {
            leftPressed = true
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

    static checkForKeyPress() {
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