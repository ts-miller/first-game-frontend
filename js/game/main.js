
const body = document.querySelector('body')
const gameContainer = document.createElement('DIV')
gameContainer.id = "game-container"
body.appendChild(gameContainer)

let editorBricks = []
let testingNewLevel

let gameInterval
let levelNum = 0
let currentLevel
let ballAngle

let ballX = canvas.width/2
let ballY = canvas.height-30
let ballDX = Math.cos(0.5/2*Math.PI)*ballVel  // X and Y to launch at 45 degree angle at ballVel(velocity)
let ballDY = -(Math.sin(0.5/2*Math.PI)*ballVel)
let paddleX = (canvas.width-paddleWidth)/2
let paddleVel = 0

let rightPressed = false
let leftPressed = false

const startBtn = {
    x: (canvas.width/2 - 50),
    y: (canvas.height/2 - 25),
    width: 100,
    height: 50
}

document.addEventListener("keydown", Input.keyDownHandler, false)
document.addEventListener("keyup", Input.keyUpHandler, false)


function isInside(pos, rect) {
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
}

// Functions below stay in main.js

function loadGame() {
    console.log(`Loading game for ${currentUser.name}`)
    gameContainer.appendChild(canvas)
    fetch(`${BASE_URL}/levels`)
        .then(resp => resp.json())
        .then(lvls => {
            for(const l of lvls) {
                new Level(l.name, l.user.name, l.bricks)
            }
        })
    Button.newLevel()
}

function gameLoop() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    Draw.ball()
    Draw.paddle()
    Draw.bricks()
    Collision.checkBallBrick()
    Collision.checkBallWall()
    Collision.checkBallPaddle()
    Level.checkWin()
    Input.checkForKeyPress()
 
    ballX += ballDX
    ballY += ballDY
    paddleX += paddleVel
}

function startLoop() {
    if (!gameInterval) {
        console.log(`Level name: ${currentLevel.name}, User: ${currentLevel.userName}, Brick Count: ${currentLevel.bricks.length}`)
        gameInterval = setInterval(gameLoop, 17)
    }
}