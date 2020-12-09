class Level {
    static all =[]

    constructor(name, userId, bricks) {
        this.name = name
        this.userId = userId
        this.bricks = bricks
        Level.all.push(this)
    }

    static setupEditor() {
        Event.clearEvents()
        let brickId = 0
        for(let r = 0; r < brickRows; r++) { // Iterate through each row
            for(let c = 0; c < brickColumns; c++) { // Iterate through each column
                const brickX = (brickWidth*c)+3
                const brickY = (brickHeight*r)+3
                Draw.editorGrid(brickX, brickY)
                let toggle = false
                const newBrick = {
                    x: brickX,
                    y: brickY,
                    status: false
                }
                brickId++
                editorBricks.push(newBrick)
                canvas.addEventListener('click', event => {
                    const mousePos = Controls.getMousePos(canvas, event)
                    if (isInside(mousePos, {x: brickX, y: brickY, width: brickWidth, height: brickHeight})) {
                        if (toggle) {
                            ctx.fillStyle = "#f7ebdc"
                            newBrick.status = false
                        } else {
                            ctx.fillStyle = "#fac637"
                            newBrick.status = true
                        }
                        ctx.fillRect(brickX, brickY, brickWidth-3, brickHeight-3)
                        toggle = !toggle
                        console.log("Toggled Brick")
                    }
                })
            }
        }
    }

    isLast() {
        return !!(this == Level.all[Level.all.length-1])
    }
}