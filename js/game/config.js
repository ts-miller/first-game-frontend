const canvas = document.createElement("canvas") // GAME WINDOW
const ctx = canvas.getContext("2d")
canvas.id = "game-window"

canvas.height = 500
canvas.width = 500

const startingLives = 3

const brickColumns = 10
const brickRows = 15
const brickHeight = 20
const brickWidth = 50
let brickBorderColor = '#856d2a'
let brickFillColor = '#fac637'

const ballRadius = 5
const defBallVel = 3
let difIncrement = 0.2
let ballColor = '#ffffff'
const brickHitVelInc = 0.02

const paddleHeight = 10
const paddleWidth = 75
const paddleFloat = 20
const paddleRadius = 10
let paddleVelMax = 6
let paddleAcc = 1.5
let paddleColor = '#ff4040'