
const body = document.querySelector('body')
const gameContainer = document.createElement('DIV')
gameContainer.id = "game-container"
body.appendChild(gameContainer)

const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")
canvas.id = "game-window"

let editorBricks = []

let gameInterval
let levelNum = 0
let currentLevel

document.addEventListener("keydown", Input.keyDownHandler, false)
document.addEventListener("keyup", Input.keyUpHandler, false)



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
    
    if (currentLevel.isLast) {
        Button.newLevel()
    } else {
        Button.nextLevel()
    }
    clearInterval(gameInterval)
}

function collisionDetection() {
    currentLevel.bricks.some( b => {
        if (!!b.status) {
            if (collisionY(b)) {
                ballDY = -ballDY
                b.status = 0
                return true
            } else if (collisionX(b)) {
                ballDX = -ballDX
                b.status = false
                return 0
            }
        }
    })
}

function checkWin() {
    if (currentLevel.bricks.every(brick => !brick.status)) {
        gameWin()
    }
}

// Functions below stay in main.js

function loadGame() {
    console.log(`Loading game for ${currentUser.name}`)
    gameContainer.appendChild(canvas)
    // Fetch & build all levels from backend
    fetch(`${BASE_URL}/levels`)
        .then(resp => resp.json())
        .then(lvls => {
            for(const l of lvls) {
                new Level(l.name, l.user.name, l.bricks)
            }
        })
    Button.start()
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
    }

    if (ballY + ballDY > canvas.height-ballRadius-paddleHeight) {
        if (ballX > paddleX && ballX < paddleX+paddleWidth) {
            ballDY = -ballDY
        } else if (ballY + ballDY > canvas.height-ballRadius) {
            Button.restart()
            clearInterval(gameInterval)
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
    if (!gameInterval) {
        currentLevel = Level.all[levelNum]
        console.log(`Level name: ${currentLevel.name}, User: ${currentLevel.userName}, Brick Count: ${currentLevel.bricks.length}`)
        gameInterval = setInterval(gameLoop, 17)
    }
}