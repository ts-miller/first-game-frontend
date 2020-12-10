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
        this.createBrickField()
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

    static createBrickField() {
        for(let r = 0; r < brickRows; r++) { // Iterate through each row
            for(let c = 0; c < brickColumns; c++) { // Iterate through each column
                Draw.clearBrick(brickWidth*c, brickHeight*r)
                const newBrick = {
                    x: brickWidth*c,
                    y: brickHeight*r,
                    status: 0
                }
                editorBricks.push(newBrick)
                canvas.addEventListener('click', event => {
                    const mousePos = Input.getMousePos(canvas, event)
                    if (isInside(mousePos, {x: brickWidth*c, y: brickHeight*r, width: brickWidth, height: brickHeight})) {
                        if (!!newBrick.status) {                 // CREATE CASE FOR DIFFERENT BLOCKS
                            Draw.clearBrick(brickWidth*c, brickHeight*r)
                            newBrick.status = 0
                        } else {
                            Draw.fillBrick(brickWidth*c, brickHeight*r)
                            newBrick.status = 1
                        }
                    }
                })
            }
        }
    }

    static resetBricks() { // LEVEL METHOD
        for(const b of currentLevel.bricks) {
            b.status = 1
        }
    }

    static checkWin() {
        if (currentLevel.bricks.every(brick => !brick.status)) {
            if (testingNewLevel) {
                Button.confirmNewLevel()
            } else if (currentLevel.isLast) {
                Button.newLevel()
            } else {
                Button.nextLevel()
            }
            clearInterval(gameInterval)
        }
    }

    static playtestNewLevel() {
        testingNewLevel = true
        const packedBricks = editorBricks.filter(brick => brick.status === 1)
        currentLevel = new Level("Test Level", currentUser.name, packedBricks)
        startLoop()
    }
}