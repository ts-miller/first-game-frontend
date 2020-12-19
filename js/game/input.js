class Input {

    static keyDownHandler(e) {
        if (e.code == "ArrowRight") {
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
        if (e.code == "KeyP" && gameInterval) {
            paused = !paused
            if (paused) {
                gameMusic.sound.volume = 0.1
            } else {
                gameMusic.sound.volume = 0.5
            }
        }
    }
    
    static keyUpHandler(e) {
        if (e.code == "ArrowRight") {
            rightPressed = false
        } else if (e.code == "ArrowLeft") {
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
            if (paddle.x + paddleWidth > canvas.width) {
                paddle.x = canvas.width - paddleWidth
                paddle.vel = 0
            } else {
                (paddle.vel <= paddleVelMax) ? paddle.vel += paddleAcc : paddle.vel = paddleVelMax
            }
        } else if (leftPressed) {
            if (paddle.x < 0) {
                paddle.x = 0
                paddle.vel = 0
            } else {
                (paddle.vel >= -paddleVelMax) ? paddle.vel -= paddleAcc : paddle.vel = -paddleVelMax
            }
        } else {
            if (paddle.vel > 0) {
                paddle.vel -= paddleAcc
            } else if (paddle.vel < 0) {
                paddle.vel += paddleAcc
            }
        }
    }
}