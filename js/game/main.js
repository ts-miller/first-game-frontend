
const body = document.querySelector('body')
const gameContainer = document.createElement('DIV')
gameContainer.id = "game-container"

const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")
canvas.id = "game-window"

let editorBricks = []

document.addEventListener("keydown", Controls.keyDownHandler, false)
document.addEventListener("keyup", Controls.keyUpHandler, false)



function collisionX(brick) {
    if (ballY+ballRadius > brick.y && ballY-ballRadius < brick.y+brickHeight) {
        return ballX+ballRadius > brick.x && ballX-ballRadius < brick.x+brickWidth
    } else {
        return false
    }
}

function collisionY(brick) {
    if (ballX+ballRadius > brick.x && ballX-ballRadius < brick.x+brickWidth) {
        return ballY+ballRadius > brick.y && ballY-ballRadius < brick.y+brickHeight
    } else {
        return false
    }
}

function isInside(pos, rect) {
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
}

function gameWin() {
    
    if (level.isLast) {
        Button.newLevel()
    } else {
        Button.nextLevel()
    }
    clearInterval(interval)
}

function resetBricks() { // LEVEL METHOD
    for(const b of level.bricks) {
        b.status = true
    }
}

function collisionDetection() {
    level.bricks.some( b => {
        if (b.status) {
            if (collisionY(b)) {
                ballDY = -ballDY
                b.status = false
                return true
            } else if (collisionX(b)) {
                ballDX = -ballDX
                b.status = false
                return true
            }
        }
    })
}

function checkWin() {
    if (level.bricks.every(brick => !brick.status)) {
        gameWin()
    }
}

// Functions below stay in main.js

function loadGame() {
    console.log(`Loading game for ${currentUser.name}`)
    body.appendChild(canvas)
    // Fetch & build all levels from backend
    level = new Level('First Level', currentUser.name, bricks ) // TESTING PURPOSES: WILL NEED CHANGED
    Button.newLevel()
}

function gameLoop() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    Draw.ball()
    Draw.paddle()
    collisionDetection()
    checkWin()
    Draw.bricks()

    // Collision logic might move

    if (ballX + ballDX > canvas.width-ballRadius || ballX + ballDX < ballRadius) {
        ballDX = -ballDX
    }
    if (ballY + ballDY < ballRadius) {
        ballDY = -ballDY
    } else if (ballY + ballDY > canvas.height-ballRadius-paddleHeight) {
        if (ballX > paddleX && ballX < paddleX+paddleWidth) {
            ballDY = -ballDY
        } else if (ballY + ballDY > canvas.height-ballRadius) {
            Button.restart()
            clearInterval(interval)
        }
    }

    // Collision logic ^^

    if (rightPressed) {
        paddleX += 7
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth
        }
    } else if (leftPressed) {
        paddleX -= 7
        if (paddleX < 0) {
            paddleX = 0
        }
    }

    // Paddle logic ^^ (might move)

    ballX += ballDX
    ballY += ballDY
}

function startLoop() {
    if (!interval) {
        console.log(`Level name: ${level.name}, User: ${level.userId}, Brick Count: ${level.bricks.length}`)
        interval = setInterval(gameLoop, 17)
    }
}