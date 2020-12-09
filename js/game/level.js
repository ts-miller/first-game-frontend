class Level {
    static all =[]

    constructor(name, userId, bricks) {
        this.name = name
        this.userId = userId
        this.bricks = bricks
        Level.all.push(this)
    }

    static setupEditor() {
        Button.editorControls()
        Event.clearEvents()
        for(let r = 0; r < brickRows; r++) { // Iterate through each row
            for(let c = 0; c < brickColumns; c++) { // Iterate through each column
                const brickX = brickWidth*c
                const brickY = brickHeight*r
                Draw.clearBrick(brickX, brickY)
                const newBrick = {
                    x: brickX,
                    y: brickY,
                    status: false
                }
                editorBricks.push(newBrick)
                canvas.addEventListener('click', event => {
                    const mousePos = Input.getMousePos(canvas, event)
                    if (isInside(mousePos, {x: brickX, y: brickY, width: brickWidth, height: brickHeight})) {
                        if (newBrick.status) {
                            Draw.clearBrick(brickX, brickY)
                            // ctx.fillStyle = "#f7ebdc"
                            newBrick.status = false
                        } else {
                            Draw.fillBrick(brickX, brickY)
                            // ctx.fillStyle = "#fac637"
                            newBrick.status = true
                        }
                        // ctx.fillRect(brickX, brickY, brickWidth-3, brickHeight-3)
                        console.log("Toggled Brick")
                    }
                })
            }
        }
    }

    isLast() {
        return !!(this == Level.all[Level.all.length-1])
    }

    static clearBrickField() {
        for(let r = 0; r < brickRows; r++) { // Iterate through each row
            for(let c = 0; c < brickColumns; c++) { // Iterate through each column
                Draw.clearBrick(brickWidth*c, brickHeight*r)
            }
        }
        for (const brick of editorBricks) {
            brick.status = false // Reset bricks
        }
    }

    static fillBrickField() {
        for(let r = 0; r < brickRows; r++) { // Iterate through each row
            for(let c = 0; c < brickColumns; c++) { // Iterate through each column
                Draw.fillBrick(brickWidth*c, brickHeight*r)
            }
        }
        for (const brick of editorBricks) {
            brick.status = true // Turns on every brick
        }
    }
}