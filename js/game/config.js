const canvas = document.createElement("canvas") // GAME WINDOW
const ctx = canvas.getContext("2d")
canvas.id = "game-window"

canvas.height = 450
canvas.width = 600

const brickColumns = 12
const brickRows = 15
const brickHeight = 20
const brickWidth = 50
let brickBorderColor = '#856d2a'
let brickFillColor = '#fac637'

const ballRadius = 7
let ballVel = 4
let difIncrement = 0.2
let ballColor = '#ffffff'

const paddleHeight = 10
const paddleWidth = 85
let paddleVelMax = 6
let paddleAcc = 1
let paddleColor = '#ff4040'