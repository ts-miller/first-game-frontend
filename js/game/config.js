
canvas.height = 450
canvas.width = 600
let interval
let level

const brickColumns = 11
const brickRows = 13

const ballRadius = 10
let ballX = canvas.width/2
let ballY = canvas.height-30
let ballDX = 4
let ballDY = -4

const paddleHeight = 10
const paddleWidth = 75
let paddleX = (canvas.width-paddleWidth)/2
let rightPressed = false
let leftPressed = false

const brickHeight = 20
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