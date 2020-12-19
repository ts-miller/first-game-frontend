
const wrapper = document.querySelector('.wrapper')
const body = document.querySelector('.wrapper')
const gameContainer = document.createElement('DIV')
gameContainer.id = "game-container"
body.appendChild(gameContainer)
const clearBtn = document.createElement('BUTTON')
const submitBtn = document.createElement('BUTTON')
const fillBtn = document.createElement('BUTTON')
const nameLabel = document.createElement('LABEL')
const levelNameField = document.createElement('INPUT')
levelNameField.id = "level-name"
const gameControls = document.createElement('p')
gameControls.setAttribute('style', 'white-space: pre; text-align: center; margin-top: 8px;')

const buttonBox = document.createElement('DIV')
buttonBox.id = 'button-box'
buttonBox.className = 'center'
buttonBox.style.height = '68px'
body.appendChild(buttonBox)
wrapper.appendChild(gameControls)

let allUsers = []
let editorBricks = []
let testingNewLevel
let paused = false
let levelCopies

let gameInterval
let levelNum = 0
let currentLevel
let ballAngle
let allLevels
let launched
let score = 0

let ball
let paddle

let rightPressed = false
let leftPressed = false

document.addEventListener("keydown", Input.keyDownHandler, false)
document.addEventListener("keyup", Input.keyUpHandler, false)


// function isInside(pos, rect) {
//     return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
// }

function loadGame() {
    console.log(`Loading game for ${currentUser.name}`)
    gameControls.innerText = 'Paddle Movement: Arrow Left/Right \r\n Launch Ball: Space \r\n Pause: P'
    allLevels = []
    API.fetchLevels()
    currentUser.score = 0
    ball = new Ball()
    paddle = new Paddle()
    gameMusic.play()
    gameMusic.sound.volume = 0.5
    Button.start()
}

function gameLoop() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    Draw.ball()
    Draw.paddle()
    Collision.checkBallBrick()
    Draw.bricks()
    Draw.hud()
    Collision.checkBallWall()
    Collision.checkBallPaddle()
    Level.checkWin()
    if (!paused) {
        Input.checkForArrowPress()
        paddle.x += paddle.vel
        if (launched) {
            ball.x += ball.dx
            ball.y += ball.dy
        } else {
            ball.x = paddle.x + paddleWidth/2
        }
    } else {
        Draw.pause()
    }
}

function startLoop() {
    if (!gameInterval) {
        console.log(`Level name: ${currentLevel.name}, User: ${currentLevel.user}, Brick Count: ${currentLevel.bricks.length}`)
        launched = false
        levelStartSound.play()
        setTimeout( () => launched = true, 6000)
        gameInterval = setInterval(gameLoop, 17)
    }
}