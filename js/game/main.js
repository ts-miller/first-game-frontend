const body = document.querySelector('body')
const gameContainer = document.createElement('DIV')
gameContainer.id = "game-container"

const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")
canvas.height = 450
canvas.width = 600
canvas.id = "game-window"
let interval
let level

const brickColumns = 11
const brickRows = 13

const ballRadius = 10
let x = canvas.width/2
let y = canvas.height-30
let moveX = 4
let moveY = -4

const paddleHeight = 10
const paddleWidth = 75
let paddleX = (canvas.width-paddleWidth)/2
let rightPressed = false
let leftPressed = false

const brickHeight = 15
const brickWidth = 54
bricks = [
    {x: 3, y: 3, status: true},
    {x: 57, y: 3, status: true},
    {x: 111, y: 3, status: true},
    {x: 165, y: 3, status: true},
    {x: 219, y: 3, status: true},
    {x: 273, y: 3, status: true},
    {x: 327, y: 3, status: true},
    {x: 381, y: 3, status: true},
]
const startBtn = {
    x: (canvas.width/2 - 50),
    y: (canvas.height/2 - 25),
    width: 100,
    height: 50
}

document.addEventListener("keydown", Controls.keyDownHandler, false)
document.addEventListener("keyup", Controls.keyUpHandler, false)



function collisionX(brick) {
    if (y+ballRadius > brick.y && y-ballRadius < brick.y+brickHeight) {
        return x+ballRadius > brick.x && x-ballRadius < brick.x+brickWidth
    } else {
        return false
    }
}

function collisionY(brick) {
    if (x+ballRadius > brick.x && x-ballRadius < brick.x+brickWidth) {
        return y+ballRadius > brick.y && y-ballRadius < brick.y+brickHeight
    } else {
        return false
    }
}



function isInside(pos, rect) {
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
}

function gameWin() {
    ctx.fillStyle = '#53e05a'
    ctx.fillRect(startBtn.x, startBtn.y, 100, 50)
    ctx.fillStyle = '#2a4c57'
    ctx.font = "20pt sans-serif"
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
                moveY = -moveY
                b.status = false
                return true
            } else if (collisionX(b)) {
                moveX = -moveX
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
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    body.appendChild(canvas)
    level = new Level('First Level', currentUser.name, bricks ) // TEMPORARY: WILL NEED CHANGED
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

    if (x + moveX > canvas.width-ballRadius || x + moveX < ballRadius) {
        moveX = -moveX
    }
    if (y + moveY < ballRadius) {
        moveY = -moveY
    } else if (y + moveY > canvas.height-ballRadius-paddleHeight) {
        if (x > paddleX && x < paddleX+paddleWidth) {
            moveY = -moveY
        } else if (y + moveY > canvas.height-ballRadius) {
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

    x += moveX
    y += moveY
}

function startGame() {
    if (!interval) {
        console.log(`Level name: ${level.name}, User: ${level.userId}, Brick Count: ${level.bricks.length}`)
        interval = setInterval(gameLoop, 17)
    }
}