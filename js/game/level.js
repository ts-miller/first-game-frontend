class Level {
    static all =[]

    constructor(name, userName, bricks) {
        this.name = name
        this.userName = userName
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
                    status: 0
                }
                editorBricks.push(newBrick)
                canvas.addEventListener('click', event => {
                    const mousePos = Input.getMousePos(canvas, event)
                    if (isInside(mousePos, {x: brickX, y: brickY, width: brickWidth, height: brickHeight})) {
                        if (!!newBrick.status) {                 // CREATE CASE FOR DIFFERENT BLOCKS
                            Draw.clearBrick(brickX, brickY)
                            // ctx.fillStyle = "#f7ebdc"
                            newBrick.status = 0
                        } else {
                            Draw.fillBrick(brickX, brickY)
                            // ctx.fillStyle = "#fac637"
                            newBrick.status = 1
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
            brick.status = 0 // Reset bricks
        }
    }

    static fillBrickField() {
        for(let r = 0; r < brickRows; r++) { // Iterate through each row
            for(let c = 0; c < brickColumns; c++) { // Iterate through each column
                Draw.fillBrick(brickWidth*c, brickHeight*r)
            }
        }
        for (const brick of editorBricks) {
            brick.status = 1 // Turns on every brick
        }
    }

    static resetBricks() { // LEVEL METHOD
        for(const b of currentLevel.bricks) {
            b.status = 1
        }
    }
}