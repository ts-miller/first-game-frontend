
canvas.height = 450
canvas.width = 600
let interval
let level

const brickColumns = 12
const brickRows = 15

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
const brickWidth = 50
bricks = [
    {x: 0, y: 0, status: true},
    {x: 50, y: 0, status: true},
    {x: 100, y: 0, status: true},
    {x: 150, y: 0, status: true},
    {x: 200, y: 0, status: true},
    {x: 250, y: 0, status: true},
    {x: 300, y: 0, status: true},
    {x: 350, y: 0, status: true},
    {x: 400, y: 0, status: true},
    {x: 450, y: 0, status: true},
    {x: 500, y: 0, status: true},
    {x: 550, y: 0, status: true}
]
const startBtn = {
    x: (canvas.width/2 - 50),
    y: (canvas.height/2 - 25),
    width: 100,
    height: 50
}