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

const ballRadius = 10
let x = canvas.width/2
let y = canvas.height-30
let moveX = 2
let moveY = -2

const paddleHeight = 10
const paddleWidth = 75
let paddleX = (canvas.width-paddleWidth)/2
let rightPressed = false
let leftPressed = false

document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler, false)

function keyDownHandler(e) {
    if (e.key == "ArrowRight") {
        rightPressed = true
    } else if (e.key == "ArrowLeft") {
        leftPressed = true
    }
}

function keyUpHandler(e) {
    if (e.key == "ArrowRight") {
        rightPressed = false
    } else if (e.key == "ArrowLeft") {
        leftPressed = false
    }
}

const startBtn = {
    x: (canvas.width/2 - 50),
    y: (canvas.height/2 - 25),
    width: 100,
    height: 50
}

function getMousePos(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    }
}

function isInside(pos, rect) {
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
}

function drawBall() {
    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, Math.PI*2)
    ctx.fillStyle = "#0095DD"
    ctx.fill()
    ctx.closePath()
}

function drawPaddle() {
    ctx.beginPath()
    ctx.fillStyle = "#0095DD"
    ctx.fillRect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight)
    ctx.closePath()
}

function drawStartButton() {
    ctx.fillStyle = '#61aac2'
    ctx.fillRect(startBtn.x, startBtn.y, 100, 50)
    ctx.fillStyle = '#2a4c57'
    ctx.font = "20pt sans-serif"
    ctx.fillText("START", canvas.width/2-43, canvas.height/2+9)
    canvas.addEventListener('click', evt => {
        const mousePos = getMousePos(canvas, evt)
        if (isInside(mousePos, startBtn)) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = '#ffffff'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
        
            startGame()
        }
    })
}

function drawRestartButton() {
    ctx.fillStyle = '#61aac2'
    ctx.fillRect(startBtn.x, startBtn.y, 100, 50)
    ctx.fillStyle = '#2a4c57'
    ctx.font = "20pt sans-serif"
    ctx.fillText("RETRY", canvas.width/2-43, canvas.height/2+9)
    canvas.addEventListener('click', evt => {
        const mousePos = getMousePos(canvas, evt)
        if (isInside(mousePos, startBtn)) {
            interval = 0
            x = canvas.width/2
            y = canvas.height-30
            moveX = 2
            moveY = -2
            paddleX = (canvas.width-paddleWidth)/2
            startGame()
        }
    })
}

function loadGame() {
    console.log(`Loading game for ${currentUser.name}`)
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    body.appendChild(canvas)
    drawStartButton()
}

function gameLoop() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    drawBall()
    drawPaddle()

    if (x + moveX > canvas.width-ballRadius || x + moveX < ballRadius) {
        moveX = -moveX
    }
    if (y + moveY < ballRadius) {
        moveY = -moveY
    } else if (y + moveY > canvas.height-ballRadius-paddleHeight) {
        if (x > paddleX && x < paddleX+paddleWidth) {
            moveY = -moveY
        } else if (y + moveY > canvas.height-ballRadius) {
            drawRestartButton()
            clearInterval(interval)
        }
    }       

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
    x += moveX
    y += moveY
}

function startGame() {
    if (!interval) {
        interval = setInterval(gameLoop, 17)
    }
}