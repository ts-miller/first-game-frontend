const gameContainer = document.createElement('DIV')
gameContainer.id = "game-container"

const canvas = document.createElement('canvas')
canvas.height = 450
canvas.width = 600
canvas.id = 'game-window'
const ctx = canvas.getContext('2d')


function loadGame() {
    console.log(`Loading game for ${currentUser.name}`)
    ctx.fillStyle = 'blue'
    ctx.fillRect(0,0, canvas.width, canvas.height)
    body.appendChild(canvas)
}